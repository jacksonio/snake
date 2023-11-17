import React, {FC, Fragment, useEffect, useState} from 'react';

import {Field as FieldObject, Food, Snake} from '../../objects';
import {FrogSvg, SnakeHeadSVG} from '../../assets';

import {SCell, SFieldContainer, SFieldRow, SFieldWrapper, SFoodCell, SSnakeCell} from './styled.ts';

function getCellByType(cellType: number) {
    switch (cellType) {
        case FieldObject.symbol:
            return <SCell/>;
        case Snake.symbol:
            return (
                <SCell>
                    <SSnakeCell>
                        <SnakeHeadSVG/>
                    </SSnakeCell>
                </SCell>
            )
        case Food.symbol:
            return (
                <SCell>
                    <SFoodCell>
                        <FrogSvg/>
                    </SFoodCell>
                </SCell>
            )
    }
}

enum EControlKeys {
    W = 'w',
    A = 'a',
    S = 's',
    D = 'd',
}

const field = new FieldObject(10, 10);

const FieldComponent: FC = () => {
    const [fieldCells, setFieldCells] = useState(field.generate());

    useEffect(() => {
        setInterval(() => {
            const updatedFieldCells = field.update();

            setFieldCells(updatedFieldCells);
        }, 1000);
        // document.addEventListener('keydown', (e: KeyboardEvent) => {
        //     if (![EControlKeys.W, EControlKeys.A, EControlKeys.S, EControlKeys.D].includes(e.key as EControlKeys)) return;
        // })
    }, []);

    return (
        <SFieldWrapper>
            <SFieldContainer>
                {fieldCells.map((row, i) => {
                    return (
                        <SFieldRow key={i}>
                            {row.map((cell) => <Fragment>{getCellByType(cell)}</Fragment>
                            )}
                        </SFieldRow>
                    )
                })}
            </SFieldContainer>
        </SFieldWrapper>
    );
};

export const Field = FieldComponent;
