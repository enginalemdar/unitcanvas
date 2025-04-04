import { useDrag } from 'react-dnd';

type Props = {
  type: string;
  icon: React.ReactNode;
};

const DragItem = ({ type, icon }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`w-12 h-12 flex items-center justify-center rounded-lg border shadow cursor-move ${
        isDragging ? 'opacity-30' : 'bg-white'
      }`}
    >
      {icon}
    </div>
  );
};

export default DragItem;
