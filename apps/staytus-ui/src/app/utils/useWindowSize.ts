import { useEffect, useState } from 'react';

export interface WindowSizes {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean;
  isDesktop: boolean;
}
function useWindowSize(): WindowSizes {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<WindowSizes>({
    width: undefined,
    height: undefined,
    isMobile: true,
    isDesktop: false,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
        isDesktop: window.innerWidth > 768,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
export default useWindowSize;
