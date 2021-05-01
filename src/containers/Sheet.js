import styled from 'styled-components';
import useSheetData from '../hooks/useSheetData';
import Row from './Row';

const SheetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  border-right: solid 1px black;
  border-bottom: solid 1px black;
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
