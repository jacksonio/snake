import {Food} from './Food.ts';
import {Snake} from './Snake.ts';

import {EObjectType, type TDirection, type TObjectFieldBlock} from './types.ts';

export class Field {
    private snake: Snake;
    private snakeDirection: TDirection;
    private food: Food;
    private field: TObjectFieldBlock[][] = [[]];
    private readonly width: number;
    private readonly height: number;

    constructor(width: number, height: number) {
        this.snake = new Snake(width, height);
        this.snakeDirection = this.snake.getDirection();

        this.food = new Food(width, height);

        this.width = width;
        this.height = height;

        this.generate();
    }

    private clone() {
        return JSON.parse(JSON.stringify(this.field));
    }

    private generateSnake(field: TObjectFieldBlock[][]) {
        const snakeHead = this.snake.generate();
        const {x: snakeX, y: snakeY, id, blockType} = snakeHead;

        field[snakeY][snakeX] = {id, blockType, objectType: EObjectType.SNAKE} as TObjectFieldBlock;
    }

    private generateFood(field: TObjectFieldBlock[][]) {
        const food = this.food.generate();
        const {x: foodX, y: foodY, id} = food;

        if ((field[foodY][foodX] as TObjectFieldBlock).objectType === EObjectType.FIELD) {
            field[foodY][foodX] = {id, objectType: EObjectType.FOOD};
            return;
        }

        this.generateFood(field);
    }

    private clearField(field: TObjectFieldBlock[][]) {
        this.snake.getBlocks().map(({x, y}) => {
            field[y][x] = {objectType: EObjectType.FIELD, id: crypto.randomUUID()};
        });

        const {x: foodLocationX, y: foodLocationY} = this.food.getLocation();
        field[foodLocationY][foodLocationX] = {objectType: EObjectType.FIELD, id: crypto.randomUUID()};
    }

    private updateSnakeOnField(field: TObjectFieldBlock[][]) {
        this.snake.getBlocks().map(({x, y, blockType, id}) => {
            field[y][x] = {blockType, objectType: EObjectType.SNAKE, id};
        });
    }

    public generate(): TObjectFieldBlock[][] {
        const widthArr: TObjectFieldBlock[] = Array
            .from<TObjectFieldBlock>({length: this.width})
            .map(() => ({
                objectType: EObjectType.FIELD,
                id: crypto.randomUUID()
            }));

        const field = Array
            .from({length: this.height})
            .map(() => [...widthArr]);

        this.generateSnake(field);
        this.generateFood(field);

        this.field = field;

        return this.field;
    }

    public setSnakeDirection(direction: TDirection) {
        this.snakeDirection = direction;
    }

    public update(): TObjectFieldBlock[][] {
        const field = this.clone();

        this.clearField(field);

        this.snake.setDirection(this.snakeDirection);

        const snakeBlocks = this.snake.move();

        const {x: snakeHeadBlockX, y: snakeHeadBlockY} = snakeBlocks[0];

        const {x: foodLocationX, y: foodLocationY, id} = this.food.getLocation();

        if (snakeHeadBlockX === foodLocationX && snakeHeadBlockY === foodLocationY) {
            this.snake.grove();

            this.updateSnakeOnField(field);
            this.generateFood(field);
        } else {
            field[foodLocationY][foodLocationX] = {id, objectType: EObjectType.FOOD};
            this.updateSnakeOnField(field);
        }

        this.field = field;

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
