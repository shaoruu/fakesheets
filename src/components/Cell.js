import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  CELL_HEIGHT,
  CELL_WIDTH,
  CELL_WIDTH_INDICATOR,
  FOCUSED_BACKGROUND,
  INDICATOR_BACKGROUND,
  INDICATOR_BORDER,
  INDICATOR_COLOR,
  ORDINARY_BACKGROUND,
  ORDINARY_BORDER,
  ORDINARY_COLOR,
} from '../configs';
import useSheetData, { numberToAlphabet } from '../hooks/useSheetData';
import InvisibleInput from './InvisibleInput';

const CellWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => (p.isColIndicator ? CELL_WIDTH_INDICATOR : CELL_WIDTH)};
  height: ${CELL_HEIGHT};
  font-size: 0.8rem;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  outline: none;

  border-bottom: ${(p) => (p.isCorner ? '3px solid #aaa' : '')};
  border-right: ${(p) => (p.isCorner ? '3px solid #aaa' : '')};
  border-top: solid 1px
    ${(p) => (p.isIndicator ? INDICATOR_BORDER : ORDINARY_BORDER)};
  border-left: solid 1px
    ${(p) => (p.isIndicator ? INDICATOR_BORDER : ORDINARY_BORDER)};
  background: ${(p) =>
    p.isFocused
      ? FOCUSED_BACKGROUND
      : p.isIndicator
      ? INDICATOR_BACKGROUND
      : ORDINARY_BACKGROUND};
  color: ${(p) => (p.isIndicator ? INDICATOR_COLOR : ORDINARY_COLOR)};
`;

const Cell = ({ data, row, col }) => {
  const wrapperRef = useRef(null);
  const { focused, setFocus, setCell } = useSheetData();
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [r, c] = focused;

  const isRowIndicator = row === 0;
  const isColIndicator = col === 0;
  const isIndicator = isRowIndicator || isColIndicator;
  const isCorner = isRowIndicator && isColIndicator;
  const isFocused = r === row && c === col;

  const content = isCorner
    ? ''
    : isIndicator
    ? isRowIndicator
      ? numberToAlphabet(col - 1)
      : row
    : data;

  const saveInput = () => {
    setCell(row, col, inputValue);
    setInputValue('');
    setIsInput(false);
  };

  const startEditing = (value) => {
    setIsInput(true);
    setInputValue(value);
  };

  useEffect(() => {
    if (wrapperRef.current && isFocused) {
      wrapperRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <CellWrapper
      ref={wrapperRef}
      tabIndex={isFocused ? '-1' : '0'} // for key press events
      onMouseDown={() => {
        if (!isIndicator) setFocus(row, col);
      }}
      onDoubleClick={() => {
        if (!isIndicator) {
          console.log(row, col);
          setFocus(row, col);
          startEditing(data);
        }
      }}
      onKeyDown={(e) => {
        if (isInput) {
          if (e.key === 'Enter') {
            saveInput();
            setFocus(row + 1, col);
          }
        } else {
          switch (e.key) {
            case 'ArrowUp':
              setFocus(row - 1, col);
              break;
            case 'ArrowDown':
              setFocus(row + 1, col);
              break;
            case 'ArrowLeft':
              setFocus(row, col - 1);
              break;
            case 'ArrowRight':
              setFocus(row, col + 1);
              break;
            case 'Enter':
              startEditing(data);
              break;
            default:
              startEditing('');
              break;
          }
        }
      }}
      isCorner={isCorner}
      isColIndicator={isColIndicator}
      isIndicator={isIndicator}
      isFocused={isFocused}
    >
      {isInput ? (
        <InvisibleInput
          autoFocus={true}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={saveInput}
          style={{ padding: 2 }}
        />
      ) : (
        content
      )}
    </CellWrapper>
  );
};

export default Cell;
