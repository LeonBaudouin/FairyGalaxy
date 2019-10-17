import { Point } from "../CustomTypes/Point";

export interface GradientStop {
    start: number,
    color: string
}

export interface RadialGradientData {
    startCenter: Point,
    startRadius: number,
    endCenter: Point,
    endRadius: number,
    gradientStop: GradientStop[]
}

export interface LinearGradientData {
    startPoint: Point,
    endPoint: Point,
    gradientStop: GradientStop[]
}
