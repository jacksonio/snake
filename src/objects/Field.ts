import {Food} from './Food.ts';
import {Snake} from './Snake.ts';
import {EDirection, EObjectType, TObjectFieldBlock} from './types.ts';

export class Field {
    private snake: Snake;
    private food: Food;
    private field: TObjectFieldBlock[][] = [[]];

    constructor(
        private readonly width: number,
        private readonly height: number
    ) {
        this.snake = new Snake(width, height);
        this.food = new Food(width, height);
        this.generate();
    }

    private clone() {
        return structuredClone(this.field);
    }

    private generateSnake() {
        const snakeHead = this.snake.generate();
        const {x: snakeX, y: snakeY, id, blockType} = snakeHead;

        const clone = this.clone();
        clone[snakeY][snakeX] = {id, blockType, objectType: EObjectType.SNAKE} as TObjectFieldBlock;

        this.field = clone;
    }

    private generateFood() {
        const food = this.food.generate();
        const {x: foodX, y: foodY, id} = food;

        if ((this.field[foodY][foodX] as TObjectFieldBlock).objectType === EObjectType.FIELD) {
            const clone = this.clone();
            clone[foodY][foodX] = {id, objectType: EObjectType.FOOD};
            this.field = clone;

            return;
        }

        this.generateFood();
    }

    private clearField() {
        const clone = this.clone();

        this.snake.getBlocks().map(({x: snakeBlockX, y: snakeBlockY}) => {
            clone[snakeBlockY][snakeBlockX] = {objectType: EObjectType.FIELD, id: crypto.randomUUID()};
        });

        const {x: foodLocationX, y: foodLocationY} = this.food.getLocation();
        clone[foodLocationY][foodLocationX] = {objectType: EObjectType.FIELD, id: crypto.randomUUID()};

        this.field = clone;
    }

    private updateSnakeOnField() {
        const clone = this.clone();

        this.snake.getBlocks().map(({x, y, blockType, id}) => {
            clone[y][x] = {blockType, objectType: EObjectType.SNAKE, id};
        });

        this.field = clone;
    }

    public generate(): TObjectFieldBlock[][] {
        const widthArr: TObjectFieldBlock[] = Array.from<TObjectFieldBlock>({length: this.width}).map(() => ({
            objectType: EObjectType.FIELD,
            id: crypto.randomUUID()
        }));

        this.field = Array.from({length: this.height}).map(() => [...widthArr]);

        this.generateSnake();
        this.generateFood();

        return this.field;
    }

    public setSnakeDirection(direction: EDirection) {
        this.snake.setDirection(direction);
    }

    public update(): TObjectFieldBlock[][] {
        this.clearField();

        const snakeBlocks = this.snake.move();

        const {x: snakeHeadBlockX, y: snakeHeadBlockY} = snakeBlocks[0];

        const {x: foodLocationX, y: foodLocationY, id} = this.food.getLocation();

        if (snakeHeadBlockX === foodLocationX && snakeHeadBlockY === foodLocationY) {
            this.snake.grove();
            this.updateSnakeOnField();
            this.generateFood();
        } else {
            const clone = this.clone();

            clone[foodLocationY][foodLocationX] = {id, objectType: EObjectType.FOOD};

            this.field = clone;

            this.updateSnakeOnField();
        }

        return this.field;
    }

    public checkCollapse(): boolean {
        let isCollapse = false;

        this.snake.getBlocks().reduce((resHash, {x: snakeBlockX, y: snakeBlockY}) => {

            const coordsKey = `${snakeBlockY}${snakeBlockX}`;

            if (resHash[coordsKey]) isCollapse = true;
            else resHash[coordsKey] = true;

            return resHash;
        }, {} as Record<string, boolean>);

        return isCollapse;
    }
}
