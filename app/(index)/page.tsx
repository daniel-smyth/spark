import Image from 'next/image';
import Link from 'next/link';
import { FiImage, FiDatabase, FiRepeat } from 'react-icons/fi';
import s from './Index.module.css';
import { Button, Logo, Text } from '@components/ui';
import { Calculator, Price } from '@components/index';

export default function Home() {
  return (
    <main className={s.root}>
      <div className={s.description}>
        <div>
          <a href="/#" target="_blank" rel="noopener noreferrer">
            <Logo />
          </a>
        </div>
      </div>
      <div className={s.hero}>
        <div className={s.col1}>
          <Text variant="heading" className={s.title}>
            Web3 is here
          </Text>
          <Text variant="sectionHeading" className={s.header}>
            Upload. Create. Sell.
          </Text>
          <Text>Create up to 10,000 NFTs in minutes</Text>
          <Link href="/create">
            <Button variant="flat" className={s.button}>
              Create 10,000 NFTs
            </Button>
          </Link>
        </div>
        <div className={s.col2}>
          <div>
            <Image fill alt="nft-artwork" src="/nft-artwork.svg" />
          </div>
        </div>
      </div>
      <div className={s.info}>
        <div className={s.col1}>
          <div>
            <Image
              fill
              alt="nft-howto"
              src="/nft-howto.svg"
              className={s.image}
            />
          </div>
        </div>
        <div className={s.col2}>
          <div>
            <Text variant="sectionHeading" className={s.header}>
              How Does it Work?
            </Text>
            <Text>
              Minting NFTs has never been this easy. It's just 3 steps!
            </Text>
            <ul className={s.steps}>
              <li>
                <div className={s.step}>
                  <FiImage size={35} color="var(--spark-1)" />
                  <Text variant="sectionHeading">1. Multiply Artwork</Text>
                </div>
                <Text className={s.body}>
                  Multiply your images with the Spark3 art engine
                </Text>
              </li>
              <li>
                <div className={s.step}>
                  <FiDatabase size={35} color="var(--spark-1)" />
                  <Text variant="sectionHeading">2. Mint Artwork</Text>
                </div>
                <Text className={s.body}>
                  Mint your new images directly to an address of your choice
                </Text>
              </li>
              <li>
                <div className={s.step}>
                  <FiRepeat size={35} color="var(--spark-1)" />
                  <Text variant="sectionHeading">3. Sell Artwork</Text>
                </div>
                <Text className={s.body}>
                  Sell your newly created NFT Artwork on any major exchange
                </Text>
              </li>
              <li>
                <Link href="/create">
                  <Button variant="flat" className={s.button}>
                    Get Started
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={s.calculator}>
        <div className={s.col1}>
          <Text variant="sectionHeading" className={s.header}>
            Collection Calculator
          </Text>
          <Text className={s.body}>Calculate how much artwork you need</Text>
          <div className={s.container}>
            <Calculator />
          </div>
        </div>
        <div className={s.col2}>
          <div>
            <Image fill alt="nft-artwork" src="/nft-calculator.svg" />
          </div>
        </div>
      </div>
      <div className={s.pricing}>
        <div className={s.col}>
          <Text variant="sectionHeading" className={s.header}>
            How Much is it?
          </Text>
          <Text className={s.body}>
            It's cheap too! You can mint 10,000 NFTs for just $99.00
          </Text>
          <div className={s.price}>
            <Price
              title="NFT Collection"
              price={99}
              data={[
                'Multiply and sell artwork on exchanges',
                'Unlimited artwork collection size',
                'Setup completed in 5 minutes',
                'No downloads'
              ]}
              action="Find out more"
              link=""
            />
          </div>
        </div>
        <div className={s.col}>
          <Text variant="sectionHeading" className={s.header}>
            What's in store?
          </Text>
          <Text className={s.body}>
            At Spark we are always working on innovative new Web3 technologies
          </Text>
          <div className={s.price}>
            <Price
              title="NFT Marketplace"
              price={199}
              data={[
                'NFT marketplace on your website',
                'Cut out exchange fees',
                'Manage drops and create collections',
                'Website installation in days'
              ]}
              link=""
              action="Coming soon"
              disabled
            />
          </div>
        </div>
      </div>
    </main>
  );
}
