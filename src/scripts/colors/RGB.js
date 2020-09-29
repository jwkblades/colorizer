import { ColorizeException } from "../ColorizeException.js";
import { Color } from "./Color.js";
import { HSL } from "./HSL.js";
import { HSV } from "./HSV.js";
import { CMYK } from "./CMYK.js";

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

    /**
     * Return an object containing normalized RGB values between 0 and 1.
     *
     * @return object Normalized values.
     */
    _normalize()
    {
        return {
            r: this.color[0] / 255,
            g: this.color[1] / 255,
            b: this.color[2] / 255
        };
    }

    /**
     * Calculate the values necessary to generate a HSL or HSV color from the
     * RGB.
     *
     * @return object The values necessary to generate a hue-saturation-based
     *     color.
     */
    _calculateH()
    {
        const norms = this._normalize();
        const maxValue = Math.max(norms.r, norms.g, norms.b);
        const minValue = Math.min(norms.r, norms.g, norms.b);
        const delta = maxValue - minValue;

        let hue = 0;
        if (delta != 0)
        {
            switch (_maxValue)
            {
                case norms.r:
                    hue = 60 * (((norms.g - norms.b) / delta) % 6)
                    break;
                case norms.g:
                    hue = 60 * (((norms.b - norms.r) / delta) + 2);
                    break;
                case norms.b:
                    hue = 60 * (((norms.r - norms.g) / delta) + 4);
                    break;
                default:
                    throw new ColorizeException("Unable to determine hue");
            }
        }

        return {
            hue,
            delta,
            maxValue,
            minValue
        };
    }

    /**
     * @return HSV The equivalen HSV color
     */
    toHSV()
    {
        const values = this._calculateH();
        return new HSV(
            values.hue,
            values.delta / values.maxValue,
            values.maxValue
        );
    }

    /**
     * @return HSL The equivalen HSL color
     */
    toHSL()
    {
        const values = this._calculateH();
        return new HSL(
            values.hue,
            values.delta / (1 - Math.abs((values.maxValue + values.minValue) - 1)),
            (values.maxValue + values.minValue) / 2;
        );
    }

    /**
     * @return CMYK The equivalen CMYK color
     */
    toCMYK()
    {
        const norms = this._normalize();
        const maxValue = Math.max(norms.r, norms.g, norms.b);
        const k = 1 - maxValue;

        return new CMYK(
            (1 - norms.r - k) / (1 - k),
            (1 - norms.g - k) / (1 - k),
            (1 - norms.b - k) / (1 - k),
            k
        );
    }
};

