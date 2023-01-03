import { FC } from 'react';
import Link from 'next/link';
import s from './Navbar.module.css';
import Hamburger from './Hamburger';
import { Logo } from '@components/ui';

const Navbar: FC = () => {
  return (
    <nav className={s.navigation}>
      <Link href="/" className={s.brand}>
        <Logo />
      </Link>
      <Hamburger />
    </nav>
  );
};

export default Navbar;
