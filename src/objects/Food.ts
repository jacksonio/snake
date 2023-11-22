import {IGenerate, IObjectBlock} from './types.ts';

export class Food implements IGenerate<IObjectBlock> {
    private location: IObjectBlock = {x: 0, y: 0, id: crypto.randomUUID()};

    constructor(private readonly fieldWidth: number, private readonly fieldHeight: number) {
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
