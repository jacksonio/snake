import React, {FC, useState} from 'react';

import {GameOverScreen} from '../GameOverScreen';
import {Field} from '../Field';

import type {TMode} from './types.ts';

const AppComponent: FC = () => {
    const [isGame, setGame] = useState(true);
    const [mode, setMode] = useState<TMode>('Easy');

    const gameOverHandler = () => {
        setGame((prevState) => !prevState);
    }

    const setModeHandler = (mode: TMode) => {
        setMode(mode);
    }

    return (
        <>
            {!isGame && <GameOverScreen mode={mode} setMode={setModeHandler} onNewGame={gameOverHandler}/>}
            {isGame && <Field mode={mode} onSnakeCollapse={gameOverHandler}/>}
        </>
    );
};

AppComponent.displayName = 'App';

export const App = AppComponent;
