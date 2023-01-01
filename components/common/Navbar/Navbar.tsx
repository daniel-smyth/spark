'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cx from 'clsx';
import s from './Navbar.module.css';
import { ConnectWallet } from '@thirdweb-dev/react';

const Navbar: FC = () => {
  const [open, setOpen] = useState(false);

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const prefersLight = window.matchMedia(
    '(prefers-color-scheme: light)'
  ).matches;

  return (
    <nav className={s.navigation}>
      <Link href="/" className={s.brandName}>
        {prefersDark && (
          <Image
            src="/sparkwhite.svg"
            alt="Spark3"
            width={90}
            height={30}
            priority
          />
        )}
        {prefersLight && (
          <Image
            src="/sparkblack.svg"
            alt="Spark3"
            width={90}
            height={30}
            priority
          />
        )}
      </Link>
      <button
        className={open ? cx(s.hamburger, s.clicked) : s.hamburger}
        onClick={() => setOpen(!open)}
      >
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div
        className={open ? cx(s.navigationMenu, s.expanded) : s.navigationMenu}
      >
        <ul>
          <li className={s.connectButton}>
            <ConnectWallet accentColor="#1b7dce" colorMode="light" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
