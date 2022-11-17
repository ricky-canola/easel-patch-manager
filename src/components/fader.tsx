import * as React from "react";
import { connect } from "react-redux";
import { dispatchUpdateFader } from "../store/dispatch";
import { State } from "../store/reducer";
import { toSVGCoordinate } from "../util";
import { LabelText } from "./labelText";

export interface FaderProps {
    color: string;
    top: number;
    left: number;
    value: number;
    module: string;
    fader: string;
    onChange?: (value: number) => void;
    label?: string;

    dispatchUpdateFader: (module: string, param: string, value: number) => void;
}

const MAX_VALUE = 0x7ff;
const FADER_HEIGHT = 220;
const FADER_WIDTH = 15;
const HANDLE_WIDTH = 12;

export const FaderViewImpl = (props: FaderProps) => {
    const { color, left, top, label, value, module, fader, dispatchUpdateFader } = props;

    const attachEvents = (g: SVGGElement) => {
        if (!g) return;
        if (window.PointerEvent) {
            const pointerUpdate = (e: PointerEvent) => {
                if (!e.buttons) return;
                const rect = g.getBoundingClientRect();

                const eventPoint = toSVGCoordinate(g.ownerSVGElement!, e.clientX, e.clientY);
                const rectPoint = toSVGCoordinate(g.ownerSVGElement!, rect.left, rect.top);

                dispatchUpdateFader(module, fader, ((1 - ((eventPoint.y - rectPoint.y) / FADER_HEIGHT)) * MAX_VALUE) | 0);
            }

            let frameRef: number | undefined = undefined;;

            const throttled = (e: PointerEvent) => {
                if (frameRef) cancelAnimationFrame(frameRef);
                frameRef = requestAnimationFrame(() => {
                    frameRef = undefined;
                    pointerUpdate(e);
                })
            }

            g.addEventListener("pointerdown", throttled);
            g.addEventListener("pointermove", throttled);
        }
    }



    const offset = (1 - (value / MAX_VALUE)) * FADER_HEIGHT;

    return <g transform={`translate(${left}, ${top})`} ref={attachEvents}>
        <rect className="easel-fader-bg"
            fill={color}
            height={FADER_HEIGHT}
            width={FADER_WIDTH / 3}
            x={FADER_WIDTH / 3}
            y={0}
            fillOpacity="0.6"
            rx={FADER_WIDTH / 6}
            stroke="var(--color-outline)" />
        <rect className="easel-fader-bg"
            fill={color}
            height={FADER_HEIGHT - offset}
            width={FADER_WIDTH / 3}
            x={FADER_WIDTH / 3}
            y={offset}
            rx={FADER_WIDTH / 6}
            stroke="var(--color-outline)" />
        <circle className="easel-fader-handle"
            fill={color}
            r={HANDLE_WIDTH}
            cx={FADER_WIDTH / 3 + FADER_WIDTH / 6}
            cy={offset}
            stroke="var(--color-outline)" />
        <rect width={FADER_WIDTH} height={FADER_HEIGHT} x="0" y="0" opacity="0" />
        {label && <LabelText text={label} x={FADER_WIDTH / 2} y={FADER_HEIGHT + 50} anchor="middle"/>}
    </g>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
        value: (state.patch as any)[ownProps.module]?.[ownProps.fader],
    }
}

const mapDispatchToProps = {
    dispatchUpdateFader,
};

export const FaderView = connect(mapStateToProps, mapDispatchToProps)(FaderViewImpl);