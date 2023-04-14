import React, { useEffect, useRef, useState } from 'react';
import './text-mode.css';
import AceEditor from 'react-ace';
import { IForm } from '../../../interfaces/form-config';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { validate } from '../../../utils/validate-halper';
interface TextModeProps {
  value: IForm;
  onChange: (value: IForm) => void;
}

export const TextMode: React.FC<TextModeProps> = (props) => {
  const { value, onChange } = props;
  const ace = useRef<AceEditor>(null);
  const [error, setError] = useState<string>('');
  const [text, setText] = useState(JSON.stringify(value, null, 2));

  useEffect(() => {
    setText(JSON.stringify(value, null, 2));
    setError('');
    console.log('123');
  }, [value]);

  function handleChange(text: string) {
    try {
      try {
        const json = JSON.parse(text);
        validate(json).then((e) => {
          setError(`${e}`);
        });
        // const userSchema = object({
        //   name: string().required('Необходимо ввести name'),
        //   age: number().required('Необходимо ввести age').positive().integer(),
        //   email: string().email(),
        //   website: string().url().nullable(),
        //   createdOn: date().default(() => new Date()),
        // });
        // const user = userSchema.validate(json);
        // user
        //   .then((res) => {
        //     console.log('res ' + res);
        //   })
        //   .catch((e) => {
        //     setError(`${e.message}`);
        //   });
        // type UserType = InferType<typeof userSchema>;
        // console.log('user ' + user);
      } catch (e) {
        setError(`${e}`);
      }

      setText(text);
      onChange(JSON.parse(text));
      setError('');
      // const validate = ajv.compile(schema);
      // const valid = validate(text);
      // if (!valid) console.log(validate.errors);
    } catch (error) {
      // pass, user is editing
    }
  }

  // const editor = ace.edit('editor');

  return (
    <div className="json-editor">
      <div hidden={error == ''}>
        <div
          style={{
            position: 'fixed',
            display: 'flex',
            padding: 10,
            top: 10,
            right: 30,
            width: 300,
            background: 'rgba(238,238,238,0.8)',
            backdropFilter: 'blur(4px)',
            borderRadius: 10,
            zIndex: 100,
          }}
        >
          <ErrorOutlineRoundedIcon sx={{ color: '#fa8181' }} />
          <span
            style={{
              marginLeft: 10,
              color: '#000000',
            }}
          >
            {error}
          </span>
        </div>
      </div>
      <AceEditor
        ref={ace}
        mode="json"
        theme="github"
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
          fontSize: 8,
        }}
      />
    </div>
  );
};
