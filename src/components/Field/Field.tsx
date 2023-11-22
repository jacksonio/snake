import React, {FC, Fragment, useEffect, useState} from 'react';

import {Field as FieldObject} from '../../objects';

import {SFieldContainer, SFieldRow, SFieldWrapper} from './styled.ts';
import {EControlKeys} from './types.ts';
import {allowedKeys, hashMap} from './consts.ts';
import {getCellByType} from './helpers.tsx';

const field = new FieldObject(10, 10);

interface IFieldProps {
    onSnakeCollapse: () => void;
}

const FieldComponent: FC<IFieldProps> = ({onSnakeCollapse}) => {
    const [fieldCells, setFieldCells] = useState(() => field.generate());

    useEffect(() => {
        const intervalId = setInterval(() => {
            const updatedFieldCells = field.update();

            // field.checkCollapse();
            //
            // if (field.checkCollapse()) onSnakeCollapse();

            setFieldCells(updatedFieldCells);
        }, 2000);

        const setDirectionHandler = (e: KeyboardEvent) => {
            if (!allowedKeys.includes(e.key as EControlKeys)) return;

            field.setSnakeDirection(hashMap[e.key as keyof typeof hashMap]);
        };

        document.addEventListener('keydown', setDirectionHandler);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('keydown', setDirectionHandler);
        }
    }, [onSnakeCollapse]);

    return (
        <SFieldWrapper>
            <SFieldContainer>
                {fieldCells.map((row, i) => {
                    return (
                        <SFieldRow key={i}>
                            {row.map((cell) => <Fragment key={cell.id}>{getCellByType(cell)}</Fragment>
                            )}
                        </SFieldRow>
                    )
                })}
            </SFieldContainer>
        </SFieldWrapper>
    );
};

export const Field = FieldComponent;
