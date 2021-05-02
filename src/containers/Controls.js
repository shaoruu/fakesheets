import React from 'react';
import styled from 'styled-components';
import {
  CELL_HEIGHT,
  CELL_WIDTH_INDICATOR,
  ROWS_CONTROL_WIDTH,
} from '../configs';
import useSheetData from '../hooks/useSheetData';

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
`;

const RowsControlsWrapper = styled(ControlsWrapper)`
  flex-direction: column;
  margin-top: calc(${ROWS_CONTROL_WIDTH} + ${CELL_HEIGHT});
  width: ${ROWS_CONTROL_WIDTH};

  & button {
    width: 100%;
    height: 40px;
    border: 2px solid #bbb;
    border-left-width: 1px;
    border-right-width: 1px;
  }
`;

const ColumnsControlsWrapper = styled(ControlsWrapper)`
  margin-left: calc(${ROWS_CONTROL_WIDTH} + ${CELL_WIDTH_INDICATOR});
  height: ${ROWS_CONTROL_WIDTH};

  & button {
    height: 100%;
    width: 40px;
    border: 2px solid #bbb;
    border-top-width: 1px;
    border-bottom-width: 1px;
  }
`;

const ControlButton = styled.button`
  background: white;
  border: none;
  color: #666666;
  font-size: 1em;
  transition: background 0.2s linear;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

const Controls = () => {
  const { addRow, removeRow, addColumn, removeColumn } = useSheetData();

  return (
    <>
      <RowsControlsWrapper>
        <ControlButton onClick={addRow}>+</ControlButton>
        <ControlButton onClick={removeRow}>-</ControlButton>
      </RowsControlsWrapper>
      <ColumnsControlsWrapper>
        <ControlButton onClick={addColumn}>+</ControlButton>
        <ControlButton onClick={removeColumn}>-</ControlButton>
      </ColumnsControlsWrapper>
    </>
  );
};

export default Controls;
