import { RGB } from "./RGB.js";

class RGBA extends RGB
{
    /**
     * RGB Constructor
     *
     * @param Number r - The red value, between 0 and 255
     * @param Number g - The green value, between 0 and 255
     * @param Number b - The blue value, between 0 and 255
     * @param Number a - Alpha channel, between 0 and 1
     */
    constructor(r, g, b, a)
    {
        super(r, g, b);
        this.alpha = a;
    }

    /**
     * Find a mixed color.
     *
     * @param Number percent - A number between 0 and 1, inclusive.
     * @param RGBA other - Another RGBA to be mixed with.
     * @return RGBA - The resulting color.
     */
    _delta(percent, other)
    {
        const rgb = super._delta(percent, other);
        const top = this.alpha;
        const bottom = other.alpha || 1;
        const newAlpha = Math.max(0, Math.min(1, (percent * (top - bottom)) + bottom));

        return new RGBA(...rgb.color, newAlpha);
    }

    /**
     * Get the string.
     *
     * @return string - The string representation of the color, in the form of
     *     RGB(rrr, ggg, bbb)
     */
    toString()
    {
        return "RGBA(" + this.color.join(", ") + ", " + this.alpha + ")";
    }
};
