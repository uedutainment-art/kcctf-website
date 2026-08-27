// Program Note — 탱고! 부에노스아이레스 in Chuncheon
// 출처: 운영/공연_프로그램노트_수정본.docx (2026-08-27 수정 전달본 — 해설 축약판)
// ⚠️ 회차·날짜·장소·티켓 정보를 이 페이지에 넣지 말 것 (10/2·10/3 공용 QR 페이지 — 대표 확정 2026-08-26)
// 수정본 반영 시에도 연도 정정 2건 유지(수정본은 1920년대로 회귀했으나 사실과 다름): Yo No Sé…=1930년대 초 / Remembranzas=1934년
// 로마자 부제 'Tanggo!'는 문서 원문 표기 — Tango 오타 여부 문의 중, 확정 시 이 파일만 수정

export type ProgramPiece = { title: string; sub: string; note: string };
export type ProgramPart = {
  id: string;
  label: string;        // PART I
  orchestra: string;    // Misteriosa Buenos Aires
  introTitle: string;
  intro: string[];
  pieces: ProgramPiece[];
};
export type ProgramNote = {
  pageTitle: string;    // Program Note
  subtitle: string;     // 탱고! 부에노스아이레스
  subtitleRoman: string;
  parts: ProgramPart[];
  closingTitle: string;
  closing: string[];
  /** 출연 — 춘천문화재단 공연 페이지 표기 기준. ⚠️ 사회·보컬은 반드시 '세레나(Serena)' — 본명 표기 금지 (대표 지시 2026-08-26) */
  castTitle: string;
  cast: { role: string; names: string }[];
};

export const PROGRAM_KO: ProgramNote = {
  pageTitle: 'Program Note',
  subtitle: '탱고! 부에노스아이레스',
  subtitleRoman: 'Tanggo! Buenos Aires in Chuncheon',
  parts: [
    {
      id: 'part1',
      label: 'PART I',
      orchestra: 'Misteriosa Buenos Aires',
      introTitle: '사랑, 도시 그리고 탱고',
      intro: [
        '탱고는 흔히 ‘사랑의 춤’으로 알려져 있지만, 사실은 사람들의 삶을 노래하는 음악입니다. 19세기 말 부에노스아이레스의 항구와 골목에서 태어난 탱고는 이민자들의 외로움, 사랑, 기쁨, 이별, 그리고 다시 살아가려는 희망을 담아 발전했습니다.',
        '오늘 1부에서는 사랑이 시작되고, 도시를 살아가며, 이별을 경험하고, 결국 다시 삶을 축제로 받아들이는 과정을 음악으로 따라가 봅니다.',
      ],
      pieces: [
        { title: 'Siempre Tú', sub: '언제나 당신', note: '‘당신은 언제나 내 마음속에 있다’는 고백을 담은 노래입니다.' },
        { title: 'El Marne', sub: '엘 마르네', note: '‘마른(Marne)’은 프랑스의 지명입니다. 유럽의 문화가 아르헨티나로 전해지던 시기에 만들어진 작품으로, 탱고가 단순한 춤 음악을 넘어 국제적인 도시 문화로 성장하던 시대를 보여줍니다.' },
        { title: 'Historia de un Amor', sub: '어느 사랑 이야기', note: '1955년 파나마의 작곡가 카를로스 알마란(Carlos Almarán)이 세상을 떠난 형수의 죽음을 추모하며 만든 곡입니다. 이후 영화에 사용되며 전 세계적인 명곡이 되었고, 루이스 미겔, 안드레아 보첼리 등 수많은 가수들이 다시 불렀습니다. 가사는 "당신이 떠난 뒤 세상은 아무 의미가 없다"는 내용을 담고 있습니다.' },
        { title: 'Hasta Siempre Amor', sub: '영원한 사랑이여', note: '헤어짐 앞에서도 사랑만은 영원하기를 바라는 마음을 담은 곡입니다.' },
        { title: 'El Ingeniero', sub: '기술자', note: '‘기술자’라는 제목처럼 도시인의 삶을 그린 탱고입니다. 산업화가 진행되던 부에노스아이레스의 시대상을 담고 있습니다.' },
        { title: 'Yo No Sé Qué Me Han Hecho Tus Ojos', sub: '당신의 눈이 내게 무슨 마법을 걸었는지', note: '1930년대 초를 대표하는 곡입니다. "당신의 눈을 본 순간 나는 이전의 내가 아니었다." 제목 그대로 한 사람의 눈빛에 사로잡힌 사랑을 노래합니다.' },
        { title: 'Capullo de Miel', sub: '달콤한 꽃봉오리', note: '막 피어나기 시작한 꽃봉오리에 첫사랑을 비유한 곡입니다.' },
        { title: 'Invierno', sub: '겨울', note: '아르헨티나의 겨울은 우리나라와 계절이 반대입니다. 이 곡은 차가운 계절을 묘사하기보다 인생에서 마주하는 고요한 시간을 표현합니다.' },
        { title: 'Gallo Ciego', sub: '눈먼 수탉', note: '무용수들이 즐겨 추는 대표적인 리듬 탱고입니다. 제목은 앞을 보지 못한 채 싸우는 수탉을 비유적으로 표현한 것으로 알려져 있습니다.' },
        { title: 'Como Dos Extraños', sub: '낯선 두 사람처럼', note: '한때 누구보다 사랑했던 두 사람이 시간이 흘러 다시 만났지만, 이제는 서로를 낯선 사람처럼 바라보게 되는 순간을 노래합니다.' },
        { title: 'Corralera', sub: '코랄레라', note: '빠르고 역동적인 리듬이 특징인 탱고입니다.' },
        { title: 'Tu Corazón', sub: '당신의 마음', note: '사랑은 결국 마음으로 완성된다는 메시지를 담은 곡입니다.' },
        { title: 'Tamboriles', sub: '북소리', note: '‘탐보릴레스’는 남미 전통 북을 의미합니다. 리듬 속에는 아프리카 문화와 아르헨티나 문화가 함께 녹아 있습니다.' },
      ],
    },
    {
      id: 'part2',
      label: 'PART II',
      orchestra: 'Tango Bardo',
      introTitle: '상실을 지나, 다시 삶으로',
      intro: [
        '탱고는 단순히 춤추기 위한 음악이 아닙니다. 아르헨티나 사람들은 탱고를 "슬픔을 견디는 방법"이라고 말합니다. 사랑하는 사람과의 이별, 지나간 청춘, 이루지 못한 꿈까지… 탱고는 삶의 아픔을 음악으로 품어내고, 결국 다시 살아갈 힘을 건네줍니다.',
        '2부는 상실에서 시작해 갈등과 그리움을 지나, 추억을 품고 다시 앞으로 나아가는 여정을 들려드립니다.',
      ],
      pieces: [
        { title: 'La Noche Que Te Fuiste', sub: '당신이 떠난 밤', note: '당신이 떠난 그날 밤의 적막함을 노래하는 곡입니다.' },
        { title: 'El Puntazo', sub: '결정적인 한 방', note: '‘한 번의 찌름’, ‘결정적인 일격’이라는 뜻을 가진 제목처럼 강렬한 리듬이 특징인 곡입니다.' },
        { title: 'Cristal', sub: '수정', note: '‘수정처럼 투명하지만 쉽게 깨질 수 있는 마음’을 비유한 곡으로, 사랑의 아름다움과 연약함을 동시에 표현합니다.' },
        { title: 'Derecho Viejo', sub: '옛 방식', note: '1916년 에두아르도 아롤라스(Eduardo Arolas)가 작곡한 초기 탱고의 대표작입니다. ‘탱고의 호랑이(El Tigre del Bandoneón)’라 불렸던 그는 반도네온 연주의 혁신가였으며, 이 작품에는 초창기 탱고의 특징이 담겨 있습니다.' },
        { title: 'Déjame', sub: '나를 놓아주세요', note: '사랑을 붙잡기보다 이제는 놓아주어야 하는 순간을 노래합니다.' },
        { title: 'Oigo Tu Voz', sub: '당신의 목소리가 들려요', note: '사람은 떠났지만 기억 속 목소리는 여전히 귓가에 남아 있습니다. 실제 목소리가 아니라 마음속에 남은 기억을 노래하는 곡입니다.' },
        { title: 'Patético', sub: '비장한 사랑', note: '‘Patético’는 ‘비장한’, ‘가슴을 울리는’이라는 뜻입니다. 절제된 시작에서 격렬한 전개로 이어지는 곡으로, 사랑과 절망이 교차하는 순간을 표현합니다.' },
        { title: 'Evaristo Carriego', sub: '에바리스토 카리에고', note: '에바리스토 카리에고는 20세기 초 아르헨티나의 시인으로, 부에노스아이레스 서민들의 삶과 골목 풍경을 노래했습니다. 그의 작품은 훗날 작가 호르헤 루이스 보르헤스에게도 영향을 주었습니다. 이 곡은 그를 추모하는 헌정곡이며, 오래된 부에노스아이레스의 정서를 담고 있습니다.' },
        { title: 'Amarras', sub: '닻줄', note: '‘Amarras’는 배를 항구에 묶는 닻줄을 뜻합니다. 떠나려는 사람을 붙잡고 싶은 마음, 혹은 떠날 수 없는 마음을 상징하는 제목입니다.' },
        { title: 'Remembranzas', sub: '추억', note: '1934년에 발표된 탱고의 고전으로, 제목 그대로 ‘지나간 시간에 대한 회상’을 의미합니다. 수많은 오케스트라가 연주해 온 곡으로, 지나간 사람과 순간을 떠올리게 합니다.' },
        { title: 'Humillación', sub: '굴욕', note: '사랑 앞에서 느끼는 자존심의 상처와 후회를 담은 곡입니다. 화려한 사랑뿐 아니라 인간의 약한 면까지 다룹니다.' },
        { title: 'Porque Yo Te Amo', sub: '나는 당신을 사랑하니까', note: '모든 갈등과 상처를 지나 결국 남는 것은 사랑이라는 메시지를 담은 곡입니다.' },
        { title: 'No Mientas', sub: '거짓말하지 마세요', note: '이 곡은 사랑하는 사람에게 "이제는 거짓말하지 말아 달라"고 말하는 고백을 담고 있습니다.' },
      ],
    },
  ],
  closingTitle: '공연을 마치며',
  closing: [
    '1부가 사랑이 시작되는 순간을 노래했다면, 2부는 사랑 이후의 삶을 이야기합니다. 탱고는 행복한 순간보다 상실과 그리움을 더 자주 노래하지만, 그 끝은 언제나 절망이 아닙니다. 음악은 우리에게 아픔을 견디는 법을 가르치고, 춤은 다시 앞으로 나아갈 용기를 전합니다.',
    '오늘 들려드린 탱고의 선율이 여러분 각자의 추억과 만나 오래도록 마음속에 남기를 바랍니다.',
  ],
  castTitle: '출연',
  cast: [
    { role: '연주', names: '탱고 바르도 · 미스테리오사 부에노스 아이레스' },
    { role: '댄서', names: '나디아 & 에릭 · 런던홍 & 솔 · 팀 류 · 하리 & 시온 · 빅토르 & 루이' },
    { role: '사회·보컬', names: '세레나' },
  ],
};

export const PROGRAM_EN: ProgramNote = {
  pageTitle: 'Program Note',
  subtitle: 'Tanggo! Buenos Aires in Chuncheon',
  subtitleRoman: '탱고! 부에노스아이레스',
  parts: [
    {
      id: 'part1',
      label: 'PART I',
      orchestra: 'Misteriosa Buenos Aires',
      introTitle: 'Love, the City, and Tango',
      intro: [
        'Tango is often called ‘the dance of love,’ but at heart it is music that sings of people’s lives. Born in the ports and back streets of Buenos Aires at the end of the nineteenth century, tango grew out of the loneliness of immigrants — their loves, joys, partings, and their hope to live on.',
        'In Part I, the music follows love as it begins, moves through life in the city, endures farewell, and finally embraces life once more as a celebration.',
      ],
      pieces: [
        { title: 'Siempre Tú', sub: 'Always You', note: 'A song of confession: ‘you are always in my heart.’' },
        { title: 'El Marne', sub: 'The Marne', note: 'The Marne is a place in France. Written in the era when European culture was flowing into Argentina, this piece shows tango growing beyond dance music into a cosmopolitan urban culture.' },
        { title: 'Historia de un Amor', sub: 'The Story of a Love', note: 'Written in 1955 by the Panamanian composer Carlos Almarán in memory of his brother’s wife, who had passed away. Featured in film, it became a beloved song around the world, sung again by Luis Miguel, Andrea Bocelli, and many others. The lyrics tell that "since you left, the world means nothing."' },
        { title: 'Hasta Siempre Amor', sub: 'Farewell Forever, My Love', note: 'A song that wishes for love to remain eternal even in the face of parting.' },
        { title: 'El Ingeniero', sub: 'The Engineer', note: 'True to its title, a tango that paints the life of city dwellers — a portrait of Buenos Aires in its industrializing years.' },
        { title: 'Yo No Sé Qué Me Han Hecho Tus Ojos', sub: 'I Don’t Know What Your Eyes Have Done to Me', note: 'A signature piece of the early 1930s. "The moment I saw your eyes, I was no longer who I had been." As the title says, it sings of a love captured by a single gaze.' },
        { title: 'Capullo de Miel', sub: 'Honey Blossom', note: 'A song that likens first love to a bud just beginning to open.' },
        { title: 'Invierno', sub: 'Winter', note: 'Argentina’s winter falls opposite to Korea’s. Rather than describing a cold season, the piece expresses the quiet hours we meet in life.' },
        { title: 'Gallo Ciego', sub: 'Blind Rooster', note: 'A rhythmic tango dancers love to dance. The title is said to evoke a fighting rooster that cannot see.' },
        { title: 'Como Dos Extraños', sub: 'Like Two Strangers', note: 'Two people who once loved each other more than anyone meet again after the years — and now look at each other like strangers.' },
        { title: 'Corralera', sub: 'Corralera', note: 'A tango marked by fast, dynamic rhythm.' },
        { title: 'Tu Corazón', sub: 'Your Heart', note: 'A song with the message that love is completed by the heart.' },
        { title: 'Tamboriles', sub: 'Drums', note: '‘Tamboriles’ are traditional South American drums. In its rhythm, African and Argentine cultures beat together.' },
      ],
    },
    {
      id: 'part2',
      label: 'PART II',
      orchestra: 'Tango Bardo',
      introTitle: 'Through Loss, Back to Life',
      intro: [
        'Tango is not merely music for dancing. Argentines call it "a way of enduring sorrow." Parting from someone you love, youth gone by, dreams unfulfilled — tango holds life’s pain in music, and in the end hands us the strength to live again.',
        'Part II begins in loss, passes through conflict and longing, and tells of a journey that carries its memories forward.',
      ],
      pieces: [
        { title: 'La Noche Que Te Fuiste', sub: 'The Night You Left', note: 'A song of the stillness of the night you left.' },
        { title: 'El Puntazo', sub: 'The Decisive Blow', note: 'True to a title meaning ‘a single thrust, a decisive strike,’ a piece marked by fierce rhythm.' },
        { title: 'Cristal', sub: 'Crystal', note: 'A metaphor for a heart ‘clear as crystal, and just as easily broken’ — expressing at once the beauty and the fragility of love.' },
        { title: 'Derecho Viejo', sub: 'The Old Way', note: 'A landmark of early tango composed in 1916 by Eduardo Arolas. Called ‘the Tiger of the Bandoneón’ (El Tigre del Bandoneón), he was an innovator of the instrument, and the piece carries the character of tango’s earliest years.' },
        { title: 'Déjame', sub: 'Let Me Go', note: 'A song for the moment when love must be released rather than held.' },
        { title: 'Oigo Tu Voz', sub: 'I Hear Your Voice', note: 'The person is gone, yet the voice remains in memory’s ear — a song not of a real voice but of a remembered one.' },
        { title: 'Patético', sub: 'Pathétique', note: '‘Patético’ means solemn, heart-rending. From a restrained opening to an intense unfolding, it expresses the crossing of love and despair.' },
        { title: 'Evaristo Carriego', sub: 'Evaristo Carriego', note: 'Evaristo Carriego was an Argentine poet of the early twentieth century who sang of working-class lives and neighborhood streets of Buenos Aires; his work later influenced Jorge Luis Borges. The piece is a tribute to him, carrying the mood of old Buenos Aires.' },
        { title: 'Amarras', sub: 'Moorings', note: '‘Amarras’ are the ropes that moor a ship to harbor — a title that stands for wanting to hold back the one who is leaving, or being unable to leave.' },
        { title: 'Remembranzas', sub: 'Remembrances', note: 'A tango classic first heard in 1934; its title means recollection of time gone by. Played by countless orchestras, it calls back people and moments now past.' },
        { title: 'Humillación', sub: 'Humiliation', note: 'A song of the wounded pride and regret we feel before love — tango deals not only with love’s splendor but with human weakness.' },
        { title: 'Porque Yo Te Amo', sub: 'Because I Love You', note: 'A song with the message that past every conflict and wound, what remains is love.' },
        { title: 'No Mientas', sub: 'Don’t Lie', note: 'A confession to a loved one: "no more lies."' },
      ],
    },
  ],
  closingTitle: 'In Closing',
  closing: [
    'Where Part I sang of love’s beginning, Part II tells of life after love. Tango sings more often of loss and longing than of happiness, yet it never ends in despair. The music teaches us how to bear pain; the dance hands us the courage to move forward again.',
    'May the melodies of tango you heard tonight meet your own memories, and remain in your heart for a long time to come.',
  ],
  castTitle: 'Cast',
  cast: [
    { role: 'Orchestras', names: 'Tango Bardo · Orquesta Típica Misteriosa Buenos Aires' },
    { role: 'Dancers', names: 'Nadia & Erik · London Hong & Sol · Team Ryu · Hari & Xion · Victor & Rui' },
    { role: 'MC · Vocal', names: 'Serena' },
  ],
};
