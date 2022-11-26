import * as React from "react";
import { distance } from "../util";

export interface CableProps {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    colorIndex: number;
    onClick?: () => void;
}

export const Cable = (props: CableProps) => {
    let { x0, y0, x1, y1, colorIndex, onClick } = props;

    if (x0 < x1) {
        let swap = x0;
        x0 = x1;
        x1 = swap;
        swap = y0;
        y0 = y1;
        y1 = swap;
    }


    const d = distance(x0, y0, x1, y1);
    const pathString = `M ${x0} ${y0} q ${(x1 - x0) / 2} ${Math.min(Math.max(10, 200 - d / 10), 100)} ${x1 - x0} ${y1 - y0}`;

    return <>
        <path
            className="cable-bg"
            d={pathString}
            stroke="var(--color-outline)"
            fill="none"
            strokeWidth={12}
            strokeLinecap="round"
            onClick={onClick}
            />
        <path
            d={pathString}
            stroke={`var(--color-cable-${colorIndex % 9})`}
            fill="none"
            strokeWidth={10}
            strokeLinecap="round"
            onClick={onClick}
            />

    </>
}
