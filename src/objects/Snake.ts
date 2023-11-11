import {EDirection, IGenerate, TObjectBlock} from '../types.ts';

export class Snake implements IGenerate<TObjectBlock> {
    static readonly symbol: number = 1;

    private blocks: TObjectBlock[] = [];
    private direction: EDirection = EDirection.RIGHT;

    constructor(private readonly fieldWidth: number, private readonly fieldHeight: number) {
    }

    public generate(): TObjectBlock {
        const heightPivot = Math.ceil((this.fieldHeight / 2) - 1);
        const lengthPivot = Math.ceil((this.fieldWidth / 2) - 1);

        const snakeHead = [lengthPivot, heightPivot] as TObjectBlock;

        this.blocks.push(snakeHead);

        return snakeHead;
    }

    public move(): TObjectBlock[] {
        let prevBlock: TObjectBlock | null = null;

        for (let i = 0; i < this.blocks.length; i++) {
            const currentBlock = this.blocks[i];

            if (prevBlock) {
                const newPrev = currentBlock;

                this.blocks[i] = prevBlock;
                prevBlock = newPrev;
            } else {
                prevBlock = currentBlock;

                let xCoord = currentBlock[0];
                let yCoord = currentBlock[1];

                switch (this.direction) {
                    case EDirection.RIGHT:
                        xCoord = xCoord === this.fieldWidth - 1 ? 0 : xCoord + 1;
                        break;
                    case EDirection.LEFT:
                        xCoord = xCoord === 0 ? this.fieldWidth - 1 : xCoord - 1;
                        break;
                    case EDirection.TOP:
                        yCoord = yCoord === 0 ? this.fieldHeight - 1 : yCoord - 1;
                        break;
                    case EDirection.BOTTOM:
                        yCoord = yCoord === this.fieldHeight - 1 ? 0 : yCoord + 1;
                }

                this.blocks[i] = [xCoord, yCoord];
            }
        }

        return this.blocks;
    }

    public getDirection(): EDirection {
        return this.direction;
    }

    public setDirection(direction: EDirection): void {
        this.direction = direction;
    }

    public getBlocks(): TObjectBlock[] {
        return this.blocks;
    }

    public grove(): TObjectBlock[] {
        if (this.blocks.length === 1) {
            const head: TObjectBlock = this.blocks[0];

            const newBlock: TObjectBlock = [0, 0];

            switch (this.direction) {
                case EDirection.RIGHT:
                    newBlock[1] = head[1];
                    newBlock[0] = head[0] - 1;
                    break;
                case EDirection.LEFT:
                    newBlock[1] = head[1];
                    newBlock[0] = head[0] + 1;
                    break;
                case EDirection.TOP:
                    newBlock[1] = head[1] + 1;
                    newBlock[0] = head[0];
                    break;
                case EDirection.BOTTOM:
                    newBlock[1] = head[1] - 1;
                    newBlock[0] = head[0];
            }

            this.blocks.push(newBlock);
        } else {
            const [lastBlockX, lastBlockY] = this.blocks.at(-1)!;
            const [preLastBlockX, preLastBlockY] = this.blocks.at(-2)!;

            const newBlock: TObjectBlock = [0, 0];

            // Горизонально
            if (lastBlockY === preLastBlockY) {
                newBlock[1] = lastBlockY;

                if (lastBlockX > preLastBlockX) {
                    //[x+1, y]
                    newBlock[0] = lastBlockX + 1;
                }
                //[x-1, y]
                newBlock[0] = lastBlockX - 1;

                this.blocks.push(newBlock);
            }

            // Вертикально
            if (lastBlockX === preLastBlockX) {
                newBlock[0] = lastBlockX;

                if (lastBlockY > preLastBlockY) {
                    //[x, y + 1]
                    newBlock[1] = lastBlockY + 1;
                }
                //[x, y - 1]
                newBlock[1] = lastBlockY - 1;

                this.blocks.push(newBlock);
            }
        }

        return this.blocks;
    }
}

