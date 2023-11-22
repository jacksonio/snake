import React, {FC} from 'react';


interface IProps {
    onNewGame: () => void;
}

const GameOverScreenComponent: FC<IProps> = ({onNewGame}) => {

    const handleNewGame = () => {
        onNewGame();
    };

    return (
        <div>
            Game Over
            <button onClick={handleNewGame}>New game</button>
        </div>
    );
};

GameOverScreenComponent.displayName = 'GameOverScreen';

export const GameOverScreen = GameOverScreenComponent;
