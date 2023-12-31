import React from 'react';

import {FrogSvg, SnakeBodySVG, SnakeHeadSVG} from '../../assets';

import {EObjectType, type TObjectFieldBlock} from '../../objects/types.ts';

import {SCell, SFoodCell, SSnakeCell} from './styled.ts';

function getSnakeCellByType(cell: Required<TObjectFieldBlock>) {
    if (cell.blockType === 'head') return <SnakeHeadSVG />;
    return <SnakeBodySVG/>;
}

export function getCellByType(cell: TObjectFieldBlock) {
    switch (cell.objectType) {
        case EObjectType.FIELD:
            return <SCell/>;
        case EObjectType.SNAKE:
            return (
                <SCell>
                    <SSnakeCell>
                        {getSnakeCellByType(cell as Required<TObjectFieldBlock>)}
                    </SSnakeCell>
                </SCell>
            )
        case EObjectType.FOOD:
            return (
                <SCell>
                    <SFoodCell>
                        <FrogSvg/>
                    </SFoodCell>
                </SCell>
            )
    }
}
