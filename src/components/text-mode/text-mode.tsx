import React from 'react';
import './text-mode.css';

interface TextModeProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextMode: React.FC<TextModeProps> = (obj) => {
  const handleChange = function (event: any) {
    obj.onChange(event.target.value);
    console.log('data: ' + event.target.value);
  };
  return <textarea spellCheck={false} value={obj.value} onChange={handleChange} className="json-editor" />;
};
