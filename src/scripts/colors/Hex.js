import { RGB } from "./RGB.js";

export class Hex extends RGB
{
    /**
     * Hex Constructor
     *
     * @param Number value - The hexadecimal number to convert to RGB, should
     *     be formatted as in 0xRRGGBB
     */
    constructor(value)
    {
        super(
            (value & (0xff << 16)) >> 16,
            (value & (0xff << 8)) >> 8,
            value & 0xff
        );
    }

    /**
     * Convert Hex color to hexadecimal string
     *
     * @return string Hexadecimal string representation of the color.
     */
    toString()
    {
        return "#"
            + this.color[0].toString(16)
            + this.color[1].toString(16)
            + this.color[2].toString(16);
    }
};
