import { Badge, Button, Text } from '@components/ui';
import s from './Price.module.css';

export interface PriceProps {
  title: string;
  price: number;
  data: string[];
  link: string;
}

const Price: React.FC<PriceProps> = ({ title, price, data, link }) => {
  return (
    <div className={s.card}>
      <div className={s.title}>
        <Badge>{title}</Badge>
      </div>
      <div className={s.billing}>
        <Text>$</Text>
        <Text variant="sectionHeading">{price}</Text>
        <Text>USD</Text>
      </div>
      <div className={s.features}>
        <ul>
          {data.map((item, index) => {
            return (
              <li key={index}>
                <Text>{item}</Text>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={s.action}>
        <Button variant="flat" width="90%" href={link}>
          Find out more
        </Button>
      </div>
    </div>
  );
};

export default Price;
