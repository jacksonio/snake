import {IGenerate, TObjectBlock} from './types.ts';

export class Food implements IGenerate<TObjectBlock> {
    static readonly symbol: number = 2;

    private location: TObjectBlock = [0, 0];

    constructor(private readonly fieldWidth: number, private readonly fieldHeight: number) {
    }

    public generate(): TObjectBlock {
        const x = Math.floor(Math.random() * this.fieldWidth);
        const y = Math.floor(Math.random() * this.fieldHeight);

        this.location = [x, y] as TObjectBlock;

        return this.location;
    }

    public getLocation(): TObjectBlock {
        return this.location;
    }
}
