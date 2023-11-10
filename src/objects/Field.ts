import {Food} from './Food.ts';
import {Snake} from './Snake.ts';

export class Field {
    private snake: Snake;
    private food: Food;

    private field: number[][];

    constructor(
        private readonly width: number,
        private readonly height: number
    ) {
        this.snake = new Snake(width, height);
        this.food = new Food(width, height);
        this.field = this.generate();
    }

    private generate() {
        const widthArr = Array.from({length: this.width}).fill(0);

        const field = Array.from({length: this.height}).map(() => widthArr) as number[][];

        const heightPivot = Math.ceil((this.height / 2) - 1);
        const lengthPivot = Math.ceil((this.width / 2) - 1);

        // field[heightPivot][lengthPivot] =

        return []
    }

    update(): number[][] {
        // 1) get a snake
        // 2) get it parts
        // 3) get a food location
        // 4) get the snake direction and based on move it parts to the way of moving
        // 5) compare the food location with snake parts and if one of them matches -> add a new part to the snake tail
        // 6) re-generate food location
        return [];
    }
}
