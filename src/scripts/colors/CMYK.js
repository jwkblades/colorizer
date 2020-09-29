import { Color } from "./Color.js";
import { RGB } from "./RGB.js";
import { ColorizeException } from "../ColorizeException.js";

/**
 * CMYK print color
 */
export class CMYK extends Color
{
    /**
     * CMYK Constructor
     *
     * @param Number c - Cyan value, between 0 and 1
     * @param Number m - Magenta value, between 0 and 1
     * @param Number y - Yellow value, between 0 and 1
     * @param Number k - Black value, between 0 and 1
     */
    constructor(c, m, y, k)
    {
        super();
        this.c = c;
        this.m = m;
        this.y = y;
        this.k = k;
    }

    /**
     * Find a mixed color.
     *
     * @param Number percent - A number between 0 and 1, inclusive.
     * @param CMYK other - Another CMYK to be mixed with.
     * @return CMYK - The resulting color.
     */
    _delta(percent, other)
    {
        if (!(other instanceof CMYK))
        {
            throw new ColorizeException("Cannot mix an CMYK color with non-CMYK color.");
        }

        return new CMYK(
            Math.max(0, Math.min(1, (percent * (this.c - other.c)) + other.c)),
            Math.max(0, Math.min(1, (percent * (this.m - other.m)) + other.m)),
            Math.max(0, Math.min(1, (percent * (this.y - other.y)) + other.y)),
            Math.max(0, Math.min(1, (percent * (this.k - other.k)) + other.k)),
        );
    }

    /**
     * Convert to a RGB Color
     *
     * @return RGB
     */
    toRGB()
    {
        const dk = 1 - this.k;
        return new RGB(
            255 * (1 - this.c) * dk,
            255 * (1 - this.m) * dk,
            255 * (1 - this.y) * dk
        );
    }

    /**
     * @return string A web-safe representation of the color
     */
    toString()
    {
        return this.toRGB().toString();
    }

};

