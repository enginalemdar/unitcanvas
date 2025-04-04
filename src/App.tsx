import CanvasBoard from './components/CanvasBoard';

function App() {
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        ✏️ UnitCanvas
      </h1>
      <CanvasBoard />
    </div>
  );
}

export default App;
