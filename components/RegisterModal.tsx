'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocale } from 'next-intl';

const EMBED_BASE = 'https://kcctf-5047d.web.app/register/chuncheon-citf-2026';
const EMBED_ORIGIN = 'https://kcctf-5047d.web.app';

export default function RegisterModal() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [iframeH, setIframeH] = useState(680);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Open via custom event (fired by RegisterButton everywhere on the page)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('kcctf:register', handler);
    return () => window.removeEventListener('kcctf:register', handler);
  }, []);

  // Auto-height via postMessage from EventLink iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== EMBED_ORIGIN) return;
      if (e.data?.type === 'resize' && typeof e.data.height === 'number') {
        setIframeH(Math.max(400, e.data.height));
      }
      if (e.data?.type === 'registration-complete') close();
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [close]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, close]);

  if (!open) return null;

  const src = `${EMBED_BASE}?embed=1&lang=${locale}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/65 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="예약 신청"
        className="relative z-10 w-full sm:max-w-[700px] bg-warm-white rounded-t-2xl sm:rounded-xl shadow-[0_32px_80px_rgba(0,0,0,0.4)] flex flex-col max-h-[92dvh]"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-[13px] border-b border-ink-soft/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-[3px] h-5 bg-burgundy rounded-full" aria-hidden />
            <div>
              <p className="font-kr-serif font-black text-[15px] text-burgundy leading-none">예약 신청</p>
              <p className="font-en-body text-[10px] tracking-[0.22em] uppercase text-ink-soft/45 mt-[2px]">
                Chuncheon Tango Festival 2026
              </p>
            </div>
          </div>
          <button
            onClick={close}
            aria-label="닫기"
            className="w-8 h-8 flex items-center justify-center rounded-full text-ink-soft/40 hover:text-ink-soft hover:bg-ink-soft/8 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* iframe */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <iframe
            ref={iframeRef}
            src={src}
            title="춘천국제탱고페스티벌 2026 예약 신청"
            allow="payment"
            style={{ width: '100%', height: `${iframeH}px`, border: 'none', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}
