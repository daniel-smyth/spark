import Link from 'next/link';
import Image from 'next/image';
import s from './Navbar.module.css';
import { Text } from '@ui';

const Navbar: React.FC = () => {
  return (
    <nav className={s.navigation}>
      <Link href="/" className={s.brandName}>
        <Image src="/spark.svg" alt="Spark3" width={90} height={30} priority />
      </Link>
      <button className={s.hamburger}>
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className={s.navigationMenu}>
        <ul>
          <li>
            <Link href="/home">
              <Text>Home</Text>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <Text>About</Text>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <Text>Contact</Text>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
