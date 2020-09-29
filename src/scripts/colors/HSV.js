import { RGB } from "./RGB.js";
import { Color } from "./Color.js";
import { ColorizeException } from "../ColorizeException.js";

/**
 * Hue, Saturation, Value class
 */
export class HSV extends Color
{
    /**
     * HSL Constructor
     *
     * @param Number hue - The hue, between 0 and 359
     * @param Number saturation - The saturation, between 0 and 1
     * @param Number value - The value, between 0 and 1
     */
    constructor(hue, saturation, value)
    {
        super();
        this.hue = hue;
        this.saturation = saturation;
        this.value = value;
    }

    /**
     * Find a mixed color.
     *
     * @param Number percent - A number between 0 and 1, inclusive.
     * @param HSV other - Another HSV to be mixed with.
     * @return HSV - The resulting color.
     */
    _delta(percent, other)
    {
        if (!(other instanceof HSV))
        {
            throw new ColorizeException("Cannot mix an HSV color with non-HSV color.");
        }

        return new HSV(
            Math.max(0, Math.min(359, Math.floor((percent * (this.hue - other.hue)) + other.hue))),
            Math.max(0, Math.min(1, (percent * (this.saturation - other.saturation)) + other.saturation)),
            Math.max(0, Math.min(1, (percent * (this.value - other.value)) + other.value)),
        );
    }

    /**
     * @return RGB The RGB representation of this color
     */
    toRGB()
    {
        const c = this.value * this.saturation;
        const x = c * (1 - Math.abs(((this.hue / 60) % 2) - 1));
        const m = this.value - c;
        
        let rPrime = 0;
        let gPrime = 0;
        let bPrime = 0;

        if (0 <= this.hue < 60)
        {
            rPrime = c;
            gPrime = x;
            bPrime = 0;
        }
        else if (60 <= this.hue < 120)
        {
            rPrime = x;
            gPrime = c;
            bPrime = 0;
        }
        else if (120 <= this.hue < 180)
        {
            rPrime = 0;
            gPrime = c;
            bPrime = x;
        }
        else if (180 <= this.hue < 240)
        {
            rPrime = 0;
            gPrime = x;
            bPrime = c;
        }
        else if (240 <= this.hue < 300)
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
        return this.toRGB().toString();
    }
};

