import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, Transformer } from 'react-konva';
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
  fill?: string;
}

const CanvasBoard = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const transformerRef = useRef<any>(null);
  const shapeRefs = useRef<{ [key: string]: any }>({});

  const addRectangle = () => {
    const newRect: Shape = {
      id: uuidv4(),
      type: 'rect',
      x: 100,
      y: 100,
      width: 100,
      height: 60,
      fill: '#60A5FA',
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
      fill: '#FACC15',
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

  const handleTransformEnd = (e: any, id: string) => {
    const node = e.target;
    const updated = shapes.map((shape) => {
      if (shape.id === id) {
        if (shape.type === 'rect') {
          return {
            ...shape,
            x: node.x(),
            y: node.y(),
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY(),
          };
        } else if (shape.type === 'circle') {
          return {
            ...shape,
            x: node.x(),
            y: node.y(),
            radius: (node.width() * node.scaleX()) / 2,
          };
        }
      }
      return shape;
    });
    setShapes(updated);
  };

  useEffect(() => {
    if (selectedId && transformerRef.current && shapeRefs.current[selectedId]) {
      transformerRef.current.nodes([shapeRefs.current[selectedId]]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId, shapes]);

  const handleSave = () => {
    console.log('Kaydedilen JSON:', JSON.stringify(shapes));
  };

  const handleLoad = () => {
    const fake = `[{"id":"1","type":"rect","x":50,"y":50,"width":100,"height":60,"fill":"#60A5FA"},{"id":"2","type":"circle","x":200,"y":200,"radius":40,"fill":"#FACC15"}]`;
    setShapes(JSON.parse(fake));
  };

  const handleClear = () => {
    setShapes([]);
    setSelectedId(null);
  };

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
        <Stage
          width={900}
          height={600}
          className="bg-white border shadow rounded"
          onMouseDown={(e) => {
            if (e.target === e.target.getStage()) {
              setSelectedId(null);
            }
          }}
        >
          <Layer>
            {shapes.map((shape) => {
              const commonProps = {
                key: shape.id,
                x: shape.x,
                y: shape.y,
                draggable: true,
                onClick: () => setSelectedId(shape.id),
                onTap: () => setSelectedId(shape.id),
                ref: (node: any) => {
                  shapeRefs.current[shape.id] = node;
                },
                onDragEnd: (e: any) => handleDrag(e, shape.id),
                onTransformEnd: (e: any) => handleTransformEnd(e, shape.id),
              };

              if (shape.type === 'rect') {
                return (
                  <Rect
                    {...commonProps}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.fill}
                  />
                );
              } else if (shape.type === 'circle') {
                return (
                  <Circle
                    {...commonProps}
                    radius={shape.radius}
                    fill={shape.fill}
                  />
                );
              }
              return null;
            })}

            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                // Limit resize too small
                if (newBox.width < 20 || newBox.height < 20) return oldBox;
                return newBox;
              }}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CanvasBoard;
