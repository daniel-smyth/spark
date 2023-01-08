import { Inter } from '@next/font/google';
import cn from 'clsx';
import s from './Badge.module.css';

const inter = Inter({ subsets: ['latin'] });

interface BadgeProps {
  color?: string;
  backgroundColor?: string;
  className?: string;
  children: React.ReactNode | any;
}

const Badge: React.FC<BadgeProps> = ({
  color,
  backgroundColor,
  className = '',
  children
}) => {
  return (
    <span className={cn(s.root, className)} style={{ color, backgroundColor }}>
      <div className={inter.className}>{children}</div>
    </span>
  );
};

export default Badge;
