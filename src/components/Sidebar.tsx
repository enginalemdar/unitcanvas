import { ItemTypes } from '../dnd/types';
import DragItem from '../dnd/DragItem';
import { Square, Circle, Text, ArrowRight } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-20 bg-gray-100 p-2 flex flex-col gap-4 items-center shadow-md">
      <DragItem type={ItemTypes.RECT} icon={<Square size={24} />} />
      <DragItem type={ItemTypes.CIRCLE} icon={<Circle size={24} />} />
      <DragItem type={ItemTypes.TEXT} icon={<Text size={24} />} />
      <DragItem type={ItemTypes.ARROW} icon={<ArrowRight size={24} />} />
    </div>
  );
};

export default Sidebar;
