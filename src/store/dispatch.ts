// export interface Easel {
//     sequencer: SequentialVoltageSource;
//     envelope: EnvelopeGenerator;
//     pulser: Pulser;
//     modOsc: ModulationOscillator;
//     complexOsc: ComplexOscillator;
//     gates: DualLoPassGate;
//     random: Random;
//     connections: boolean[][];
// }

import { ConnectionPoint } from "../components/jack";
import { SavedPatch } from "../indexedDB";
import { ComplexOscillator, DualLoPassGate, Easel, EnvelopeGenerator, ModulationOscillator, Pulser, Random, SwitchValue, ModalType, MidiMessageSpeed } from "../types";
import { CONNECT_CV, CREATE_NEW_PATCH, DISCONNECT_CV, HIDE_MODAL, OPEN_SAVED_PATCH, SET_DRAG_POINT, SET_MIDI_INPUT, SET_MIDI_OUTPUT, SET_MIDI_SPEED, SET_PATCH, SET_PATCH_EDITED, SET_PATCH_NAME, SHOW_MODAL, SHOW_SAVE_MODAL, UPDATE_FADER, UPDATE_SWITCH } from "./actions";


export function dispatchUpdateFader(module: "envelope", param: keyof EnvelopeGenerator, value: number): any;
export function dispatchUpdateFader(module: "pulser", param: keyof Pulser, value: number): any;
export function dispatchUpdateFader(module: "modOsc", param: keyof ModulationOscillator, value: number): any;
export function dispatchUpdateFader(module: "complexOsc", param: keyof ComplexOscillator, value: number): any;
export function dispatchUpdateFader(module: "gates", param: keyof DualLoPassGate, value: number): any;
export function dispatchUpdateFader(module: "random", param: keyof Random, value: number): any;
export function dispatchUpdateFader(module: keyof Easel, param: string, value: number) {
    return {
        type: UPDATE_FADER,
        module,
        param,
        value
    };
};

export function dispatchUpdateSwitch(module: "envelope", param: keyof EnvelopeGenerator, value: SwitchValue): any;
export function dispatchUpdateSwitch(module: "pulser", param: keyof Pulser, value: SwitchValue): any;
export function dispatchUpdateSwitch(module: "modOsc", param: keyof ModulationOscillator, value: SwitchValue): any;
export function dispatchUpdateSwitch(module: "complexOsc", param: keyof ComplexOscillator, value: SwitchValue): any;
export function dispatchUpdateSwitch(module: "gates", param: keyof DualLoPassGate, value: SwitchValue): any;
export function dispatchUpdateSwitch(module: "random", param: keyof Random, value: SwitchValue): any;
export function dispatchUpdateSwitch(module: keyof Easel, param: string, value: SwitchValue) {
    return {
        type: UPDATE_SWITCH,
        module,
        param,
        value
    };
};

export function dispatchSetDragPoint(connectionPoint: ConnectionPoint, id: number, x: number, y: number) {
    return {
        type: SET_DRAG_POINT,
        connectionPoint,
        id,
        x,
        y
    }
}

export function dispatchConnectCV(startPoint: ConnectionPoint, startId: number, endPoint: ConnectionPoint, endId: number) {
    return {
        type: CONNECT_CV,
        startPoint,
        startId,
        endPoint,
        endId
    }
}

export function dispatchDisconnectCV(startPoint: ConnectionPoint, startId: number, endPoint: ConnectionPoint, endId: number) {
    return {
        type: DISCONNECT_CV,
        startPoint,
        startId,
        endPoint,
        endId
    }
}

export function dispatchSetMIDIInput(name: string) {
    return {
        type: SET_MIDI_INPUT,
        name
    }
}

export function dispatchSetMIDIOutput(name: string) {
    return {
        type: SET_MIDI_OUTPUT,
        name
    }
}

export function dispatchSetPatch(patch: Easel) {
    return {
        type: SET_PATCH,
        patch
    }
}

export function dispatchSetPatchName(name: string) {
    return {
        type: SET_PATCH_NAME,
        name
    }
}

export function dispatchShowModal(modalType: ModalType) {
    return {
        modalType,
        type: SHOW_MODAL
    }
}

export function dispatchHideModal() {
    return {
        type: HIDE_MODAL
    }
}

export function dispatchOpenSavedPatch(patch: SavedPatch) {
    return {
        patch,
        type: OPEN_SAVED_PATCH
    }
}

export function dispatchSetMidiSpeed(speed: MidiMessageSpeed) {
    return {
        speed,
        type: SET_MIDI_SPEED
    }
}

export function dispatchSetPatchEdited(edited: boolean) {
    return {
        edited,
        type: SET_PATCH_EDITED
    }
}

export function dispatchShowSaveModal(patch?: SavedPatch) {
    return {
        patch,
        type: SHOW_SAVE_MODAL
    }
}

export function dispatchCreateNewPatch() {
    return {
        type: CREATE_NEW_PATCH
    }
}