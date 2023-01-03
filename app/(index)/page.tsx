import Link from 'next/link';
import { FiImage, FiDatabase, FiRepeat } from 'react-icons/fi';
import s from './Index.module.css';
import { Button, Logo, Text } from '@components/ui';
import { Calculator } from '@components/home';
import { Price } from '@components/product';

export default function Home() {
  return (
    <main className={s.main}>
      <div className={s.description}>
        <div>
          <a href="/#" target="_blank" rel="noopener noreferrer">
            <Logo />
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
            <Link href="/create">
              <Button variant="flat">Create 10,000 NFTs</Button>
            </Link>
          </li>
        </ul>
      </div>

      <div className={s.row}>
        <div className={s.steps}>
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
              <div className={s.stepText}>
                <Text>Multiply your images with the Spark3 art engine</Text>
              </div>
            </li>
            <li>
              <div className={s.step}>
                <FiDatabase size={30} />
                <Text variant="sectionHeading">2. Mint Artwork</Text>
              </div>
              <div className={s.stepText}>
                <Text>
                  Mint your new images directly to an address of your choice
                </Text>
              </div>
            </li>
            <li>
              <div className={s.step}>
                <FiRepeat size={30} />
                <Text variant="sectionHeading">3. Sell Artwork</Text>
              </div>
              <div className={s.stepText}>
                <Text>
                  Sell your newly created NFT Artwork on any major exchange
                </Text>
              </div>
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
      </div>

      <div className={s.row}>
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

        <div className={s.price}>
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
        </div>
      </div>
    </main>
  );
}
