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
    <footer id="about" className="bg-night text-warm-white px-4 sm:px-6 pt-16 pb-10">
      <div className="max-w-5xl mx-auto">

        {/* Top row: tagline + bandoneon */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 border-b border-warm-white/10 pb-10">
          <div>
            <p
              className="font-kr-serif font-black text-warm-white leading-[1.0] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
            >
              {t('tagline')}
            </p>
            <p className="font-en-display italic text-[18px] text-gold-soft mt-2">
              {t('taglineEn')}
            </p>
          </div>
          <div className="opacity-60" aria-hidden>
            <Image
              src="/images/illustration-bandoneon-dark.png"
              alt=""
              width={100}
              height={100}
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-12">

          {/* Sitemap */}
          <div>
            <p className="font-en-body font-bold text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
              {t('navTitle')}
            </p>
            <ul className="flex flex-col gap-2">
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

          {/* Info */}
          <div>
            <p className="font-en-body font-bold text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
              {t('infoTitle')}
            </p>
            <ul className="flex flex-col gap-2">
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
                  className="font-en-body text-[14px] text-warm-white/65 hover:text-warm-white transition-colors"
                >
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Sponsors / organizers */}
          <div className="col-span-2 sm:col-span-1">
            <p className="font-en-body font-bold text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
              {t('sponsorsTitle')}
            </p>
            <div className="flex flex-col gap-2">
              <p className="font-kr-sans text-[11px] text-warm-white/30 uppercase tracking-[0.15em]">주최·주관</p>
              <p className="font-kr-sans text-[13px] text-warm-white/55 leading-[1.6]">
                춘천문화재단<br />(사)춘천국제탱고페스티벌
              </p>
              <p className="font-kr-sans text-[11px] text-warm-white/30 uppercase tracking-[0.15em] mt-1">후원</p>
              <p className="font-kr-sans text-[13px] text-warm-white/55 leading-[1.6]">
                춘천시<br />주한아르헨티나 대사관
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-warm-white/10 pt-6 flex flex-col sm:flex-row sm:items-start gap-4">
          <p className="font-kr-sans text-[11px] text-warm-white/35 leading-[1.5] flex-1">
            {t('copyright')}
          </p>
          <p className="font-kr-sans text-[10px] text-warm-white/20 leading-[1.5] max-w-xs">
            {t('emailHarvestNotice')}
          </p>
        </div>

      </div>
    </footer>
  );
}
