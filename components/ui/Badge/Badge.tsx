import { Inter } from '@next/font/google';
import s from './Badge.module.css';

const inter = Inter({ subsets: ['latin'] });

interface BadgeProps {
  children: React.ReactNode | any;
  color?: string;
  backgroundColor?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color, backgroundColor }) => {
  return (
    <span className={s.badge} style={{ color, backgroundColor }}>
      <div className={inter.className}>{children}</div>
    </span>
  );
};

export default Badge;
