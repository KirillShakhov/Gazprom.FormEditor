import React, { useEffect, useState } from 'react';
import './text-mode.css';
import AceEditor from 'react-ace';
import { IForm } from '../../../interfaces/form-config';
import 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/worker-json';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/ext-language_tools';

import { validate } from '../../../utils/validate-halper';
import { checkUniqueCode } from '../../../utils/check-unique-code';
import { ErrorComponent, Error, ErrorType } from '../error-component';
import { useMouseWheelZoom } from '../../../utils/key-down';
import { useLocalStorage } from '../../../utils/local-storage';

interface TextModeProps {
  value: IForm;
  onChange: (value: IForm) => void;
}

export const TextMode: React.FC<TextModeProps> = (props) => {
  const { value, onChange } = props;
  const [errors, setErrors] = useState<Error[]>([]);
  const [text, setText] = useState(JSON.stringify(value, null, 2));

  useEffect(() => {
    setText(JSON.stringify(value, null, 2));
  }, [value]);

  const [fontSize, setFontSize] = useLocalStorage('textModeFontSize', 24);
  useMouseWheelZoom((delta) => {
    if (Math.abs(delta) < 4) return;
    const newZoom = fontSize + (delta > 0 ? 1 : -1);
    if (newZoom > 4 && newZoom < 48) {
      setFontSize(newZoom);
    }
    console.log('fontSize ' + fontSize);
  });

  function handleChange(text: string) {
    try {
      try {
        const json = JSON.parse(text);
        validate(json).then((errors) => {
          if (errors == null) {
            const errorUnique = checkUniqueCode(JSON.parse(text) as IForm);
            if (errorUnique === '') {
              setErrors([]);
            } else {
              setErrors([{ type: ErrorType.Error, text: 'not unique code ' + errorUnique }]);
              console.log('errorUnique ' + errorUnique);
            }
            return;
          }
          console.log(errors);
          let errorMessage = '';
          errors.forEach((error) => {
            errorMessage += error.instancePath + ' ' + error.message;
          });
          setErrors([{ type: ErrorType.Error, text: `${errorMessage}` }]);
        });
      } catch (e) {
        setErrors([{ type: ErrorType.Error, text: `${e}` }]);
      }
      setText(text);
      onChange(JSON.parse(text));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="json-editor">
      <div
        style={{
          position: 'fixed',
          top: 10,
          right: 30,
          zIndex: 100,
        }}
      >
        <ErrorComponent errors={errors} />
      </div>
      <AceEditor
        mode="json"
        theme="textmate"
        onChange={handleChange}
        name="json-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          useWorker: false,
          tabSize: 2,
        }}
        value={text}
        style={{
          height: '100%',
          width: '100%',
        }}
        fontSize={fontSize}
      />
    </div>
  );
};
