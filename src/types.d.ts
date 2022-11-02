import { ConnectionPoint } from "./components/jack";

export type EaselKind = "iprogram" | "208c" | "208r"

export type SwitchValue = "top" | "middle" | "bottom";

export interface EnvelopeGenerator {
    attack: number;
    sustain: number;
    decay: number;
    triggerSelect: SwitchValue;
    modeSelect: SwitchValue;
}

export interface SequentialVoltageSource {
    triggerSelect: SwitchValue;
    stages: SwitchValue;

    voltage1: number;
    voltage2: number;
    voltage3: number;
    voltage4: number;
    voltage5: number;

    pulse1: SwitchValue;
    pulse2: SwitchValue;
    pulse3: SwitchValue;
    pulse4: SwitchValue;
    pulse5: SwitchValue;
}

export interface Pulser {
    triggerSelect: SwitchValue;
    modeSelect: SwitchValue;
    periodCV: number;
    period: number;
}

export interface ModulationOscillator {
    keyboard: SwitchValue;
    waveshape: SwitchValue;
    range: SwitchValue;
    modulationType: SwitchValue;
    frequency: number;
    frequencyCV: number;
    modulation: number;
    modulationCV: number;
}

export interface ComplexOscillator {
    keyboard: SwitchValue;
    waveshape: SwitchValue;
    polarity: SwitchValue;
    pitch: number;
    pitchCV: number;
    timbre: number;
    timbreCV: number;
    timbreKnob: number;
}

export interface DualLoPassGate {
    gate2Source: SwitchValue;
    gate1Mode: SwitchValue;
    gate2Mode: SwitchValue;
    level1: number;
    level1CV: number;
    level2: number;
    level2CV: number;
}

export interface Random {
    triggerSource: SwitchValue;
}

export interface Easel {
    sequencer: SequentialVoltageSource;
    envelope: EnvelopeGenerator;
    pulser: Pulser;
    modOsc: ModulationOscillator;
    complexOsc: ComplexOscillator;
    gates: DualLoPassGate;
    random: Random;
    connections: Connection[];
}

export interface ConnectionJack {
    connectionPoint: ConnectionPoint;
    id: number;
}

export interface Connection {
    start: ConnectionJack;
    end: ConnectionJack;
    color: number;
}

// export type EaselModule = keyof Easel;
// export type EnvelopeGeneratorParam = keyof EnvelopeGenerator;
// export type PulserParam = keyof Pulser;
// export type 