import React from 'react';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import DangerousRoundedIcon from '@mui/icons-material/DangerousRounded';
export enum ErrorType {
  Error,
  Warning,
}

export interface Error {
  type: ErrorType;
  text: string;
}

interface TextModeProps {
  errors: Error[];
}

export const ErrorComponent: React.FC<TextModeProps> = (props) => {
  const { errors } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {errors.map((error, index) => {
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              padding: 10,
              width: 300,
              background: 'rgba(238,238,238,0.8)',
              backdropFilter: 'blur(4px)',
              borderRadius: 10,
            }}
          >
            {error.type == ErrorType.Error && <ErrorOutlineRoundedIcon sx={{ color: '#fa8181' }} />}
            {error.type == ErrorType.Warning && <DangerousRoundedIcon sx={{ color: '#fad481' }} />}
            <span
              style={{
                marginLeft: 10,
                color: '#000000',
              }}
            >
              {error.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};
