import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Transformer, Text } from 'react-konva';
import Sidebar from './Sidebar';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './dnd/types';
import { v4 as uuidv4 } from 'uuid';

type ShapeType = 'rect' | 'circle' | 'text';

interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  fill?: string;
  text?: string;
}

const CanvasBoard = () => {
  const stageRef = useRef<any>();
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const transformerRef = useRef<any>(null);
  const shapeRefs = useRef<{ [key: string]: any }>({});

  const [, drop] = useDrop(() => ({
    accept: Object.values(ItemTypes),
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      const stageBox = stageRef.current.container().getBoundingClientRect();

      const x = offset.x - stageBox.left;
      const y = offset.y - stageBox.top;

      let newShape: Shape;

      if (item.type === ItemTypes.RECT) {
        newShape = {
          id: uuidv4(),
          type: 'rect',
          x,
          y,
          width: 100,
          height: 60,
          fill: '#60A5FA',
        };
      } else if (item.type === ItemTypes.CIRCLE) {
        newShape = {
          id: uuidv4(),
          type: 'circle',
          x,
          y,
          radius: 40,
          fill: '#FACC15',
        };
      } else if (item.type === ItemTypes.TEXT) {
        newShape = {
          id: uuidv4(),
          type: 'text',
          x,
          y,
          text: 'Yeni Metin',
          fill: '#000000',
        };
      } else {
        return;
      }

      setShapes([...shapes, newShape]);
    },
  }));

  useEffect(() => {
    if (selectedId && transformerRef.current && shapeRefs.current[selectedId]) {
      transformerRef.current.nodes([shapeRefs.current[selectedId]]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId, shapes]);

  const handleTransformEnd = (e: any, id: string) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const updated = shapes.map((shape) => {
      if (shape.id === id) {
        if (shape.type === 'rect') {
          return {
            ...shape,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          };
        } else if (shape.type === 'circle') {
          return {
            ...shape,
            x: node.x(),
            y: node.y(),
            radius: (node.width() * scaleX) / 2,
          };
        } else if (shape.type === 'text') {
          return {
            ...shape,
            x: node.x(),
            y: node.y(),
          };
        }
      }
      return shape;
    });

    node.scaleX(1);
    node.scaleY(1);
    setShapes(updated);
  };

  const handleDrag = (e: any, id: string) => {
    const updated = shapes.map((shape) =>
      shape.id === id ? { ...shape, x: e.target.x(), y: e.target.y() } : shape
    );
    setShapes(updated);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div ref={drop} className="flex-1 flex justify-center items-center">
        <Stage
          width={1000}
          height={600}
          ref={stageRef}
          className="bg-white border shadow"
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
              } else if (shape.type === 'text') {
                return (
                  <Text
                    {...commonProps}
                    text={shape.text}
                    fontSize={20}
                    fill={shape.fill}
                  />
                );
              }

              return null;
            })}
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
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
