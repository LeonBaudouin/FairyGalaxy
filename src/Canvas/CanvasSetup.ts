import { RadialGradientData, LinearGradientData } from "./StyleData";
import { BaseDrawable } from "./Abstract/BaseDrawable";
import { Canvas } from "./Canvas";
import RectangleState from "./Rectangle/RectangleState";
import RectangleRenderer from "./Rectangle/RectangleRenderer";
import CircleRenderer from "./Circle/CircleRenderer";
import AttractToPoint from "./Controllers/AttractToPoint";
import PhysicUpdate from "./Controllers/PhysicUpdate";
import { Interval } from "../CustomTypes/Interval";
import Color from "./Color";
import CircleState from "./Circle/CircleState";
import PhysicTriangleState from "./Triangle/PhysicTriangleState";
import AngleFromVelocity from "./Controllers/AngleFromVelocity";
import ScaleOnVelocity from "./Controllers/ScaleOnVelocity";
import { BaseGenerator } from "./Abstract/BaseGenerator";
import BlackHolesGenerator from "./Generators/BlackHolesGenerator";
import TriangleStrokeRenderer from "./Triangle/TriangleStrokeRenderer";
import Noise from "./Noise";
import CircleStarRenderer from "./Circle/CircleStarRenderer";
import SizeFromPositionAndNoise from "./Controllers/SizeFromPositionAndNoise";
import PhysicCircleState from "./Circle/PhysicCircleState";
import LoopInBox from "./Controllers/LoopInBox";
import Rotate2D from "./Controllers/Rotate2D";
import SizeOverTime from "./Controllers/SizeOverTime";
import TriangleState from "./Triangle/TriangleState";
import TriangleRenderer from "./Triangle/TriangleRenderer";
import TreeState from "./Tree/TreeState";
import TreeRenderer from "./Tree/TreeRenderer";
import RandomVelocity from "./Controllers/RandomVelocity";

const overTimeFunctions = [
    (time: number, amount: number, offset: number) => Math.sin(time * 0.05 + offset * Math.PI * 2) * amount,
    (time: number, amount: number, offset: number) => Math.cos(time * 0.05 + offset * Math.PI * 2) * amount,
]

const blueColors = [
    new Color(192, 75, 242),
    new Color(98, 50, 166),
    new Color(32, 68, 140),
    new Color(61, 113, 217),
    new Color(166, 3, 33),
    new Color(89, 2, 50)
]

const treeColors = [
    new Color(242, 80, 169),
    new Color(166, 41, 145),
    new Color(115, 34, 101),
    new Color(2, 94, 115),
    new Color(3, 127, 140),
    new Color(89, 204, 217),
]


const center = {x: window.innerWidth / 2, y: window.innerHeight / 2};
const simplex = Noise.get();

export function CanvasSetup() {

    const htmlCanvas = document.querySelector('canvas');
    const context = htmlCanvas.getContext('2d');


    let particles:  BaseDrawable[] = (new Array(200)).fill(0).map(e => generateParticles({min: 0, max: window.innerWidth}, {min: 0, max: window.innerHeight}));
    let bg: BaseDrawable[] = (new Array(200)).fill(0).map(e => generateBg());
    let trees: BaseDrawable[] = (new Array(80)).fill(0).map((e, i, a) => generateTree(i / a.length));

    const drawnObject = [
        new BaseDrawable(
            new RectangleState({
                position: {x: window.innerWidth / 2, y: window.innerHeight / 2},
                size: {width: window.innerWidth, height: window.innerHeight},
                color: new Color(0, 0, 0, 1)
            }),
            new RectangleRenderer()
        ),
        ...trees
        // ...bg,
        // new BaseGenerator(
        //     new BlackHolesGenerator()
        // ),
        // ...particles,

    ]

    return new Canvas(drawnObject, htmlCanvas, context);
}

function generateTree(progression: number) {
    if (Math.random() > 0.8) {
        return new BaseDrawable(
            new TreeState({
                color: treeColors[Math.floor(Math.random() * treeColors.length)],
                iterations: 9,
                size: 120,
                position: {x: window.innerWidth * Math.random(), y: (window.innerHeight / 2) * progression + 50 + window.innerHeight / 2},
                angle: Math.PI / 8
            }),
            new TreeRenderer()
        )
    } else {
        return new BaseDrawable(
            new PhysicCircleState({
                size: 1.5,
                color: new Color(255, 255, 255),
                position: {x: window.innerWidth * Math.random(), y: (window.innerHeight / 2) * progression + window.innerHeight / 2},
                velocity: {x: 0, y: 0},
                acceleration: {x: 0, y: 0}
            }),
            new CircleStarRenderer(),
            [],
            [
                new LoopInBox({
                    horizontalInterval: {
                        min: 0,
                        max: window.innerWidth
                    },
                    verticalInterval: {
                        min: 0,
                        max: window.innerHeight
                    }
                }),
                new SizeOverTime({
                    offset: Math.random(),
                    amount: 0.5,
                    func: (time: number, amount: number, offset: number) => Math.sin(time * 0.01 + offset * Math.PI * 2) * amount
                }),
                new RandomVelocity(),
                new PhysicUpdate({
                    inertia: 0
                })
            ]
        )
    }
}

function generateParticles(horizontalInterval: Interval, verticalInterval: Interval) : BaseDrawable {
    const x = horizontalInterval.min + (Math.random() * (horizontalInterval.max - horizontalInterval.min));
    const y = verticalInterval.min + (Math.random() * (verticalInterval.max - verticalInterval.min));
    return new BaseDrawable(
        new PhysicTriangleState({
            size: 4,
            angle: 0,
            color: blueColors[Math.floor(Math.random() * blueColors.length)],
            position: {x, y},
            velocity: {x: 0.5 - Math.random(), y: 0.5 - Math.random()},
            acceleration: {x: 0, y: 0}
        }),
        new TriangleStrokeRenderer(),
        [],
        [
            new AttractToPoint({
                mass: 3
            }),
            new ScaleOnVelocity({
                maxVelocity: 2.5,
                amount: 4
            }),
            new AngleFromVelocity(),
            new PhysicUpdate({
                inertia: 0.1
            })
        ]
    )
}

function generateBg() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const speed = 0.1;
    return new BaseDrawable(
        new PhysicCircleState({
            color: new Color(255, 255, 255),
            size: 0.5,
            position: {x, y},
            velocity: {x: speed / 2 - Math.random() * speed, y: speed / 2 - Math.random() * speed},
            acceleration: {x: 0, y: 0}
        }),
        new CircleStarRenderer(),
        [],
        [
            new LoopInBox({
                horizontalInterval: {
                    min: 0,
                    max: window.innerWidth
                },
                verticalInterval: {
                    min: 0,
                    max: window.innerHeight
                }
            }),
            new SizeFromPositionAndNoise({
                offset: Math.random(),
                amount: 0.5,
            }),
            new PhysicUpdate({
                inertia: 0
            })
        ]
    )
}

function randomColor(
    r: number = Math.floor(Math.random() * 255),
    g: number = Math.floor(Math.random() * 255),
    b: number = Math.floor(Math.random() * 255),
    a: number = Math.random()
) : Color {
    r = r || Math.floor(Math.random() * 255);
    g = g || Math.floor(Math.random() * 255);
    b = b || Math.floor(Math.random() * 255);
    a = a || 1;
    return new Color(r, g, b, a);
}

export function generateRadialGradient(gradientData: RadialGradientData, context: CanvasRenderingContext2D) {
    
    const gradient = context.createRadialGradient(
        gradientData.startCenter.x,
        gradientData.startCenter.y,
        gradientData.startRadius,
        gradientData.endCenter.x,
        gradientData.endCenter.y,
        gradientData.endRadius
    );

    gradientData.gradientStop.forEach(colorStop => {
        gradient.addColorStop(colorStop.start, colorStop.color);
    });

    return gradient;
}

export function generateLinearGradient(gradientData: LinearGradientData, context: CanvasRenderingContext2D) {
    
    const gradient = context.createLinearGradient(
        gradientData.startPoint.x,
        gradientData.startPoint.y,
        gradientData.endPoint.x,
        gradientData.endPoint.y
    );

    gradientData.gradientStop.forEach(colorstop => {
        gradient.addColorStop(colorstop.start, colorstop.color);
    });

    return gradient;
}

export function makeImage(url: string) {
    const image = new Image()
    image.src = url
    return image
}
