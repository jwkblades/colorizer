import { Abstract } from "../Abstract.js";
import { ColorizeException } from "../ColorizeException.js";

/**
 * Abstract Class Color
 *
 * Must have the following functions:
 * * `_delta(percent:Number, other:Color): Color` - Given a percentage between
 *     0 and 1, and another Color, return a mixed color that is somewhere in
 *     between this and the other.
 * * `toString(): string` - Returns a string representation of the color, in a
 *     CSS-compatible format.
 */
export class Color extends Abstract
{
    /**
     * Color constructor, primarily used to verify we aren't attempting to
     * instantiate an abstract Color, and that we have the required
     * functionality implemented.
     *
     * @throws ColorizeException if an attempt to instantiate an Color class is
     *     made.
     */
    constructor()
    {
        super(["_delta", "toString", "toRGB"]);
        if (new.target === Color)
        {
            throw new ColorizeException("Cannot instantiate an abstract class Color.");
        }
    }

    /**
     * Mix two colors together, at a percentage between this and the other one.
     *
     * @param Number percent - Should be a number between 0 and 1, inclusive.
     * @param Color other - Another color, that is compatible with this one,
     *     which should be mixed together.
     * @return Color - A composite Color which is somewhere between the two
     *     Colors, this is typically defined by the percent value to decide how
     *     close to one color or the other the result is.
     */
    mix(percent, other)
    {
        if (!(other instanceof Color))
        {
            throw new ColorizeException("Cannot mix a non-Color.");
        }

        return this._delta(percent, other);
    }
};


