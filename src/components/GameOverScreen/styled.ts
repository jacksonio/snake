import styled from 'styled-components';

const WIDTH = '300px';
const HEIGHT = '30px';
const BORDER_RADIUS = '12px';
const BORDER = '1px solid #000';

export const SGameOverContainer = styled.div({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

export const SGameOverText = styled.p({
    fontSize: '32px',
    fontWeight: 500,
});

export const SNewGameButton = styled.button({
    width: WIDTH,
    height: HEIGHT,
    border: BORDER,
    background: 'transparent',
    borderRadius: BORDER_RADIUS,
});

export const SSelect = styled.select({
    width: WIDTH,
    height: HEIGHT,
    borderRadius: BORDER_RADIUS,
    border: BORDER,
    margin: '10px',
});


