import React from 'react';
import styled from 'styled-components';
import useSheetData from '../hooks/useSheetData';

const ControlsWrapper = styled.div`
  position: fixed;
  bottom: 4px;
  right: 4px;
  background: #f8f9fa;
  padding: 4px;
`;

const ControlButton = styled.button`
  margin: 0 4px;
  padding: 4px;
  background: white;
  border: none;
  color: #666666;
  font-size: 1em;
  transition: background 0.2s linear;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background: #eee;
  }
`;

const Controls = () => {
  const { addRow, addColumn } = useSheetData();

  return (
    <ControlsWrapper>
      <ControlButton onClick={addRow}>add row</ControlButton>
      <ControlButton onClick={addColumn}>add column</ControlButton>
    </ControlsWrapper>
  );
};

export default Controls;
