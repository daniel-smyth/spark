import { Inter } from '@next/font/google';
import s from './Badge.module.css';

const inter = Inter({ subsets: ['latin'] });

interface BadgeProps {
  children?: React.ReactNode | any;
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <span className={s.badge}>
      <div className={inter.className}>{children}</div>
    </span>
  );
};

export default Badge;
