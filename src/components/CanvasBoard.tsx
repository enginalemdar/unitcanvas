import { useState } from 'react';
import { Stage, Layer, Rect, Circle, Arrow, Transformer } from 'react-konva';
import Controls from './Controls';
import { v4 as uuidv4 } from 'uuid';

type ShapeType = 'rect' | 'circle';

interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
}

const CanvasBoard = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  const addRectangle = () => {
    const newRect: Shape = {
      id: uuidv4(),
      type: 'rect',
      x: 100,
      y: 100,
      width: 100,
      height: 60,
    };
    setShapes([...shapes, newRect]);
  };

  const addCircle = () => {
    const newCircle: Shape = {
      id: uuidv4(),
      type: 'circle',
      x: 200,
      y: 200,
      radius: 40,
    };
    setShapes([...shapes, newCircle]);
  };

  const handleDrag = (e: any, id: string) => {
    const updated = shapes.map((shape) =>
      shape.id === id
        ? { ...shape, x: e.target.x(), y: e.target.y() }
        : shape
    );
    setShapes(updated);
  };

  const handleSave = () => {
    const json = JSON.stringify(shapes);
    console.log('Kaydedilen JSON:', json);
    // fetch('https://your-bubble-endpoint.com/api/1.1/wf/save_canvas', { ... })
  };

  const handleLoad = () => {
    const fake = `[{
      "id":"1", "type":"rect", "x":50, "y":50, "width":100, "height":60
    },{
      "id":"2", "type":"circle", "x":200, "y":200, "radius":40
    }]`;
    setShapes(JSON.parse(fake));
  };

  const handleClear = () => setShapes([]);

  return (
    <div>
      <Controls onSave={handleSave} onLoad={handleLoad} onClear={handleClear} />

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={addRectangle}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Kutu Ekle
        </button>
        <button
          onClick={addCircle}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Elips Ekle
        </button>
      </div>

      <div className="flex justify-center items-center">
        <Stage width={900} height={600} className="bg-white border shadow rounded">
          <Layer>
            {shapes.map((shape) => {
              if (shape.type === 'rect') {
                return (
                  <Rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill="#60A5FA"
                    draggable
                    onDragEnd={(e) => handleDrag(e, shape.id)}
                  />
                );
              } else if (shape.type === 'circle') {
                return (
                  <Circle
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius}
                    fill="#FACC15"
                    draggable
                    onDragEnd={(e) => handleDrag(e, shape.id)}
                  />
                );
              }
              return null;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CanvasBoard;
