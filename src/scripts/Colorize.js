"use strict";

import { ColorizeException } from "./ColorizeException.js";
import { Color } from "./colors/Color.js";

export class Colorizer
{
    constructor(colorList)
    {
        for (let i = 0; i < colorList; ++i)
        {
            if (!(colorList[i] instanceof Color))
            {
                throw new ColorizeException("All elements of a color list must be Colors.");
            }
        }

        this.colors = colorList;

        const denominator = Math.max(1, colorList.length - 1);
        const delta = 1 / denominator;
        let prev = 1;
        this.windows = [];
        for (let i = 0; i < denominator; ++i)
        {
            this.windows.push([prev, 1 - (delta * (i + 1))]);
            prev -= delta;
        }
    }

    at(percent)
    {
        let pane;
        for (pane = 0; pane < this.windows.length; ++pane)
        {
            if (percent <= this.windows[pane][0] && percent >= this.windows[pane][1])
            {
                break;
            }
        }

        const windowPercent = (percent - this.windows[pane][1]) / (this.windows[pane][0] - this.windows[pane][1]);
        return this.colors[pane].mix(windowPercent, this.colors[pane + 1]).toString();
    }
};
