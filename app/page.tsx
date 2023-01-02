import Image from 'next/image';
import { Inter } from '@next/font/google';
import s from './Home.module.css';
import { Badge, Button, Text } from '@components/ui';
import { Calculator } from '@components/home';
import { Price } from '@components/product';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={s.main}>
      <div className={s.description}>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={s.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={s.hero}>
        <ul>
          <li>
            <Text variant="heading">Web3 is here</Text>
          </li>
          <li>
            <Text variant="sectionHeading">Upload. Create. Sell.</Text>
          </li>
          <li>
            <Text>Create up to 10,000 NFTs in minutes</Text>
          </li>
          <li>
            <Button variant="flat">Create 10,000 NFTs</Button>
          </li>
        </ul>
      </div>

      <div className={s.calculator}>
        <Text variant="sectionHeading">Collection Calculator</Text>

        <Text>
          Calculate the maximum number of NFTs you can create with your images
        </Text>

        <Calculator />
      </div>

      <div className={s.price}>
        <Text variant="sectionHeading">How Does it Work?</Text>

        <Text>Minting NFTs has never been this easy</Text>

        <Price
          title="NFT Collection"
          price={99}
          data={[
            'Multiply and sell artwork on exchanges',
            'Unlimited artwork collection size',
            'Setup completed in 5 minutes',
            'No downloads'
          ]}
          link=""
        />
      </div>

      <div className={s.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={s.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and&nbsp;API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={s.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Learn <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={s.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={s.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL
            with&nbsp;Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
