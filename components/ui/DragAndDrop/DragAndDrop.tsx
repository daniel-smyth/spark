'use client';

import { FC, useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Card } from './Card';

export interface DragAndDropProps {
  values: string[];
  onChange: (array: string[]) => void;
  width?: string | number;
  className?: string;
  style?: {};
}

const DragAndDrop: FC<DragAndDropProps> = ({
  values,
  onChange,
  width,
  className = '',
  style = {}
}) => {
  const [cards, setCards] = useState(values);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: string[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as string]
        ]
      })
    );
    onChange(cards);
  }, []);

  const renderCard = useCallback((card: string, index: number) => {
    return (
      <Card
        key={card}
        index={index}
        id={card}
        text={card}
        moveCard={moveCard}
      />
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={className}
        style={{
          width,
          ...style
        }}
      >
        {cards.map((card, i) => renderCard(card, i))}
      </div>
    </DndProvider>
  );
};

export default DragAndDrop;
