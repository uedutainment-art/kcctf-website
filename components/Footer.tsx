import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const NAV_LINKS = [
  { href: '#orchestras', key: 'lineup'   },
  { href: '#schedule',   key: 'schedule' },
  { href: '#djs',        key: 'tickets'  },
  { href: '#venue',      key: 'venue'    },
  { href: '#tickets',    key: 'register' },
] as const;

const LEGAL_LINKS = [
  { href: '/terms',   key: 'terms'   },
  { href: '/privacy', key: 'privacy' },
  { href: '/refund',  key: 'refund'  },
] as const;

export default function Footer() {
  const t  = useTranslations('footer');
  const tn = useTranslations('nav');
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@kcctf.org';

  return (
    <footer id="about" className="bg-night text-warm-white pt-16 pb-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Top: centred bandoneon + tagline */}
        <div className="flex flex-col items-center text-center mb-12 pb-10 border-b border-warm-white/10">
          <Image
            src="/images/illustration-bandoneon-dark.png"
            alt=""
            width={200}
            height={200}
            style={{ height: '200px', width: 'auto', opacity: 0.8, mixBlendMode: 'screen' }}
            aria-hidden
          />
          <p
            className="font-en-display italic font-black text-gold mt-6 leading-none"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            {t('tagline')} · {t('taglineEn')}
          </p>
        </div>

        {/* 4-column links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-14 text-center sm:text-left">

          {/* Sitemap */}
          <div>
            <p className="font-en-body font-bold text-[16px] tracking-[0.2em] uppercase text-gold mb-5">
              {t('navTitle')}
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ href, key }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="font-kr-sans text-[14px] text-warm-white/65 hover:text-warm-white transition-colors"
                  >
                    {tn(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info / Legal */}
          <div>
            <p className="font-en-body font-bold text-[16px] tracking-[0.2em] uppercase text-gold mb-5">
              {t('infoTitle')}
            </p>
            <ul className="flex flex-col gap-3">
              {LEGAL_LINKS.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="font-kr-sans text-[14px] text-warm-white/65 hover:text-warm-white transition-colors"
                  >
                    {t(`legal.${key}`)}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-en-body text-[13px] text-warm-white/65 hover:text-warm-white transition-colors"
                >
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Follow placeholder */}
          <div>
            <p className="font-en-body font-bold text-[16px] tracking-[0.2em] uppercase text-gold mb-5">
              {t('followTitle')}
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="font-kr-sans text-[14px] text-warm-white/30">Instagram</span>
              </li>
              <li>
                <span className="font-kr-sans text-[14px] text-warm-white/30">Facebook</span>
              </li>
            </ul>
          </div>

          {/* Sponsors */}
          <div>
            <p className="font-en-body font-bold text-[16px] tracking-[0.2em] uppercase text-gold mb-5">
              {t('sponsorsTitle')}
            </p>
            <div className="flex flex-col gap-1">
              <p className="font-kr-sans text-[11px] text-warm-white/35 uppercase tracking-[0.12em]">주최·주관</p>
              <p className="font-kr-sans text-[14px] text-warm-white/65 leading-[1.6]">
                춘천문화재단<br />(사)춘천국제탱고페스티벌
              </p>
              <p className="font-kr-sans text-[11px] text-warm-white/35 uppercase tracking-[0.12em] mt-3">후원</p>
              {/* 춘천시 로고 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/KCCTF_logo/춘천시.svg"
                alt="춘천시"
                style={{ height: '44px', width: 'auto', opacity: 0.75, filter: 'brightness(0) invert(1)' }}
                className="mt-1 mb-2"
              />
              <p className="font-kr-sans text-[14px] text-warm-white/65 leading-[1.6]">
                주한아르헨티나 대사관
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-warm-white/10 pt-6 flex flex-col sm:flex-row sm:items-start gap-4">
          <p className="font-kr-sans text-[11px] text-warm-white/30 leading-[1.5] flex-1">
            {t('copyright')}
          </p>
          <p className="font-kr-sans text-[10px] text-warm-white/15 leading-[1.5] max-w-xs">
            {t('emailHarvestNotice')}
          </p>
        </div>

      </div>
    </footer>
  );
}
