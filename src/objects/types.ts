export interface IGenerate<Output> {
    generate(width: number, height: number): Output;
}

export interface IObjectBlock {
    id: string;
    x: number;
    y: number;
}

export type TSnakeBlockType = 'head' | 'body';

export interface IObjectSnakeBlock extends IObjectBlock {
    blockType: TSnakeBlockType;
}

export enum EObjectType {
    FIELD, SNAKE, FOOD
}

export type TObjectFieldBlock = { objectType: EObjectType, id: string, blockType?: TSnakeBlockType };

export enum EDirection {
    TOP, LEFT, RIGHT, BOTTOM
}
