import { Stage, Layer, Rect } from 'react-konva';

const CanvasBoard = () => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <Stage width={600} height={400} className="border shadow">
        <Layer>
          <Rect
            x={100}
            y={100}
            width={150}
            height={100}
            fill="#60A5FA"
            draggable
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasBoard;
