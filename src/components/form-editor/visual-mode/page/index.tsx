import React from 'react';
import {ITabPage} from "../../../../interfaces/form-config";

interface PageProps {
  value: ITabPage;
}

export const Page: React.FC<PageProps> = (props) => {
  const { value } = props;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span style={{ fontSize: 16, margin: 0, marginTop: 10 }}>{value.name}</span>
      </div>
    </div>
  );
};
