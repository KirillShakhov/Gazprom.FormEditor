import { useEffect } from 'react';

export const useKeyDown = (callback: any, keys: string[]) => {
  const onKeyDown = (event: any) => {
    console.log('event.key ' + event.key);
    const wasAnyKeyPressed = keys.some((key: any) => event.key === key);
    if (wasAnyKeyPressed) {
      event.preventDefault();
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
};

export const useMouseWheelZoom = (callback: (delta: number) => void) => {
  const onMouseWheel = (event: any) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    if (isMac) {
      if (!event.metaKey) return;
    } else {
      if (!event.ctrlKey) return;
    }
    callback(event.deltaY);
  };
  useEffect(() => {
    document.addEventListener('wheel', onMouseWheel);
    return () => {
      document.removeEventListener('wheel', onMouseWheel);
    };
  }, [onMouseWheel]);
};
