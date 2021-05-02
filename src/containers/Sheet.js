import styled from 'styled-components';
import { ROWS_CONTROL_WIDTH } from '../configs';
import useSheetData from '../hooks/useSheetData';
import Row from './Row';

const SheetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  border: solid 1px #555;
  margin-left: ${ROWS_CONTROL_WIDTH};
  margin-top: ${ROWS_CONTROL_WIDTH};
`;

const Sheet = () => {
  const { data, rows } = useSheetData();

  return (
    <SheetWrapper>
      {data.map((rowData, i) => (
        <Row row={i} count={rows} key={i + 'r'} data={rowData} />
      ))}
    </SheetWrapper>
  );
};

export default Sheet;
