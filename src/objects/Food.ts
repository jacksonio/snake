import {IGenerate, TObjectBlock} from '../types.ts';

export class Food implements IGenerate<TObjectBlock> {
    static readonly symbol: number = 2;

    constructor(private readonly fieldWidth: number, private readonly fieldHeight: number) {}

    generate() {
        const x = Math.floor(Math.random() * this.fieldWidth);
        const y = Math.floor(Math.random() * this.fieldHeight);
        return [x, y] as TObjectBlock;
    }
}
