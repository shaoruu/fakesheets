import Controls from './Controls';
import Sheet from './Sheet';
import { SheetDataProvider } from '../hooks/useSheetData';

const App = () => {
  return (
    <SheetDataProvider>
      <Controls />
      <Sheet />
    </SheetDataProvider>
  );
};

export default App;
