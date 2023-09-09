import { useEffect, useMemo, useState } from 'react';

export const useDetectScreen = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  const isMobile = useMemo(() => {
    return width < 768;
  }, [width]);
  return { isMobile };
};
