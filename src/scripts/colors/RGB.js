import { ColorizeException } from "../ColorizeException.js";
import { Color } from "./Color.js";

/**
 * RGB A composite RGB color with red, green, and blue channels.
 */
export class RGB extends Color
{
    /**
     * RGB Constructor
     *
     * @param Number r - The red value, between 0 and 255
     * @param Number g - The green value, between 0 and 255
     * @param Number b - The blue value, between 0 and 255
     */
    constructor(r, g, b)
    {
        super();
        this.color = [r, g, b];
    }

    /**
     * Find a mixed color.
     *
     * @param Number percent - A number between 0 and 1, inclusive.
     * @param RGB other - Another RGB to be mixed with.
     * @return RGB - The resulting color.
     */
    _delta(percent, other)
    {
        if (!(other instanceof RGB))
        {
            throw new ColorizeException("Cannot mix an RGB color with non-RGB color.");
        }

        let ret = [];
        for (let i = 0; i < this.color.length; ++i)
        {
            const top = this.color[i];
            const bottom = other.color[i];
            ret.push(Math.max(0, Math.min(255, Math.floor((percent * (top - bottom)) + bottom))));
        }

        return new RGB(...ret);
    }

    /**
     * Get the string.
     *
     * @return string - The string representation of the color, in the form of
     *     RGB(rrr, ggg, bbb)
     */
    toString()
    {
        return "RGB(" + this.color.join(", ") + ")";
    }
};

