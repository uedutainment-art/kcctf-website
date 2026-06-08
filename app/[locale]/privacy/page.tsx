import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return { title: locale === 'ko' ? '개인정보처리방침 — KCCTF' : 'Privacy Policy — KCCTF' };
}

export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  const isKo = locale === 'ko';

  const sectionsKo: LegalSection[] = [
    {
      paragraphs: [
        '사단법인 춘천국제탱고페스티벌(이하 주최측)은 개인정보 보호법 등 관련 법령을 준수하며, 참가자의 개인정보를 다음과 같이 처리합니다.',
      ],
    },
    {
      heading: '1. 수집하는 개인정보 항목',
      bullets: [
        '필수: 성명(한글/영문), 이메일 주소, 휴대전화번호, 국가/지역, 탱고 역할(리더/팔로워/스위치)',
        '신청 내용: 참가 패키지, 숙박·셔틀 선택, 긴급연락처',
        '해외(중국 등) 신청 시: 위챗(WeChat) ID, 신청 조회용 비밀번호',
      ],
    },
    {
      heading: '2. 수집·이용 목적',
      bullets: [
        '참가 신청 접수 및 본인 확인',
        '입금(결제) 확인 및 참가 확정',
        '전자 티켓(QR) 발급 및 행사 입장 관리',
        '행사 운영 안내(이메일·문자 발송), 숙박·셔틀 배정',
        '문의 응대 및 공지',
      ],
    },
    {
      heading: '3. 보유 및 이용 기간',
      paragraphs: [
        '수집된 개인정보는 행사 종료 후 1년간 보관한 뒤 지체 없이 파기합니다. 다만 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.',
      ],
    },
    {
      heading: '4. 처리위탁 및 제3자',
      paragraphs: ['원활한 행사 운영을 위해 아래와 같이 개인정보 처리를 위탁합니다.'],
      bullets: [
        '이메일 발송: Resend (해외)',
        '문자(SMS) 발송: Solapi',
        '데이터 저장·호스팅: Google Firebase (해외)',
        '숙박 배정: 더베네치아스위트(공식 호텔) — 숙박 신청자에 한함',
        '해외(중국) 결제: PayVerse (이롬넷)',
      ],
    },
    {
      heading: '5. 개인정보의 국외 이전',
      paragraphs: [
        '위 수탁사 중 일부(Resend, Google 등)는 서버가 국외에 있어, 서비스 제공 과정에서 개인정보가 국외로 이전·저장될 수 있습니다.',
      ],
    },
    {
      heading: '6. 정보주체의 권리',
      paragraphs: [
        '참가자는 언제든지 본인의 개인정보에 대한 열람·정정·삭제·처리정지를 요청할 수 있으며, info@kcctf.org 로 요청하시면 지체 없이 조치합니다.',
      ],
    },
    {
      heading: '7. 개인정보 보호책임자',
      bullets: [
        '단체: 사단법인 춘천국제탱고페스티벌',
        '연락처: info@kcctf.org',
      ],
    },
    {
      heading: '8. 시행일',
      paragraphs: ['본 방침은 2026년 6월 8일부터 시행됩니다.'],
    },
  ];

  const sectionsEn: LegalSection[] = [
    {
      paragraphs: [
        'The Chuncheon International Tango Festival (the “organizer”) complies with applicable data protection laws and processes participants’ personal data as described below.',
      ],
    },
    {
      heading: '1. Personal data we collect',
      bullets: [
        'Required: name (Korean/English), email address, mobile phone number, country/region, tango role (leader/follower/switch)',
        'Registration details: pass type, accommodation/shuttle selection, emergency contact',
        'For overseas (e.g., China) registration: WeChat ID, registration lookup password',
      ],
    },
    {
      heading: '2. Purpose of use',
      bullets: [
        'Receiving and verifying registrations',
        'Confirming payment and finalizing registration',
        'Issuing electronic tickets (QR) and managing entry',
        'Event communications (email/SMS), accommodation and shuttle assignment',
        'Responding to inquiries and announcements',
      ],
    },
    {
      heading: '3. Retention period',
      paragraphs: [
        'Personal data is retained for one year after the Festival and then destroyed without delay, unless a longer period is required by law.',
      ],
    },
    {
      heading: '4. Processors and third parties',
      paragraphs: ['To operate the Festival, we entrust personal data processing as follows.'],
      bullets: [
        'Email delivery: Resend (overseas)',
        'SMS delivery: Solapi',
        'Data storage / hosting: Google Firebase (overseas)',
        'Accommodation: The Venezia Suite (official hotel) — for accommodation registrants only',
        'Overseas (China) payment: PayVerse',
      ],
    },
    {
      heading: '5. Overseas transfer',
      paragraphs: [
        'Some processors (Resend, Google, etc.) operate servers abroad, so personal data may be transferred and stored overseas in the course of providing the service.',
      ],
    },
    {
      heading: '6. Your rights',
      paragraphs: [
        'You may request access, correction, deletion, or suspension of processing of your personal data at any time by emailing info@kcctf.org. We will act without delay.',
      ],
    },
    {
      heading: '7. Data protection contact',
      bullets: ['Organization: Chuncheon International Tango Festival', 'Contact: info@kcctf.org'],
    },
    {
      heading: '8. Effective date',
      paragraphs: ['This policy is effective as of June 8, 2026.'],
    },
  ];

  return (
    <LegalPage
      title={isKo ? '개인정보처리방침' : 'Privacy Policy'}
      updated={isKo ? '시행일: 2026년 6월 8일' : 'Effective: June 8, 2026'}
      backLabel={isKo ? '홈으로' : 'Home'}
      sections={isKo ? sectionsKo : sectionsEn}
    />
  );
}
