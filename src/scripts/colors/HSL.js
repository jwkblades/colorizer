import { Color } from "./Color.js";
import { ColorizeException } from "../ColorizeException.js";
import { RGB } from "./RGB.js";

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

    toRGB()
    {
        const c = (1 - Math.abs((2 * this.lightness) - 1)) * this.saturation;
        const x = c * (1 - Math.abs(((this.hue / 60) % 2) - 1));
        const m = this.lightness - (c / 2);
        
        let rPrime = 0;
        let gPrime = 0;
        let bPrime = 0;

        if (0 <= this.hue && this.hue < 60)
        {
            rPrime = c;
            gPrime = x;
            bPrime = 0;
        }
        else if (60 <= this.hue && this.hue < 120)
        {
            rPrime = x;
            gPrime = c;
            bPrime = 0;
        }
        else if (120 <= this.hue && this.hue < 180)
        {
            rPrime = 0;
            gPrime = c;
            bPrime = x;
        }
        else if (180 <= this.hue && this.hue < 240)
        {
            rPrime = 0;
            gPrime = x;
            bPrime = c;
        }
        else if (240 <= this.hue && this.hue < 300)
        {
            rPrime = x;
            gPrime = 0;
            bPrime = c;
        }
        else
        {
            rPrime = c;
            gPrime = 0;
            bPrime = x;
        }

        return new RGB(
            Math.floor((rPrime + m) * 255),
            Math.floor((gPrime + m) * 255),
            Math.floor((bPrime + m) * 255)
        );
    }

    /**
     * @return string The string representation of this color.
     */
    toString()
    {
        const sat = Math.round(this.saturation * 100);
        const light = Math.round(this.lightness * 100);
        return "HSL(" + this.hue + ", " + sat + "%, " + light + "%)";
    }
};

