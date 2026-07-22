import { PropsWithChildren, ElementType } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

interface FadeInProps {
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export default function FadeIn({
  as: Tag = 'div',
  className = '',
  style,
  children,
}: PropsWithChildren<FadeInProps>) {
  const ref = useFadeIn<HTMLElement>();
  return (
    <Tag ref={ref as React.Ref<never>} className={`fade-in ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
