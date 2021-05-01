import styled from 'styled-components';
import Cell from '../components/Cell';

const RowWrapper = styled.div`
  display: flex;
`;

const Row = ({ row, data }) => {
  return (
    <RowWrapper>
      {data.map((cellData, i) => (
        <Cell key={`${row}_${i}`} data={cellData} row={row} col={i} />
      ))}
    </RowWrapper>
  );
};

export default Row;
