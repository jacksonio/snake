import {EDirection, IGenerate, IObjectSnakeBlock} from './types.ts';

export class Snake implements IGenerate<IObjectSnakeBlock> {
    private blocks: IObjectSnakeBlock[] = [];
    private direction: EDirection = EDirection.BOTTOM;

    constructor(private readonly fieldWidth: number, private readonly fieldHeight: number) {
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

    // TODO think about coordinates as now we have two blocks with same coords for a while.
    public move(): IObjectSnakeBlock[] {
        let prevBlock: IObjectSnakeBlock | null = null;

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

                this.blocks[i] = {x: xCoord, y: yCoord, id: currentBlock.id, blockType: currentBlock.blockType};
            }
        }

        return this.blocks;
    }

    public setDirection(direction: EDirection): void {
        if (this.direction === direction) return;

        const oppositeHash = {
            [EDirection.TOP]: EDirection.BOTTOM,
            [EDirection.RIGHT]: EDirection.LEFT,
            [EDirection.LEFT]: EDirection.RIGHT,
            [EDirection.BOTTOM]: EDirection.TOP,
        };

        if (direction === oppositeHash[this.direction]) return;

        this.direction = direction;
    }

    public getBlocks(): IObjectSnakeBlock[] {
        return this.blocks;
    }

    public grove(): IObjectSnakeBlock[] {
        if (this.blocks.length === 1) {
            const head: IObjectSnakeBlock = this.blocks[0];

            const newBlock: IObjectSnakeBlock = {x: 0, y: 0, id: crypto.randomUUID(), blockType: 'body'};

            switch (this.direction) {
                case EDirection.RIGHT:
                    newBlock.y = head.y;
                    newBlock.x = head.x - 1;
                    break;
                case EDirection.LEFT:
                    newBlock.y = head.y;
                    newBlock.x = head.x + 1;
                    break;
                case EDirection.TOP:
                    newBlock.y = head.y + 1;
                    newBlock.x = head.x;
                    break;
                case EDirection.BOTTOM:
                    newBlock.y = head.y - 1;
                    newBlock.x = head.x;
            }

            this.blocks.push(newBlock);
        } else {
            const {x: lastBlockX, y: lastBlockY} = this.blocks.at(-1)!;

            const {x: preLastBlockX, y: preLastBlockY} = this.blocks.at(-2)!;

            const newBlock: IObjectSnakeBlock = {x: 0, y: 0, blockType: 'body', id: crypto.randomUUID()};

            // Горизонально
            if (lastBlockY === preLastBlockY) {
                newBlock.y = lastBlockY;

                if (lastBlockX > preLastBlockX) {
                    //[x+1, y]
                    newBlock.x = lastBlockX + 1;
                }
                //[x-1, y]
                newBlock.x = lastBlockX - 1;

                this.blocks.push(newBlock);
            }

            // Вертикально
            if (lastBlockX === preLastBlockX) {
                newBlock.x = lastBlockX;

                if (lastBlockY > preLastBlockY) {
                    //[x, y + 1]
                    newBlock.y = lastBlockY + 1;
                }
                //[x, y - 1]
                newBlock.y = lastBlockY - 1;

                this.blocks.push(newBlock);
            }
        }

        return this.blocks;
    }
}

