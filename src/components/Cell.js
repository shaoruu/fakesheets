import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSheetData, { numberToAlphabet } from '../hooks/useSheetData';
import InvisibleInput from './InvisibleInput';

const ORDINARY_BACKGROUND = '#FFFFFF';
const INDICATOR_BACKGROUND = '#F8F9FA';
const FOCUSED_BACKGROUND = '#77acf155';

const ORDINARY_BORDER = '#bbbbbb';
const INDICATOR_BORDER = '#999999';

const ORDINARY_COLOR = '#222222';
const INDICATOR_COLOR = '#666666';

const CellWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 1.6rem;
  font-size: 0.8rem;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;

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

  useEffect(() => {
    if (isInput) {
      setInputValue(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInput]);

  return (
    <CellWrapper
      tabIndex="1" // for key press events
      onMouseDown={() => {
        if (!isIndicator) setFocus(row, col);
      }}
      onDoubleClick={() => {
        if (!isIndicator) setIsInput(true);
      }}
      onKeyDown={(e) => {
        if (isInput) {
          if (e.key === 'Enter') saveInput();
        } else setIsInput(true);
      }}
      isCorner={isCorner}
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
