import { Badge, Button, Text } from '@components/ui';
import s from './Price.module.css';

export interface PriceProps {
  title: string;
  price: number;
  data: string[];
  action: string;
  link: string;
  disabled?: boolean;
}

const Price: React.FC<PriceProps> = ({
  title,
  price,
  data,
  action,
  link,
  disabled = false
}) => {
  return (
    <div
      className={s.card}
      style={disabled ? { borderTop: '6px solid rgba(153, 153, 153)' } : {}}
    >
      <div className={s.title}>
        <Badge
          color={disabled ? 'rgba(153, 153, 153)' : undefined}
          backgroundColor={disabled ? 'rgba(136, 136, 136, 0.3)' : undefined}
        >
          {title}
        </Badge>
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
        <Button variant="flat" width="90%" href={link} disabled={disabled}>
          {action}
        </Button>
      </div>
    </div>
  );
};

export default Price;
