import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return { title: locale === 'ko' ? '환불 규정 — KCCTF' : 'Refund Policy — KCCTF' };
}

export default function RefundPage({ params: { locale } }: { params: { locale: string } }) {
  const isKo = locale === 'ko';

  const sectionsKo: LegalSection[] = [
    {
      paragraphs: [
        '본 환불 규정은 춘천국제탱고페스티벌 2026(이하 페스티벌) 참가 신청(참가권 및 숙박 패키지)에 적용됩니다.',
      ],
    },
    {
      heading: '환불 기준',
      bullets: [
        '2026년 8월 14일까지 취소: 전액 환불',
        '2026년 8월 15일부터: 환불 불가',
      ],
    },
    {
      heading: '환불 방법',
      paragraphs: [
        '환불은 입금하신 계좌로 계좌이체를 통해 진행됩니다. 환불을 원하시면 info@kcctf.org 로 신청자 성함과 함께 요청해 주세요. 확인 후 영업일 기준 3-5일 이내에 처리됩니다.',
        '환불 과정에서 발생하는 송금 수수료 등 실비는 공제될 수 있습니다.',
      ],
    },
    {
      heading: '숙박 패키지',
      paragraphs: [
        '숙박 패키지도 위 환불 기준을 동일하게 적용합니다. 다만 공식 호텔(더베네치아스위트)의 사정에 따라 일부 조건이 별도로 안내될 수 있습니다.',
      ],
    },
    {
      heading: '행사 취소·변경 시',
      paragraphs: [
        '천재지변, 감염병, 그 밖의 불가항력 또는 주최측의 부득이한 사정으로 페스티벌이 취소되거나 중대하게 변경되는 경우, 별도의 환불·보상 기준을 공지해 드립니다.',
      ],
    },
    {
      heading: '문의',
      paragraphs: ['환불 및 신청 관련 문의: info@kcctf.org / 사단법인 춘천국제탱고페스티벌'],
    },
  ];

  const sectionsEn: LegalSection[] = [
    {
      paragraphs: [
        'This Refund Policy applies to all registrations for the Chuncheon International Tango Festival 2026 (the “Festival”), including passes and accommodation packages.',
      ],
    },
    {
      heading: 'Refund terms',
      bullets: [
        'On or before August 14, 2026: full refund.',
        'From August 15, 2026: no refund.',
      ],
    },
    {
      heading: 'How refunds are processed',
      paragraphs: [
        'Refunds are issued by bank transfer to the account used for payment. To request a refund, email info@kcctf.org with the registrant’s name. Approved refunds are processed within 3–5 business days.',
        'Any remittance or transfer fees incurred during the refund may be deducted.',
      ],
    },
    {
      heading: 'Accommodation packages',
      paragraphs: [
        'The same terms apply to accommodation packages. Additional conditions may apply depending on the official hotel (The Venezia Suite).',
      ],
    },
    {
      heading: 'If the Festival is cancelled or changed',
      paragraphs: [
        'If the Festival is cancelled or materially changed due to force majeure (natural disaster, epidemic, etc.) or unavoidable circumstances of the organizer, a separate refund/compensation policy will be announced.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: ['Refund and registration inquiries: info@kcctf.org / Chuncheon International Tango Festival'],
    },
  ];

  return (
    <LegalPage
      title={isKo ? '환불 규정' : 'Refund Policy'}
      updated={isKo ? '시행일: 2026년 6월 8일' : 'Effective: June 8, 2026'}
      backLabel={isKo ? '홈으로' : 'Home'}
      sections={isKo ? sectionsKo : sectionsEn}
    />
  );
}
