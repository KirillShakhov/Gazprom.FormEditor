import React from 'react';
import JSONInput from 'react-json-editor-ajrm';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/ru';
import './text-mode.css';
import { IForm } from '../../../interfaces/form-config';

interface TextModeProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextMode: React.FC<TextModeProps> = (props) => {
  const { value, onChange } = props;

  const handleChange = function (event: any) {
    try {
      JSON.parse(event.json);
      onChange(event.json);
      console.log('event: ' + event.json);
    } catch (e) {}
  };
  return (
    <div className="json-editor">
      <JSONInput
        placeholder={JSON.parse(value)}
        locale={locale}
        confirmGood={true}
        theme="light_mitsuketa_tribute"
        colors={{
          default: 'black',
          background: 'white',
          string: 'red',
        }}
        height="750px"
        style={{
          container: {
            width: '100%',
          },
          outerBox: {
            width: '100%',
          },
          contentBox: {
            color: 'black',
            width: '100%',
          },
          warningBox: {
            width: '100%',
          },
        }}
        onChange={handleChange}
      />
    </div>
    // <ReactJson
    //   src={JSON.parse(obj.value) || {}}
    //   collapsed={false}
    //   displayDataTypes={false}
    //   displayObjectSize={false}
    //   enableClipboard={false}
    //   name="config"
    // />
  );
  // <textarea spellCheck={false} value={obj.value} onChange={handleChange} className="json-editor" />;
};
