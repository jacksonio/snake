import {EControlKeys} from './types.ts';
import {EDirection} from '../../objects/types.ts';

export const hashMap = {
    [EControlKeys.W]: EDirection.TOP,
    [EControlKeys.A]: EDirection.LEFT,
    [EControlKeys.D]: EDirection.RIGHT,
    [EControlKeys.S]: EDirection.BOTTOM,
};

export const allowedKeys = [EControlKeys.W, EControlKeys.A, EControlKeys.S, EControlKeys.D];
