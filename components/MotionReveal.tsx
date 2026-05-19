'use client';

import { createElement, useEffect, useRef, useState } from 'react';

type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean;
};

export default function MotionReveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  threshold = 0.16,
  style,
  'aria-hidden': ariaHidden,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return createElement(
    Tag,
    {
      ref,
      className: ['motion-reveal', visible ? 'motion-in' : '', className].join(' '),
      style: { ...style, transitionDelay: `${delay}ms` },
      'aria-hidden': ariaHidden,
    },
    children
  );
}
