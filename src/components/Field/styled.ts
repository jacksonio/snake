import styled from 'styled-components';

export const SFieldWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
});

export const SFieldContainer = styled.div({
    borderLeft: '1px solid #000000',
    borderTop: '1px solid #000000',
    background: 'greenyellow'
});

export const SFieldRow = styled.div({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
});

export const SCell = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    boxSizing: 'border-box',
    borderRight: '1px solid #000000',
    borderBottom: '1px solid #000000',
});

export const SSnakeCell = styled.div({
    width: '60%',
    height: '60%',
});

export const SFoodCell = styled.div({
    width: '60%',
    height: '60%',
});
