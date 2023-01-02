'use client';

import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width, height }) => {
  const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <Image
      src={darkTheme ? '/sparkwhite.svg' : '/sparkblack.svg'}
      alt="Spark3"
      width={width || 90}
      height={height || 30}
      priority
    />
  );
};

export default Logo;
