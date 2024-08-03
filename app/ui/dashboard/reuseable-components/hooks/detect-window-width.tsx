import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);


  //for checking desktop width always check condition as 'if(isDesktop || windowWidth >= 768)
  const [isDesktop, setIsDesktop] = useState<boolean>(window.matchMedia("(min-width: 768px)").matches);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { windowWidth, isDesktop };
};

export default useWindowWidth;
