import React, {FC, useState} from 'react';

import {GameOverScreen} from '../GameOverScreen';
import {Field} from '../Field';

const AppComponent: FC = () => {
    const [isGame, setGame] = useState(true);

    const gameOverHandler = () => {
        setGame((prevState) => !prevState);
    }

    return (
        <>
            {!isGame && <GameOverScreen onNewGame={gameOverHandler}/>}
            {isGame && <Field onSnakeCollapse={gameOverHandler}/>}
        </>
    );
};

AppComponent.displayName = 'App';

export const App = AppComponent;
