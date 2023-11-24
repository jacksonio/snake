import React, {FC, Fragment, useEffect, useState} from 'react';

import {Field as FieldObject} from '../../objects';
import {MODES} from '../App/consts.ts';
import {allowedKeyCodes, hashMap} from './consts.ts';
import {getCellByType} from './helpers.tsx';

import type {TMode} from '../App/types.ts';
import type {TCodes} from './types.ts';

import {SFieldContainer, SFieldRow, SFieldWrapper} from './styled.ts';

const field = new FieldObject(10, 10);

interface IFieldProps {
    onSnakeCollapse: () => void;
    mode: TMode;
}

const FieldComponent: FC<IFieldProps> = ({onSnakeCollapse, mode}) => {
    const [fieldCells, setFieldCells] = useState(() => field.generate());

    useEffect(() => {
        const intervalId = setInterval(() => {
            const updatedFieldCells = field.update();

            if (field.checkCollapse()) onSnakeCollapse();

            setFieldCells(updatedFieldCells);
        }, MODES[mode]);

        const setDirectionHandler = (e: KeyboardEvent) => {
            if (!allowedKeyCodes.includes(e.code as TCodes)) return;

            field.setSnakeDirection(hashMap[e.code as TCodes]);
        };

        document.addEventListener('keydown', setDirectionHandler);

        return () => {
            field.setSnakeDirection('Right');

            clearInterval(intervalId);

            document.removeEventListener('keydown', setDirectionHandler);
        }
    }, [mode, onSnakeCollapse]);

    return (
        <SFieldWrapper>
            <SFieldContainer>
                {fieldCells.map((row, i) => (
                    <SFieldRow key={i}>
                        {row.map((cell) => (
                            <Fragment key={cell.id}>{getCellByType(cell)}</Fragment>
                        ))}
                    </SFieldRow>
                ))}
            </SFieldContainer>
        </SFieldWrapper>
    );
};

export const Field = FieldComponent;
