import React from 'react';
import { Plus, X } from 'lucide-react';

interface ListEditorProps {
  items: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
  placeholder?: string;
  inputType?: 'input' | 'textarea';
  rows?: number;
}

function ListEditor({
  items,
  onAdd,
  onRemove,
  onChange,
  placeholder = '',
  inputType = 'input',
  rows = 2
}: ListEditorProps) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          {inputType === 'textarea' ? (
            <textarea
              value={item}
              onChange={(e) => onChange(index, e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={placeholder}
              rows={rows}
            />
          ) : (
            <input
              type="text"
              value={item}
              onChange={(e) => onChange(index, e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={placeholder}
            />
          )}
          <button
            onClick={() => onRemove(index)}
            className="p-2 text-gray-400 hover:text-red-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Item
      </button>
    </div>
  );
}

export default ListEditor;