export interface IGenerate<Output> {
    generate(width: number, height: number): Output;
}

export interface IObjectBlock {
    id: string;
    x: number;
    y: number;
}

export interface IObjectSnakeBlock extends IObjectBlock {
    blockType: TSnakeBlockType;
}

export type TSnakeBlockType = 'head' | 'body';

export type TObjectFieldBlock = { objectType: EObjectType, id: string, blockType?: TSnakeBlockType };

export type TDirection = 'Top' | 'Left' | 'Right' | 'Bottom';

export enum EObjectType {
    FIELD, SNAKE, FOOD
}
