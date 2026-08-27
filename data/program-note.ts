// Program Note — 탱고! 부에노스아이레스 in Chuncheon
// 출처: 운영/공연_프로그램노트_원본.docx (조앤-예술감독 → 한동연 차장 전달본)
// ⚠️ 회차·날짜·장소·티켓 정보를 이 페이지에 넣지 말 것 (10/2·10/3 공용 QR 페이지 — 대표 확정 2026-08-26)
// 수정 2건(대표 지시 '오류 조사' 반영): Yo No Sé…: 1920년대→1930년대 초 / Remembranzas: 1920년대→1934년
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
        { title: 'Siempre Tú', sub: '언제나 당신', note: '오프닝을 여는 이 노래는 ‘당신은 언제나 내 마음속에 있다’는 고백을 담은 작품입니다. 절제된 선율 속에서도 깊은 애정을 느낄 수 있으며, 공연의 첫 문을 여는 프롤로그와 같은 역할을 합니다.' },
        { title: 'El Marne', sub: '엘 마르네', note: '‘마른(Marne)’은 프랑스의 지명입니다. 유럽의 문화가 아르헨티나로 전해지던 시기에 만들어진 작품으로, 탱고가 단순한 춤 음악을 넘어 국제적인 도시 문화로 성장하던 시대를 보여줍니다.' },
        { title: 'Historia de un Amor', sub: '어느 사랑 이야기', note: '1955년 파나마의 작곡가 카를로스 알마란(Carlos Almarán)이 세상을 떠난 형수의 죽음을 추모하며 만든 곡입니다. 이후 영화에 사용되며 전 세계적인 명곡이 되었고, 루이스 미겔, 안드레아 보첼리 등 수많은 가수들이 다시 불렀습니다. 가사는 "당신이 떠난 뒤 세상은 아무 의미가 없다"는 절절한 사랑을 노래합니다.' },
        { title: 'Hasta Siempre Amor', sub: '영원한 사랑이여', note: '헤어짐 앞에서도 사랑만은 영원하기를 바라는 마음을 담은 작품입니다. 화려하기보다 담담한 선율이 오히려 깊은 여운을 남기는 곡입니다.' },
        { title: 'El Ingeniero', sub: '기술자', note: '‘기술자’라는 독특한 제목처럼 도시인의 삶을 유쾌하게 그린 탱고입니다. 산업화가 진행되던 부에노스아이레스의 활기와 리듬을 엿볼 수 있으며, 탱고가 일상의 풍경까지 음악으로 담아냈음을 보여줍니다.' },
        { title: 'Yo No Sé Qué Me Han Hecho Tus Ojos', sub: '당신의 눈이 내게 무슨 마법을 걸었는지', note: '1930년대 초를 대표하는 명곡입니다. "당신의 눈을 본 순간 나는 이전의 내가 아니었다." 제목 그대로 한 사람의 눈빛에 사로잡힌 사랑을 노래하며, 탱고 특유의 낭만을 가장 잘 보여주는 작품 가운데 하나입니다.' },
        { title: 'Capullo de Miel', sub: '달콤한 꽃봉오리', note: '막 피어나기 시작한 꽃봉오리에 첫사랑을 비유한 작품입니다. 사랑이 가장 아름답고 순수했던 순간을 따뜻하게 그려내며, 부드러운 멜로디가 인상적입니다.' },
        { title: 'Invierno', sub: '겨울', note: '아르헨티나의 겨울은 우리의 겨울과 계절이 반대입니다. 이 곡은 차가운 계절을 묘사하기보다 인생에서 누구나 마주하는 고요한 시간을 표현합니다. 잠시 숨을 고르며 음악 그 자체에 귀를 기울여 보시기 바랍니다.' },
        { title: 'Gallo Ciego', sub: '눈먼 수탉', note: '탱고 무용수들이 특히 사랑하는 대표적인 리듬 탱고입니다. 긴장감 넘치는 리듬과 강렬한 에너지가 특징이며, 제목은 앞을 보지 못한 채 싸우는 수탉을 비유적으로 표현한 것으로 알려져 있습니다.' },
        { title: 'Como Dos Extraños', sub: '낯선 두 사람처럼', note: '한때 누구보다 사랑했던 두 사람이 시간이 흘러 다시 만났지만, 이제는 서로를 낯선 사람처럼 바라보게 되는 순간을 노래합니다. 아르헨티나 탱고 역사에서 가장 아름다운 이별 노래 가운데 하나로 손꼽힙니다.' },
        { title: 'Corralera', sub: '코랄레라', note: '힘찬 리듬과 역동적인 에너지가 돋보이는 작품입니다. 공연의 분위기를 다시 끌어올리며 마지막 축제를 향해 나아가는 전환점이 됩니다.' },
        { title: 'Tu Corazón', sub: '당신의 마음', note: '사랑은 결국 마음으로 완성된다는 메시지를 담은 작품입니다. 화려한 기교보다 따뜻한 감성이 중심이 되는 곡으로, 공연 후반의 감정을 부드럽게 이어 줍니다.' },
        { title: 'Tamboriles', sub: '북소리', note: '‘탐보릴레스’는 남미 전통 북을 의미합니다. 강렬한 리듬 속에는 아프리카 문화와 아르헨티나 문화가 함께 녹아 있습니다.' },
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
        { title: 'La Noche Que Te Fuiste', sub: '당신이 떠난 밤', note: '당신이 떠난 그날 밤의 적막함을 노래하는 작품입니다. 화려한 기교보다 절제된 선율이 깊은 여운을 남기며, 2부의 문을 여는 프롤로그가 됩니다.' },
        { title: 'El Puntazo', sub: '결정적인 한 방', note: '‘한 번의 찌름’, ‘결정적인 일격’이라는 뜻을 가진 제목처럼, 강렬한 리듬과 날카로운 에너지가 인상적인 곡입니다. 탱고 특유의 긴장감과 박진감을 가장 잘 보여주는 레퍼토리 가운데 하나입니다.' },
        { title: 'Cristal', sub: '수정', note: '‘수정처럼 투명하지만 쉽게 깨질 수 있는 마음’을 비유한 곡입니다. 사랑의 아름다움과 연약함을 동시에 표현하는 서정적인 탱고로 많은 사랑을 받아왔습니다.' },
        { title: 'Derecho Viejo', sub: '옛 방식', note: '1916년 에두아르도 아롤라스(Eduardo Arolas)가 작곡한 초기 탱고의 대표작입니다. ‘탱고의 호랑이(El Tigre del Bandoneón)’라 불렸던 그는 반도네온 연주의 혁신가였으며, 이 작품에는 초창기 탱고 특유의 거칠고 힘찬 에너지가 살아 있습니다.' },
        { title: 'Déjame', sub: '나를 놓아주세요', note: '사랑을 붙잡기보다 이제는 놓아주어야 하는 순간을 노래합니다. 담담한 멜로디 속에 이별의 아픔이 스며 있는 작품입니다.' },
        { title: 'Oigo Tu Voz', sub: '당신의 목소리가 들려요', note: '사람은 떠났지만 기억 속 목소리는 여전히 귓가에 남아 있습니다. 실제 목소리가 아니라 마음속에 남은 기억을 노래하는 곡으로, 많은 탱고 애호가들이 사랑하는 서정적인 작품입니다.' },
        { title: 'Patético', sub: '비장한 사랑', note: '‘Patético’는 ‘비장한’, ‘가슴을 울리는’이라는 뜻입니다. 절제된 시작에서 폭발적인 감정으로 이어지는 전개 덕분에 무용수들에게도 매우 사랑받는 작품입니다. 사랑과 절망이 교차하는 극적인 순간을 표현합니다.' },
        { title: 'Evaristo Carriego', sub: '에바리스토 카리에고', note: '에바리스토 카리에고는 20세기 초 아르헨티나의 시인으로, 부에노스아이레스 서민들의 삶과 골목 풍경을 따뜻하게 노래했습니다. 그의 작품은 훗날 작가 호르헤 루이스 보르헤스에게도 큰 영향을 주었습니다. 이 곡은 한 사람을 추모하는 헌정곡이면서, 동시에 오래된 부에노스아이레스의 향수를 담고 있습니다.' },
        { title: 'Amarras', sub: '닻줄', note: '‘Amarras’는 배를 항구에 묶는 닻줄을 뜻합니다. 떠나려는 사람을 붙잡고 싶은 마음, 혹은 떠날 수 없는 마음을 상징하는 제목입니다. 잔잔하지만 깊은 울림을 전하는 작품입니다.' },
        { title: 'Remembranzas', sub: '추억', note: '1934년에 발표된 탱고의 고전으로, 제목 그대로 ‘지나간 시간에 대한 회상’을 의미합니다. 수많은 오케스트라가 연주해 온 명곡으로, 시간이 흘러도 잊히지 않는 사람과 순간을 아름답게 떠올리게 합니다.' },
        { title: 'Humillación', sub: '굴욕', note: '사랑 앞에서 누구나 한 번쯤 느껴본 자존심의 상처와 후회를 담은 작품입니다. 탱고는 화려한 사랑뿐 아니라 인간의 약함까지도 솔직하게 노래합니다.' },
        { title: 'Porque Yo Te Amo', sub: '나는 당신을 사랑하니까', note: '모든 갈등과 상처를 지나 결국 남는 것은 사랑이라는 메시지를 담은 곡입니다. 담백하면서도 진심 어린 선율이 관객의 마음을 따뜻하게 감싸줍니다.' },
        { title: 'No Mientas', sub: '거짓말하지 마세요', note: '공연의 마지막을 장식하는 이 곡은 사랑하는 사람에게 "이제는 거짓말하지 말아 달라"고 말하는 진솔한 고백입니다. 때로는 진실을 마주하는 용기가 새로운 시작이 되기도 합니다.' },
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
        { title: 'Siempre Tú', sub: 'Always You', note: 'The opening song is a confession: ‘you are always in my heart.’ Even within its restrained melody you can feel a deep affection — a prologue that opens the first door of the evening.' },
        { title: 'El Marne', sub: 'The Marne', note: 'The Marne is a place in France. Written in the era when European culture was flowing into Argentina, this piece shows tango growing beyond dance music into a cosmopolitan urban culture.' },
        { title: 'Historia de un Amor', sub: 'The Story of a Love', note: 'Written in 1955 by the Panamanian composer Carlos Almarán in memory of his brother’s wife, who had passed away. Featured in film, it became a beloved song around the world, sung again by Luis Miguel, Andrea Bocelli, and many others. The lyrics mourn that "since you left, the world means nothing."' },
        { title: 'Hasta Siempre Amor', sub: 'Farewell Forever, My Love', note: 'A piece that wishes for love to remain eternal even in the face of parting. Its plain, unadorned melody leaves a resonance deeper than any flourish.' },
        { title: 'El Ingeniero', sub: 'The Engineer', note: 'True to its unusual title, this tango paints city life with good humor. You can glimpse the energy and rhythm of an industrializing Buenos Aires — proof that tango turned even everyday scenes into music.' },
        { title: 'Yo No Sé Qué Me Han Hecho Tus Ojos', sub: 'I Don’t Know What Your Eyes Have Done to Me', note: 'A gem of the early 1930s. "The moment I saw your eyes, I was no longer who I had been." As the title says, it sings of a love captured by a single gaze — one of the finest examples of tango’s romance.' },
        { title: 'Capullo de Miel', sub: 'Honey Blossom', note: 'A piece that likens first love to a bud just beginning to open. It warmly captures love at its most beautiful and innocent, carried by a gentle, memorable melody.' },
        { title: 'Invierno', sub: 'Winter', note: 'Argentina’s winter falls opposite to ours. Rather than describing a cold season, the piece expresses the quiet hours every life must pass through. Take a breath, and listen to the music itself.' },
        { title: 'Gallo Ciego', sub: 'Blind Rooster', note: 'A signature rhythmic tango, especially loved by dancers. It is marked by taut rhythm and fierce energy; the title is said to evoke a fighting rooster that cannot see.' },
        { title: 'Como Dos Extraños', sub: 'Like Two Strangers', note: 'Two people who once loved each other more than anyone meet again after the years — and now look at each other like strangers. It is counted among the most beautiful farewell songs in Argentine tango.' },
        { title: 'Corralera', sub: 'Corralera', note: 'A work of driving rhythm and dynamic energy. It lifts the evening once more and becomes the turning point toward the final celebration.' },
        { title: 'Tu Corazón', sub: 'Your Heart', note: 'Its message: love is completed not by virtuosity but by the heart. Warm feeling takes the place of display, gently carrying the emotion of the concert’s latter half.' },
        { title: 'Tamboriles', sub: 'Drums', note: '‘Tamboriles’ are traditional South American drums. Within its powerful rhythm, African and Argentine cultures beat together.' },
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
        { title: 'La Noche Que Te Fuiste', sub: 'The Night You Left', note: 'A song of the stillness of the night you left. Restraint, not display, gives it a lasting resonance — the prologue that opens Part II.' },
        { title: 'El Puntazo', sub: 'The Decisive Blow', note: 'True to a title that means ‘a single thrust, a decisive strike,’ the piece is striking for its fierce rhythm and sharpened energy — among the repertoire’s best displays of tango’s tension and drive.' },
        { title: 'Cristal', sub: 'Crystal', note: 'A metaphor for a heart ‘clear as crystal, and just as easily broken.’ A lyrical tango long cherished for expressing at once the beauty and the fragility of love.' },
        { title: 'Derecho Viejo', sub: 'The Old Way', note: 'A landmark of early tango composed in 1916 by Eduardo Arolas. Called ‘the Tiger of the Bandoneón’ (El Tigre del Bandoneón), Arolas was an innovator of the instrument, and this work keeps alive the rough, muscular energy of tango’s first years.' },
        { title: 'Déjame', sub: 'Let Me Go', note: 'A song for the moment when love must be released rather than held. Beneath its quiet melody runs the ache of parting.' },
        { title: 'Oigo Tu Voz', sub: 'I Hear Your Voice', note: 'The person is gone, yet the voice remains in memory’s ear. It is not a real voice but a remembered one that this song sings — a lyrical favorite of tango lovers.' },
        { title: 'Patético', sub: 'Pathétique', note: '‘Patético’ means solemn, heart-rending. From a restrained opening it builds to an emotional outpouring — a favorite of dancers — expressing the dramatic crossing of love and despair.' },
        { title: 'Evaristo Carriego', sub: 'Evaristo Carriego', note: 'Evaristo Carriego was an Argentine poet of the early twentieth century who sang warmly of working-class lives and neighborhood streets of Buenos Aires; his work later left a deep mark on Jorge Luis Borges. The piece is at once a tribute to one man and a vessel of nostalgia for old Buenos Aires.' },
        { title: 'Amarras', sub: 'Moorings', note: '‘Amarras’ are the ropes that moor a ship to harbor — a symbol of wanting to hold back the one who is leaving, or of being unable to leave. Quiet, yet deeply moving.' },
        { title: 'Remembranzas', sub: 'Remembrances', note: 'A tango classic first heard in 1934, its title means just what it says: recollection of time gone by. Played by countless orchestras, it beautifully summons the people and moments that time cannot erase.' },
        { title: 'Humillación', sub: 'Humiliation', note: 'A work about the wounded pride and regret everyone has known before love. Tango sings honestly not only of love’s splendor but of human weakness.' },
        { title: 'Porque Yo Te Amo', sub: 'Because I Love You', note: 'Its message: past every conflict and wound, what remains is love. A plain, sincere melody that wraps the listener’s heart in warmth.' },
        { title: 'No Mientas', sub: 'Don’t Lie', note: 'Closing the concert, this song is an honest plea to a loved one: "no more lies." Sometimes the courage to face the truth becomes a new beginning.' },
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
