import {Food} from './Food.ts';
import {Snake} from './Snake.ts';

export class Field {
    static readonly symbol: number = 0;

    private snake: Snake;
    private food: Food;
    private field: number[][] = [[]];

    public isCollapse: boolean = false;

    constructor(
        private readonly width: number,
        private readonly height: number
    ) {
        this.snake = new Snake(width, height);
        this.food = new Food(width, height);
        this.generate();
    }

    private generateSnake() {
        const [snakeX, snakeY] = this.snake.generate();

        this.field[snakeY][snakeX] = Snake.symbol;
    }

    private generateFood() {
        const [foodX, foodY] = this.food.generate();

        if (this.field[foodY][foodX] === Field.symbol) {
            this.field[foodY][foodX] = Food.symbol;
            return;
        }

        this.generateFood();
    }

    private clearField() {
        this.snake.getBlocks().map(([snakeBlockX, snakeBlockY]) => {
            this.field[snakeBlockX][snakeBlockY] = Field.symbol;
        });

        const [foodLocationX, foodLocationY] = this.food.getLocation();
        this.field[foodLocationX][foodLocationY] = Field.symbol;
    }

    private updateSnakeOnField() {
        this.snake.getBlocks().map(([snakeBlockX, snakeBlockY]) => {
            this.field[snakeBlockX][snakeBlockY] = Snake.symbol;
        });
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
            const [foodLocationX, foodLocationY] = this.food.getLocation();
            this.field[foodLocationX][foodLocationY] = Food.symbol;
        }

        this.updateSnakeOnField();

        return this.field;
    }

    public checkCollapse(): boolean {
        let isCollapse = false;

        this.snake.getBlocks().reduce((resHash, [snakeBlockX, snakeBlockY]) => {

            const coordsKey = `${snakeBlockX}${snakeBlockY}`;

            if (resHash[coordsKey]) isCollapse = true;
            else resHash[coordsKey] = true;

            return resHash;
        }, {} as Record<string, boolean>);

        return isCollapse;
    }
}
