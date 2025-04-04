import React from 'react';

type Props = {
  onSave: () => void;
  onLoad: () => void;
  onClear: () => void;
};

const Controls = ({ onSave, onLoad, onClear }: Props) => {
  return (
    <div className="flex justify-center gap-4 mb-4">
      <button
        onClick={onSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Kaydet
      </button>
      <button
        onClick={onLoad}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Yükle
      </button>
      <button
        onClick={onClear}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Temizle
      </button>
    </div>
  );
};

export default Controls;
