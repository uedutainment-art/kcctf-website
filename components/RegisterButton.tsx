'use client';

interface Props {
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function RegisterButton({ href = '#tickets', className = '', style, children }: Props) {
  const open = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('kcctf:register'));
  };

  return (
    <a href={href} className={className} style={style} onClick={open}>
      {children}
    </a>
  );
}
