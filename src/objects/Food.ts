import type {IGenerate, IObjectBlock} from './types.ts';

export class Food implements IGenerate<IObjectBlock> {
    private location: IObjectBlock;
    private readonly fieldWidth: number;
    private readonly fieldHeight: number;

    constructor(fieldWidth: number, fieldHeight: number) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;

        this.location = {x: 0, y: 0, id: crypto.randomUUID()};
    }

    public generate(): IObjectBlock {
        const x = Math.floor(Math.random() * this.fieldWidth);
        const y = Math.floor(Math.random() * this.fieldHeight);

        this.location = {x, y, id: crypto.randomUUID()};

        return this.location;
    }

    public getLocation(): IObjectBlock {
        return this.location;
    }
}
