import React, { useState } from 'react';
import './text-mode.css';
import AceEditor from 'react-ace';
import { IForm } from '../../../interfaces/form-config';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';

interface TextModeProps {
  value: IForm;
  onChange: (value: string) => void;
}

export const TextMode: React.FC<TextModeProps> = (props) => {
  const { value, onChange } = props;

  const [text, setText] = useState(JSON.stringify(value, null, 2));
  function handleChange(text: string) {
    try {
      setText(text);
      onChange(text);
    } catch (error) {
      // pass, user is editing
    }
  }

  return (
    <div className="json-editor">
      <AceEditor
        mode="json"
        theme="github"
        onChange={handleChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          useWorker: false,
        }}
        value={text}
        style={{
          height: '100%',
          width: '100%',
          fontSize: 8,
        }}
      />
    </div>
  );
};
