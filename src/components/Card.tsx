import clsxm from '@riverfl0w/clsxm';
import type { ComponentPropsWithoutRef, FC } from 'react';

interface CardProps extends ComponentPropsWithoutRef<'div'> {}

const Card: FC<CardProps> = ({ className, ...props }) => {
  return <div className={clsxm('p-4 border border-gray-200 rounded-lg', className)} {...props} />;
};

export default Card;
