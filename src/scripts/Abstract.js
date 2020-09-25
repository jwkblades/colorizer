/**
 * Abstract Class Abstract
 *
 * Used for determining if a virtual function is defined for a class, or not.
 */
export class Abstract
{
    /**
     * Abstract constructor
     *
     * @param string[] virtual - A list of strings that represent function
     *     names required to be defined in the class. If any one of them is not
     *     defined, then an Error is thrown.
     * @throws Error if an attempt to instantiate an Abstract class is made.
     * @throws Error if any of the virtual functions provided do not exist.
     */
    constructor(virtual)
    {
        if (new.target === Abstract)
        {
            throw new Error("Cannot instantiate an abstract class Abstract.");
        }

        for (let i = 0; i < virtual.length; ++i)
        {
            if (typeof this[virtual[i]] !== "function")
            {
                throw new Error("Colors must have a " + virtual[i] + " function.");
            }
        }
    }
};
