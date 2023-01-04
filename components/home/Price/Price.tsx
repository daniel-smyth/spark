import cn from 'clsx';
import { Badge, Button, Text } from '@components/ui';
import s from './Price.module.css';

export interface PriceProps {
  title: string;
  price: number;
  data: string[];
  action: string;
  link: string;
  disabled?: boolean;
  className?: string;
}

const Price: React.FC<PriceProps> = ({
  title,
  price,
  data,
  action,
  link,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={cn(s.root, { [s.disabledRoot]: disabled }, className)}>
      <div className={s.title}>
        <Badge className={cn({ [s.disabledTitle]: disabled })}>{title}</Badge>
      </div>
      <div className={s.billing}>
        <Text>$</Text>
        <Text variant="sectionHeading">{price}</Text>
        <Text>USD</Text>
      </div>
      <div className={s.features}>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <Text>{item}</Text>
            </li>
          ))}
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
