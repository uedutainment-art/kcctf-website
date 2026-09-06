import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return { title: locale === 'ko' ? '이용약관 — KCTF' : 'Terms of Service — KCTF' };
}

export default function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  const isKo = locale === 'ko';

  const sectionsKo: LegalSection[] = [
    {
      heading: '제1조 (목적)',
      paragraphs: [
        '본 약관은 사단법인 춘천국제탱고페스티벌(이하 주최측)이 운영하는 웹사이트(kcctf.org) 및 춘천국제탱고페스티벌 2026 참가 신청 서비스의 이용 조건을 규정합니다.',
      ],
    },
    {
      heading: '제2조 (신청 및 계약 성립)',
      paragraphs: [
        '참가 신청은 신청서 제출 후 안내된 계좌로 참가비를 입금하고, 주최측이 입금을 확인한 시점에 확정됩니다. 신청서 제출만으로는 참가가 확정되지 않습니다.',
      ],
    },
    {
      heading: '제3조 (결제)',
      bullets: [
        '국내: 신한은행 100-038-582544 (예금주: 사단법인 춘천국제탱고페스티벌) 계좌이체',
        '해외 참가자: 별도 안내(해외 송금/SWIFT, 알리페이 등)',
        '신청 후 3일 이내 입금을 권장하며, 미입금 시 신청이 취소될 수 있습니다.',
      ],
    },
    {
      heading: '제4조 (티켓 및 입장)',
      paragraphs: [
        '입금 확인 후 전자 티켓(QR 코드)이 이메일로 발급됩니다. 행사 당일 QR 코드 제시로 입장하며, 티켓의 무단 양도·재판매를 금합니다.',
      ],
    },
    {
      heading: '제5조 (환불)',
      paragraphs: ['참가비 및 숙박 패키지의 환불은 별도의 환불 규정에 따릅니다.'],
    },
    {
      heading: '제6조 (프로그램 변경)',
      paragraphs: [
        '출연진, 일정, 장소 등은 부득이한 사정에 따라 변경될 수 있으며, 중대한 변경이 있을 경우 웹사이트 및 이메일 등으로 공지합니다.',
      ],
    },
    {
      heading: '제7조 (이용자의 의무)',
      paragraphs: [
        '참가자는 정확한 정보를 제공해야 하며, 타인의 정보를 도용하거나 행사장의 안전과 질서를 해치는 행위를 해서는 안 됩니다.',
      ],
    },
    {
      heading: '제8조 (책임의 한계)',
      paragraphs: [
        '주최측은 천재지변 등 불가항력으로 인한 행사 변경·취소 및 그로 인한 손해에 대하여 관련 법령이 허용하는 범위 내에서 책임을 제한합니다.',
      ],
    },
    {
      heading: '제9조 (준거법 및 관할)',
      paragraphs: [
        '본 약관은 대한민국 법령에 따라 해석되며, 분쟁에 관하여는 관련 법령에 따른 관할 법원을 따릅니다.',
      ],
    },
    {
      heading: '문의',
      paragraphs: ['info@kcctf.org / 사단법인 춘천국제탱고페스티벌 · 시행일: 2026년 6월 8일'],
    },
  ];

  const sectionsEn: LegalSection[] = [
    {
      heading: 'Article 1 (Purpose)',
      paragraphs: [
        'These Terms govern the use of the website (kcctf.org) and the registration service for the Chuncheon International Tango Festival 2026, operated by the Chuncheon International Tango Festival (the “organizer”).',
      ],
    },
    {
      heading: 'Article 2 (Registration and formation)',
      paragraphs: [
        'A registration is confirmed when, after the registration form is submitted, the fee is transferred to the designated account and the organizer verifies the payment. Submitting the form alone does not confirm participation.',
      ],
    },
    {
      heading: 'Article 3 (Payment)',
      bullets: [
        'Domestic: bank transfer to Shinhan Bank 100-038-582544 (account holder: Chuncheon International Tango Festival)',
        'Overseas participants: separate guidance (international wire/SWIFT, Alipay, etc.)',
        'Payment within 3 days of registration is recommended; unpaid registrations may be cancelled.',
      ],
    },
    {
      heading: 'Article 4 (Tickets and entry)',
      paragraphs: [
        'After payment is verified, an electronic ticket (QR code) is issued by email. Entry is by presenting the QR code on the event day. Unauthorized transfer or resale of tickets is prohibited.',
      ],
    },
    {
      heading: 'Article 5 (Refunds)',
      paragraphs: ['Refunds of fees and accommodation packages are governed by the separate Refund Policy.'],
    },
    {
      heading: 'Article 6 (Program changes)',
      paragraphs: [
        'Performers, schedule, and venue may change due to unavoidable circumstances; material changes will be announced via the website and email.',
      ],
    },
    {
      heading: 'Article 7 (User obligations)',
      paragraphs: [
        'Participants must provide accurate information and must not misuse others’ information or disrupt the safety and order of the venue.',
      ],
    },
    {
      heading: 'Article 8 (Limitation of liability)',
      paragraphs: [
        'The organizer limits its liability for changes/cancellation due to force majeure and any resulting damages, to the extent permitted by applicable law.',
      ],
    },
    {
      heading: 'Article 9 (Governing law and jurisdiction)',
      paragraphs: [
        'These Terms are interpreted under the laws of the Republic of Korea, and disputes are subject to the competent court under applicable law.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: ['info@kcctf.org / Chuncheon International Tango Festival · Effective: June 8, 2026'],
    },
  ];

  return (
    <LegalPage
      title={isKo ? '이용약관' : 'Terms of Service'}
      updated={isKo ? '시행일: 2026년 6월 8일' : 'Effective: June 8, 2026'}
      backLabel={isKo ? '홈으로' : 'Home'}
      sections={isKo ? sectionsKo : sectionsEn}
    />
  );
}
