import Image from 'next/image';
import Link from 'next/link';
import cn from 'clsx';
import { FiImage, FiDatabase, FiRepeat } from 'react-icons/fi';
import s from './Index.module.css';
import { Button, Logo, Text } from '@components/ui';
import { Calculator, Price } from '@components/home';

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
          <Text variant="heading" className={s.h1}>
            Web3 is here
          </Text>
          <Text variant="sectionHeading" className={s.h2}>
            Upload. Create. Sell.
          </Text>
          <Text className={s.h3}>Create up to 10,000 NFTs in minutes</Text>
          <Link href="/create">
            <Button variant="flat">Create 10,000 NFTs</Button>
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
            <Text variant="sectionHeading">How Does it Work?</Text>
            <Text>
              Minting NFTs has never been this easy. It&apos;s just 3 steps!
            </Text>
            <ul>
              <li>
                <div className={s.step}>
                  <FiImage size={30} />
                  <Text variant="sectionHeading">1. Multiply Artwork</Text>
                </div>
                <Text>Multiply your images with the Spark3 art engine</Text>
              </li>
              <li>
                <div className={s.step}>
                  <FiDatabase size={30} />
                  <Text variant="sectionHeading">2. Mint Artwork</Text>
                </div>
                <Text>
                  Mint your new images directly to an address of your choice
                </Text>
              </li>
              <li>
                <div className={s.step}>
                  <FiRepeat size={30} />
                  <Text variant="sectionHeading">3. Sell Artwork</Text>
                </div>
                <Text>
                  Sell your newly created NFT Artwork on any major exchange
                </Text>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.calculator}>
          <Text variant="sectionHeading">Collection Calculator</Text>
          <Text>
            Calculate the maximum number of NFTs you can create with your images
          </Text>
          <div className={s.box}>
            <Calculator />
          </div>
        </div>
        <div className={s.price}>
          <Text variant="sectionHeading">How Much is it?</Text>
          <Text>
            It&apos;s cheap too! You can mint 10,000 NFTs for just $99.00
          </Text>
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
        {/* <div className={s.price}>
          <Text variant="sectionHeading">What&apos;s in store?</Text>

          <Text>
            At Spark we are always working on innovative new Web3 technologies
          </Text>

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
        </div> */}
      </div>
    </main>
  );
}
