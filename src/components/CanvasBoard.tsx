import { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Controls from './Controls';

const CanvasBoard = () => {
  const [lines, setLines] = useState<any[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  // 🔸 Save function: send lines to Bubble API
  const handleSave = () => {
    const json = JSON.stringify(lines);
    console.log('SAVE:', json);
    // fetch('https://your-bubble-endpoint.com/api/1.1/wf/save_canvas', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ canvas_data: json }),
    // });
  };

  // 🔸 Load function: fetch from Bubble API
  const handleLoad = () => {
    // Örnek: gerçek bir API'den veri çekilecek
    // fetch('https://your-bubble-endpoint.com/api/1.1/obj/canvas/abc123')
    //   .then(res => res.json())
    //   .then(data => {
    //     setLines(JSON.parse(data.response.canvas_data));
    //   });
    const fake = '[{"points":[10,10,100,100]}]';
    setLines(JSON.parse(fake));
  };

  const handleClear = () => setLines([]);

  return (
    <div>
      <Controls onSave={handleSave} onLoad={handleLoad} onClear={handleClear} />
      <div className="flex justify-center items-center">
        <Stage
          width={800}
          height={600}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          className="border border-gray-300 bg-white shadow-xl rounded"
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#111827"
                strokeWidth={2.5}
                tension={0.4}
                lineCap="round"
                globalCompositeOperation="source-over"
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CanvasBoard;
