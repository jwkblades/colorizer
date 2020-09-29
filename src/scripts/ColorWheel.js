import { Color } from "./colors/Color.js";
import { ColorizeException } from "./ColorizeException.js";
import { HSL } from "./colors/HSL.js";
import { RGB } from "./colors/RGB.js";

export class ColorWheel
{
    constructor(initialColor)
    {
        if (!(initialColor instanceof Color))
        {
            throw new ColorizeException("Color wheels need an initial color to be based off of.");
        }

        this.color = initialColor.toRGB().toHSL();
        this._element = null;
        this._render();
    }

    _render()
    {
        if (this._element != null)
        {
            return;
        }

        const degs2Radians = function(d)
        {
            return (d / 180) * Math.PI;
        };
        const coords = function(r, theta, around)
        {
            const x = around.x + r * Math.cos(theta);
            const y = around.y + -r * Math.sin(theta);
            return {x, y};
        };

        this._element = document.createElement("canvas");
        this._element.width = "300";
        this._element.height = "300";
        let ctx = this._element.getContext("2d");

        const maxRadius = (300 - 2) / 2;
        const lightnessDelta = 0.005;
        const offset = 30;
        const center = {x: 150, y: 150};
        let counter = 101;
        for (let lightness = .5; lightness <= 1; lightness += lightnessDelta)
        {
            const hueDelta = 360 / (2 * counter--);
            const innerRadius = maxRadius * ((1 - lightness) / 0.5);
            for (let hue = 0; hue <= 360; hue += hueDelta)
            {
                const angle = degs2Radians(offset + hue);
                const delta = degs2Radians(offset + hue + hueDelta);
                const coords1 = coords(innerRadius, angle, center);
                const coords2 = coords(innerRadius, delta, center);

                ctx.beginPath();
                ctx.moveTo(center.x, center.y);
                ctx.lineTo(coords1.x, coords1.y);
                ctx.lineTo(coords2.x, coords2.y);
                ctx.lineTo(center.x, center.y);
                const c = new HSL(hue, 1, lightness);
                ctx.fillStyle = c.toRGB().toString();
                ctx.fill();
            }
        }
    }

    appendTo(ele)
    {
        this._render();
        ele.appendChild(this._element);
    }
};
