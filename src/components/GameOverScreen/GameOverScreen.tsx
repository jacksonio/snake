import React, {ChangeEvent, FC} from 'react';

import type {TMode} from '../App/types.ts';

import {SGameOverContainer, SGameOverText, SNewGameButton, SSelect} from './styled.ts';

interface IProps {
    onNewGame: () => void;
    setMode: (mode: TMode) => void;
    mode: TMode;
}

const GameOverScreenComponent: FC<IProps> = ({onNewGame, setMode, mode}) => {
    const handleNewGame = () => {
        onNewGame();
    };

    const onChangeMode = (e: ChangeEvent<HTMLSelectElement>) => {
        setMode(e.target.value as TMode);
    }

    return (
        <SGameOverContainer>
            <SGameOverText>Game Over</SGameOverText>
            <SSelect value={mode} onChange={onChangeMode}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </SSelect>
            <SNewGameButton onClick={handleNewGame}>New game</SNewGameButton>
        </SGameOverContainer>
    );
};

GameOverScreenComponent.displayName = 'GameOverScreen';

export const GameOverScreen = GameOverScreenComponent;
