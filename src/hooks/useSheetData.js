import { createContext, useContext, useState } from 'react';

export const DEFAULT_ROWS_COUNT = 100;
export const DEFAULT_COLUMNS_COUNT = 26;

export const SheetDataContext = createContext({
  data: [],
  rows: 0,
  columns: 0,

  // interaction
  highlighted: [],
  focused: '',

  // data mutation
  setCell: () => {},
  addRow: () => {},
  addColumn: () => {},
  addHighlight: () => {},
  removeHighlight: () => {},
  resetHighlight: () => {},
  setFocus: () => {},
  clearFocus: () => {},
});

// populate data with empty strings
// plus one for the heading rows/columns
const defaultData = [];
for (let i = 0; i < DEFAULT_ROWS_COUNT + 1; i++) {
  defaultData.push(new Array(DEFAULT_COLUMNS_COUNT + 1).fill(''));
}

// utility function
const clone = (data) => {
  return JSON.parse(JSON.stringify(data));
};

// A => 1, AA => 27
export const alphabetToNumber = (str) => {
  return (
    str
      .toLowerCase()
      .split('')
      .reduce((r, a) => r * 26 + parseInt(a, 36) - 9, 0) - 1
  );
};

export const numberToAlphabet = (number) => {
  const asciiA = 'a'.charCodeAt(0);
  const asciiZ = 'z'.charCodeAt(0);
  const range = asciiZ - asciiA + 1;

  let s = '';
  while (number >= 0) {
    s = String.fromCharCode((number % range) + asciiA) + s;
    number = Math.floor(number / range) - 1;
  }

  return s.toUpperCase();
};

export const getCellRep = (r, c) => {
  return `${r}_${numberToAlphabet(c)}`;
};

export const parseCellRep = (str) => {
  if (!str) return [-1, -1]; // no focused
  const splitted = str.split('_');
  return [parseInt(splitted[0], 10), alphabetToNumber(splitted[1])];
};

export const SheetDataProvider = (props) => {
  const [data, setData] = useState(defaultData);
  const [rows, setRows] = useState(DEFAULT_ROWS_COUNT + 1);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS_COUNT + 1);
  const [highlighted, setHighlighted] = useState([]);
  const [focused, setFocused] = useState('');

  const setCell = (r, c, str) => {
    // setting rows and columns as string
    const newData = clone(data);
    newData[r][c] = str;
    setData(newData);
  };

  const addRow = () => {
    const newData = clone(data);
    const [r] = parseCellRep(focused || highlighted[0] || 'AAAAA_100000');

    const [fr, fc] = parseCellRep(focused);
    if (fr >= r) setFocus(fr + 1, fc);

    newData.splice(r, 0, new Array(columns).fill(''));
    setData(newData);
    setRows(rows + 1);
  };

  const addColumn = () => {
    const newData = clone(data);
    const [, c] = parseCellRep(focused || highlighted[0] || 'AAAAA_100000');

    const [fr, fc] = parseCellRep(focused);
    if (fc >= c) setFocus(fr, fc + 1);

    newData.forEach((row) => row.splice(c, 0, ''));
    setData(newData);
    setColumns(columns + 1);
  };

  const addHighlight = (r, c) => {
    setHighlighted([...highlighted, getCellRep(r, c)]);
  };

  const removeHighlight = (r, c) => {
    setHighlighted(highlighted.filter((rep) => rep !== getCellRep(r, c)));
  };

  const setFocus = (r, c) => {
    setFocused(getCellRep(r, c));
  };

  const clearFocus = () => {
    setFocused('');
  };

  return (
    <SheetDataContext.Provider
      value={{
        data,
        rows,
        columns,
        highlighted,
        focused: parseCellRep(focused),
        setCell,
        addRow,
        addColumn,
        addHighlight,
        removeHighlight,
        setFocus,
        clearFocus,
      }}
      {...props}
    />
  );
};

const useSheetData = () => {
  return useContext(SheetDataContext);
};

export default useSheetData;
