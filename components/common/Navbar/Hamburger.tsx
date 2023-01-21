'use client';

import { useState } from 'react';
import cx from 'clsx';
import s from './Hamburger.module.css';
import { ConnectWallet } from '@thirdweb-dev/react';

function Hamburger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={open ? cx(s.hamburger, s.clicked) : s.hamburger}
        onClick={() => setOpen(!open)}
      >
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
      <div className={open ? cx(s.menu, s.expanded) : s.menu}>
        <ul>
          <li className={s.connectButton}>
            <ConnectWallet
              accentColor="#1b7dce"
              colorMode="light"
              auth={{
                loginConfig: {
                  redirectTo: '/create'
                }
              }}
            />
          </li>
        </ul>
      </div>
    </>
  );
}

export default Hamburger;
