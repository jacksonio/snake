import type {TDirection, IGenerate, IObjectSnakeBlock} from './types.ts';

export class Snake implements IGenerate<IObjectSnakeBlock> {
    private blocks: IObjectSnakeBlock[];
    private direction: TDirection;
    private prevMoveLastBlockCoords: Pick<IObjectSnakeBlock, 'x' | 'y'>;
    private readonly fieldWidth: number;
    private readonly fieldHeight: number

    constructor(fieldWidth: number, fieldHeight: number) {
        this.direction = 'Right';
        this.prevMoveLastBlockCoords = {x: 0, y: 0};
        this.blocks = [];
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
    }

    public generate(): IObjectSnakeBlock {
        const heightPivot = Math.ceil((this.fieldHeight / 2) - 1);
        const lengthPivot = Math.ceil((this.fieldWidth / 2) - 1);

        const snakeHead: IObjectSnakeBlock = {
            x: lengthPivot,
            y: heightPivot,
            blockType: 'head',
            id: crypto.randomUUID(),
        };

        this.blocks = [snakeHead];

        return snakeHead;
    }

    public move(): IObjectSnakeBlock[] {
        let prevBlock: IObjectSnakeBlock | null = null;

        const lastBlock: IObjectSnakeBlock = this.blocks.at(-1)!;

        this.prevMoveLastBlockCoords = {x: lastBlock.x, y: lastBlock.y};

        for (let i = 0; i < this.blocks.length; i++) {
            const currentBlock = this.blocks[i];

            if (prevBlock) {
                const newPrev = currentBlock;

                this.blocks[i] = {...currentBlock, x: prevBlock.x, y: prevBlock.y};
                prevBlock = newPrev;
            } else {
                prevBlock = currentBlock;

                let xCoord = currentBlock.x;
                let yCoord = currentBlock.y;

                switch (this.direction) {
                    case 'Right':
                        xCoord = xCoord === this.fieldWidth - 1 ? 0 : xCoord + 1;
                        break;
                    case 'Left':
                        xCoord = xCoord === 0 ? this.fieldWidth - 1 : xCoord - 1;
                        break;
                    case 'Top':
                        yCoord = yCoord === 0 ? this.fieldHeight - 1 : yCoord - 1;
                        break;
                    case 'Bottom':
                        yCoord = yCoord === this.fieldHeight - 1 ? 0 : yCoord + 1;
                }

                this.blocks[i] = {x: xCoord, y: yCoord, id: currentBlock.id, blockType: currentBlock.blockType};
            }
        }

        return this.blocks;
    }

    public setDirection(direction: TDirection): void {
        if (this.direction === direction) return;

        const oppositeHash: Record<TDirection, TDirection> = {
            Top: 'Bottom',
            Right: 'Left',
            Left: 'Right',
            Bottom: 'Top',
        };

        if (direction === oppositeHash[this.direction]) return;

        this.direction = direction;
    }

    public getDirection(): TDirection {
        return this.direction;
    }

    public getBlocks(): IObjectSnakeBlock[] {
        return this.blocks;
    }

    public grove(): IObjectSnakeBlock[] {
        const newBlock: IObjectSnakeBlock = {
            x: this.prevMoveLastBlockCoords.x,
            y: this.prevMoveLastBlockCoords.y,
            blockType: 'body',
            id: crypto.randomUUID()
        };

        this.blocks.push(newBlock);

        return this.blocks;
    }
}

