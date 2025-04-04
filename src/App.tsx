import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import CanvasBoard from './components/CanvasBoard';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <CanvasBoard />
      </div>
    </DndProvider>
  );
};

export default App;
