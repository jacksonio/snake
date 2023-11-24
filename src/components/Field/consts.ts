import type {TCodes} from './types.ts';
import type {TDirection} from '../../objects/types.ts';

export const hashMap: Record<TCodes, TDirection> = {
    KeyW: 'Top',
    KeyA: 'Left',
    KeyD: 'Right',
    KeyS: 'Bottom',
};

export const allowedKeyCodes: TCodes[] = ['KeyW', 'KeyA', 'KeyS', 'KeyD'];
