export default class Noise {
    private static simplex: any = null;

    public static get() {
        if (Noise.simplex == null) {
            Noise.simplex = new (require('simplex-noise'))();
        }
        return Noise.simplex;
    }
}
