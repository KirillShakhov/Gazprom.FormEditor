import React, { useEffect, useState } from 'react';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import './text-mode.css';
import AceEditor from 'react-ace';
import { IForm } from '../../../interfaces/form-config';

import 'ace-builds';
import 'ace-builds/webpack-resolver';
// then the mode, theme & extension
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/ext-searchbox';

import 'ace-builds/src-noconflict/worker-json';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/ext-language_tools';

// import ace from 'ace-builds';
// const Range = ace.require('ace/range').Range;
// editor.setTheme('ace/theme/monokai');
// editor.session.setMode('ace/mode/javascript');

import { validate } from '../../../utils/validate-halper';
import { checkUniqueCode } from '../../../utils/check-unique-code';

interface TextModeProps {
  value: IForm;
  onChange: (value: IForm) => void;
}

export const TextMode: React.FC<TextModeProps> = (props) => {
  const { value, onChange } = props;
  const [error, setError] = useState<string>('');
  const [text, setText] = useState(JSON.stringify(value, null, 2));

  useEffect(() => {
    setText(JSON.stringify(value, null, 2));
  }, [value]);

  function handleChange(text: string) {
    try {
      try {
        const json = JSON.parse(text);
        validate(json).then((errors) => {
          if (errors == null) {
            const errorUnique = checkUniqueCode(JSON.parse(text) as IForm);
            if (errorUnique === '') {
              setError('');
            } else {
              setError('not unique code ' + errorUnique);
              console.log('errorUnique ' + errorUnique);
            }
            return;
          }
          console.log(errors);
          let errorMessage = '';
          errors.forEach((error) => {
            // ace.current
            errorMessage += error.instancePath + ' ' + error.message;
            // const editor = ace.edit('json-editor');
            // const highlight1: MarkerLike = {
            //   update: {},
            // };
            // highlight1.update = customUpdateWithOverlay.call(
            //   highlight1,
            //   'marker1',
            //   word1.range,
            //   'bottom',
            //   'Lorem Ipsum Popover',
            //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis velit tellus.',
            //   false,
            // );
            // editor.getSession().addDynamicMarker(highlight1, true);
            // editor.getSession().addMarker(new Range(0, 0, 1, 5), 'blue', 'text');
          });
          setError(`${errorMessage}`);
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
    } catch (error) {
      console.log(error);
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
        mode="json"
        theme="textmate"
        onChange={handleChange}
        name="json-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
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
