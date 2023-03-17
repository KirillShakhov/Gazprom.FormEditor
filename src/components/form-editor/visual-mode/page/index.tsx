import React from 'react';

interface PageProps {
  children?: React.ReactNode;
  title: string;
}

export const Page: React.FC<PageProps> = (props) => {
  // const { children, value, index, ...other } = props;
  const { children, title, ...other } = props;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span style={{ fontSize: 16, margin: 0, marginTop: 10 }}>{title}</span>
        <span style={{ marginTop: 10 }}>Страница 1</span>
      </div>
    </div>
  );
};
