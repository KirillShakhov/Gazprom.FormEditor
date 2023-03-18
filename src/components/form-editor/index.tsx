import {createTheme, Shadows, ThemeProvider} from '@mui/material';
import React from 'react';
import { CommandLine } from './command-line';
import './style.css';
import { VisualMode } from './visual-mode';
import { TextMode } from './text-mode/text-mode';
import { ComponentSettings } from './component-settings';
import { LeftMenu } from './left-menu';

enum Modes {
  Visual,
  Text,
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#5775F4',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E2E5EC',
      contrastText: '#525562',
    },
  },
  shadows: Array(25).fill('none') as Shadows,
});

/** Редактор форм. */
export const FormEditor: React.FC = () => {
  const [mode, setMode] = React.useState(Modes.Visual);

  const standardData =
    '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';
  const [data, setData] = React.useState(standardData);

  const changeMode = () => {
    if (mode === Modes.Text) {
      setMode(Modes.Visual);
    } else {
      setMode(Modes.Text);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="layout">
        <header>
          <CommandLine
            setData={(data) => {
              console.log(data);
              setData(data);
            }}
            getData={() => {
              return data;
            }}
            changeMode={changeMode}
          >
            Редактор форм
          </CommandLine>
        </header>
        <div className="left-side">
          <LeftMenu></LeftMenu>
        </div>
        <main>
          <div hidden={mode != Modes.Visual} style={{ height: '100%' }}>
            <VisualMode value={data}></VisualMode>
          </div>
          <div hidden={mode != Modes.Text} style={{ height: '100%' }}>
            <TextMode value={data} onChange={setData}></TextMode>
          </div>
        </main>
        <div className="right-side">
          <ComponentSettings value={0} onChange={setData} />
        </div>
      </div>
    </ThemeProvider>
  );
};

FormEditor.displayName = 'FormEditor';
