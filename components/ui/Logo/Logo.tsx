'use client';

import Image from 'next/image';
import usePrefersColorScheme from '@lib/hooks/usePrefersColorScheme';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  width = 90,
  height = 30,
  className = ''
}) => {
  const colorScheme = usePrefersColorScheme();

  return (
    <Image
      src={colorScheme === 'dark' ? '/sparkwhite.svg' : '/sparkblack.svg'}
      alt="Spark3"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
};

export default Logo;
