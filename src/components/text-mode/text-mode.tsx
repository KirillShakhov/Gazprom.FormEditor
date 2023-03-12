import React from 'react';
import ReactJson from 'react-json-view';
import './text-mode.css';

interface TextModeProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextMode: React.FC<TextModeProps> = (obj) => {
  // const jsonConfiguration = useAppConfigurationModel(
  //   (state) => state.configuration
  // );
  /*const handleChange = function (event: any) {
    obj.onChange(event.target.value);
    console.log('data: ' + event.target.value);
  };*/
  return (
    <ReactJson
      src={JSON.parse(obj.value) || {}}
      collapsed={false}
      displayDataTypes={false}
      displayObjectSize={false}
      enableClipboard={false}
      name="config"
    />
  );
  // <textarea spellCheck={false} value={obj.value} onChange={handleChange} className="json-editor" />;
};
