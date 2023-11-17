import {Food} from './Food.ts';
import {Snake} from './Snake.ts';

export class Field {
    static readonly symbol: number = 0;

    private snake: Snake;
    private food: Food;
    private field: number[][] = [[]];

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
        const [snakeX, snakeY] = this.snake.generate();

        const clone = this.clone();
        clone[snakeY][snakeX] = Snake.symbol

        this.field = clone;
    }

    private generateFood() {
        const [foodX, foodY] = this.food.generate();

        if (this.field[foodY][foodX] === Field.symbol) {
            const clone = this.clone();
            clone[foodY][foodX] = Food.symbol;
            this.field = clone;

            return;
        }

        this.generateFood();
    }

    private clearField() {
        const clone = this.clone();

        this.snake.getBlocks().map(([snakeBlockX, snakeBlockY]) => {
            clone[snakeBlockY][snakeBlockX] = Field.symbol;
        });

        const [foodLocationX, foodLocationY] = this.food.getLocation();
        clone[foodLocationY][foodLocationX] = Field.symbol;

        this.field = clone;
    }

    private updateSnakeOnField() {
        const clone = this.clone();

        this.snake.getBlocks().map(([snakeBlockX, snakeBlockY]) => {
            clone[snakeBlockY][snakeBlockX] = Snake.symbol;
        });

        this.field = clone;
    }

    public generate(): number[][] {
        const widthArr = Array.from({length: this.width}).fill(Field.symbol);

        this.field = Array.from({length: this.height}).map(() => [...widthArr]) as number[][];

        this.generateSnake();
        this.generateFood();

        return this.field;
    }

    public update(): number[][] {
        this.clearField();

        const snakeBlocks = this.snake.move();

        const [snakeHeadBlockX, snakeHeadBlockY] = snakeBlocks[0];

        const [foodLocationX, foodLocationY] = this.food.getLocation();

        if (snakeHeadBlockX === foodLocationX && snakeHeadBlockY === foodLocationY) {
            this.snake.grove();
            this.generateFood();
        } else {
            const clone = this.clone();

            const [foodLocationX, foodLocationY] = this.food.getLocation();
            clone[foodLocationY][foodLocationX] = Food.symbol;

            this.field = clone;
        }

        this.updateSnakeOnField();

        return this.field;
    }

    public checkCollapse(): boolean {
        let isCollapse = false;

        this.snake.getBlocks().reduce((resHash, [snakeBlockX, snakeBlockY]) => {

            const coordsKey = `${snakeBlockY}${snakeBlockX}`;

            if (resHash[coordsKey]) isCollapse = true;
            else resHash[coordsKey] = true;

            return resHash;
        }, {} as Record<string, boolean>);

        return isCollapse;
    }
}
