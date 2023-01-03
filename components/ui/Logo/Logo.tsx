'use client';

import Image from 'next/image';
import usePrefersColorScheme from '@lib/hooks/usePrefersColorScheme';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width, height }) => {
  const prefersColorScheme = usePrefersColorScheme();
  const isDarkMode = prefersColorScheme === 'dark';

  return (
    <Image
      src={isDarkMode ? '/sparkwhite.svg' : '/sparkblack.svg'}
      alt="Spark3"
      width={width || 90}
      height={height || 30}
      priority
    />
  );
};

export default Logo;
