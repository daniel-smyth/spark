/**
 * * This hook returns the viewport/window height and width
 */

import { useEffect, useState } from "react";

type WindowDimentions = {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean | undefined;
};

const useWindowDimensions = (): WindowDimentions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    width: undefined,
    height: undefined,
    isMobile: undefined,
  });
  useEffect(() => {
    function handleResize(): void {
      var isMobile: boolean;
      if (window.innerWidth < 1024) {
        isMobile = true;
      } else isMobile = false;

      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: isMobile,
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowDimensions;
};

export default useWindowDimensions;
