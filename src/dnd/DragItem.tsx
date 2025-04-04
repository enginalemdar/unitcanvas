import { useDrag } from 'react-dnd';

const DragItem = ({ type, icon }: { type: string; icon: React.ReactNode }) => {
  const [, drag] = useDrag(() => ({
    type,
    item: { type },
  }));

  return (
    <div
      ref={drag}
      className="w-10 h-10 bg-white border rounded flex justify-center items-center cursor-move"
    >
      {icon}
    </div>
  );
};

export default DragItem;
