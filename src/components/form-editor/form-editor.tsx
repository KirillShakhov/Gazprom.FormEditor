import React from 'react';
import { CommandLine } from '../command-line/command-line';
import './form-editor.css';

/** Редактор форм. */
export const FormEditor: React.FC = () => {
  return (
    <div className="layout">
      <header>
        <CommandLine>Редактор форм</CommandLine>
      </header>
      <div className="left-side blue section">Left Sidebar</div>
      <main className="section coral" contentEditable>
        {' '}
        Main Content
      </main>
      <div className="right-side yellow section">Right Sidebar</div>
    </div>
  );
};

FormEditor.displayName = 'FormEditor';
