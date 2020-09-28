import { Color } from "./Color.js";
import { ColorizeException } from "../ColorizeException.js";

/**
 * Hue, Saturation, Lightness class
 */
export class HSL extends Color
{
    /**
     * HSL Constructor
     *
     * @param Number hue - The hue, between 0 and 359
     * @param Number saturation - The saturation, between 0 and 1
     * @param Number lightness - The lightness, between 0 and 1
     */
    constructor(hue, saturation, lightness)
    {
        super();
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
    }

    /**
     * Find a mixed color.
     *
     * @param Number percent - A number between 0 and 1, inclusive.
     * @param HSL other - Another HSL to be mixed with.
     * @return HSL - The resulting color.
     */
    _delta(percent, other)
    {
        if (!(other instanceof HSL))
        {
            throw new ColorizeException("Cannot mix an HSL color with non-HSL color.");
        }

        return new HSL(
            Math.max(0, Math.min(359, Math.floor((percent * (this.hue - other.hue)) + other.hue))),
            Math.max(0, Math.min(1, (percent * (this.saturation - other.saturation)) + other.saturation)),
            Math.max(0, Math.min(1, (percent * (this.lightness - other.lightness)) + other.lightness)),
        );
    }

    /**
     * @return string The string representation of this color.
     */
    toString()
    {
        return "HSL(" + this.hue + ", " + this.saturation + ", " + this.lightness + ")";
    }
};

