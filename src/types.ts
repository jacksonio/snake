export interface IGenerate<Output> {
    generate(width: number, height: number): Output;
}

export type TObjectBlock = [number, number];

export enum EDirection {
    TOP, LEFT, RIGHT, BOTTOM
}
