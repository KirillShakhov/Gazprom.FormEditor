import {Box, Tab, Tabs} from '@mui/material';
import React from 'react';
import {CommandLine} from '../command-line/command-line';
import './form-editor.css';
import {VisualMode} from '../visual-mode/visual-mode';
import {TextMode} from '../text-mode/text-mode';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

enum Modes {
  Visual,
  Text,
}

/** Редактор форм. */
export const FormEditor: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [mode, setMode] = React.useState(Modes.Text);

  const standardData =
    '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';
  const [data, setData] = React.useState(standardData);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {children}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const changeMode = () => {
    if (mode === Modes.Text) {
      setMode(Modes.Visual);
    } else {
      setMode(Modes.Text);
    }
  };

  return (
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
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Параметры" {...a11yProps(0)} />
            <Tab label="Форма" {...a11yProps(1)} />
            <Tab label="Компоненты" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="red">Item Three</div>
        </TabPanel>
      </div>
      <main>
        <div hidden={mode != Modes.Visual}>
          <VisualMode></VisualMode>
        </div>
        <div hidden={mode != Modes.Text} className="text-mode">
          <TextMode value={data} onChange={setData}></TextMode>
        </div>
      </main>
      <div className="right-side">Right Sidebar</div>
    </div>
  );
};

FormEditor.displayName = 'FormEditor';
