import { DiscountType, UserRole } from "@prisma/client";

export const categories = [
  { name: 'Класична література' }, //7
  { name: 'Фентезі ' }, //10
  { name: 'Трилери та жахи' }, //6
  { name: 'Детективи' }, //8
  { name: 'Історичне та пригодницьке' }, //8
  { name: 'Наук-поп'}, //13
  { name: 'Бізнес-література' }, //15
];

export const authors = [
  {
    firstName: "Стівен",
    lastName: "Кінг",
    bio: "Стівен Кінг – один із найвідоміших сучасних письменників, якого називають 'королем жахів'. Його творчість охоплює широкий спектр жанрів – від хорору та трилерів до драм і фантастики. Романи Кінга, як-от 'Сяйво', 'Воно', 'Кладовище домашніх тварин', стали класикою світової літератури, а їхні адаптації часто з'являються на великих екранах.",
  },
  {
    firstName: "Агата",
    lastName: "Крісті",
    bio: "Аґата Крісті – неперевершена королева детективу, чиї твори стали класикою жанру і підкорили серця мільйонів читачів у всьому світі. Її романи наповнені заплутаними загадками, несподіваними поворотами та атмосферою справжнього британського шарму. Крісті створила легендарних детективів – Еркюля Пуаро та міс Марпл, які досі залишаються улюбленцями шанувальників літературних розслідувань. Кожна її книга – це інтелектуальна гра, де читач має шанс відчути себе справжнім детективом, намагаючись розгадати таємницю разом із головними героями.",
  },
  {
    firstName: "Стівен",
    lastName: "Гокінґ",
    bio: null,
  },
  {
    firstName: "Ґреґ",
    lastName: "Маккеон",
    bio: null,
  },
  {
    firstName: "Юрій",
    lastName: "Андрухович",
    bio: null,
  },
  {
    firstName: "Іван",
    lastName: "Багряний",
    bio: 'Іван Багряний — автор романів «Сад Гетсиманський» і «Тигролови». В’язень сталінських таборів, емігрант й один з найгостріших публіцистів ХХ століття.',
  },
  {
    firstName: "Валер'ян",
    lastName: "Підмогильний",
    bio: null,
  },

  //ХОРРОР
    {
    firstName: "Тесс",
    lastName: "Ґеррітсен",
    bio: 'Тесс Ґеррітсен — американська письменниця китайського походження, яка народилася 12 червня 1953 року в Сан-Дієго, Каліфорнія. Вона здобула ступінь бакалавра антропології в Стенфордському університеті, а згодом — медичну освіту в Каліфорнійському університеті в Сан-Франциско. ',
  },

]

export const publishers = [
  {
    id: 1,
    name: "Kyiv Publishing",
    description: "Видавництво з Києва, що спеціалізується на художній літературі.",
    email: "contact@kyivpublishing.ua",
    phone: "+380441234567",
    country: "Україна",
    foundedAt: new Date("1990-05-10T00:00:00Z"),
  },
  {
    id: 2,
    name: "Видавництво Старого Лева",
    description: "Одне з найвідоміших сучасних українських видавництв. Випускає художню, дитячу й нон-фікшн літературу.",
    email: "info@starylev.com.ua",
    phone: "+380322421010",
    country: "Україна",
    foundedAt: new Date("2001-12-01T00:00:00Z"),
  },
  {
    id: 3,
    name: "А-Ба-Ба-Га-Ла-Ма-Га",
    description: "Легендарне видавництво, засноване Іваном Малковичем. Спеціалізується на дитячих книжках, класиці та поезії.",
    email: "contact@ababahalamaha.com.ua",
    phone: "+380442221234",
    country: "Україна",
    foundedAt: new Date("1992-01-01T00:00:00Z"),
  },
  {
    id: 4,
    name: "Vivat",
    description: "Велике українське видавництво, що випускає художню, дитячу та науково-популярну літературу.",
    email: "office@vivat.com.ua",
    phone: "+380577770707",
    country: "Україна",
    foundedAt: new Date("2013-01-01T00:00:00Z"),
  },
];

export const books = [
  //агата крісті. id 2
  {
    title: 'Велика четвірка',
    authorId: 2,
    publisherId: 1,
    categoryId: 4,
    pages: 202,
    discount: DiscountType.SMALL10,
    readingAge: '10+',
    dimensions: '12x18 см',
    coverUrl: 'https://ksd.ua/storage/products/gallery/medium_x2/HclG6VwvLFEQ6R3tpVej4QkdiEUnsK59uGW81kn9.png.webp?v=1750748313',
    summary: 'Капітан Гастінґс повертається до Англії і дізнається, що його давній друг, Еркюль Пуаро, опинився в самому центрі заплутаної і смертельно небезпечної міжнародної інтриги. Після раптової смерті загадкового відвідувача вони довідуються про існування Великої четвірки - потужної та безжальної організації, що маніпулює подіями на глобальному рівні.'
  },
  {
    title: 'Кіт серед голубів',
    authorId: 2,
    publisherId: 1,
    categoryId: 4,
    discount: DiscountType.SMALL5,
    pages: 240,
    readingAge: '10+',
    dimensions: '12x18 см',
    coverUrl: 'https://ksd.ua/storage/products/gallery/medium_x2/yZW76rJP6HI3JtDCByG4YMgpDaoCfxMxjrs3rMtt.jpg.webp?v=1747731144',
    summary: 'В елітній школі для дівчаток посеред ночі стається непередбачуване - вбито вчительку фізкультури. Її недолюблювали, але хто б наважився на постріл упритул? І головне - навіщо? Інспектор поліції береться за розслідування і робить приголомшливе відкриття: серед працівників школи затесався агент британської розвідки. Його місія - знайти коштовності, що безслідно зникли під час революції в східному королівстві.'
  },
  {
    title: 'Годинники',
    authorId: 2,
    publisherId: 1,
    categoryId: 4,
    pages: 400,
    readingAge: '10+',
    dimensions: '12x18 см',
    coverUrl: 'https://ksd.ua/storage/products/gallery/medium_x2/KtOM2050G6Hz0LJD9p65nnL2NAPmTT4umz4ZeSxb.jpg.webp?v=1733319314',
    summary: 'Стенографістка Шейла Веб приходить на зустріч до поважної сліпої пані. Проте у вітальні її зустрічає не господиня - натомість вона натрапляє на мертве тіло… Ніхто не знає, ким був цей чоловік і звідки він узявся. Навіщо вбивця розклав довкола жертви кілька годинників і що означає час на них? Колін Лемб, який волею долі виявився залученим до розслідування, не знаходить відповідей. Тому звертається по допомогу до Еркюля Пуаро.'
  },

  //стівен гокінг. id 3
  {
    title: 'Про Всесвіт коротко',
    authorId: 3,
    publisherId: 2,
    categoryId: 6,
    pages: 192,
    readingAge: '16+',
    dimensions: '15x22 см',
    coverUrl: 'https://ksd.ua/storage/products/gallery/expanded_x2/WSKTO9t2QIDOAEgS7iTrPKpUnbDzZIABmnqrz545.jpg.webp?v=1733321312',
    summary: 'Стівен Гокінґ - прославлений англійський учений, чи не найвідоміших популяризатор науки у світі, людина-легенда. Його вважають одним з найгеніальніших фізиків від часів Ейнштейна. Найбільшу популярність здобув завдяки дослідженню чорних дір і теорії виникнення Всесвіту в результаті Великого вибуху. Автор бестселерів "Найкоротша історія часу", "Великий задум" та "Чорні діри і молоді всесвіти", володар численних нагород та премій.'
  },

  //грег маккеон. id 4
  {
    title: 'Планер есенціаліста на 90 днів',
    authorId: 4,
    publisherId: 3,
    categoryId: 7,
    pages: 224,
    discount: DiscountType.MEDIUM15,
    readingAge: '16+',
    dimensions: '15x22 см',
    coverUrl: 'https://ksd.ua/storage/products/gallery/medium_x2/dU2dEMmiZH6i1K2ILAel0unI2OBO3rElWuQeUXcP.jpg.webp?v=1741003613',
    summary: 'Стівен Гокінґ - прославлений англійський учений, чи не найвідоміших популяризатор науки у світі, людина-легенда. Його вважають одним з найгеніальніших фізиків від часів Ейнштейна. Найбільшу популярність здобув завдяки дослідженню чорних дір і теорії виникнення Всесвіту в результаті Великого вибуху. Автор бестселерів "Найкоротша історія часу", "Великий задум" та "Чорні діри і молоді всесвіти", володар численних нагород та премій.'
  },
  {
    title: 'Листи в Україну',
    authorId: 5,
    publisherId: 3,
    categoryId: 1,
    pages: 256,
    readingAge: '10+',
    dimensions: '125x165 мм',
    coverUrl: 'https://ksd.ua/storage/products/gallery/medium_x2/6cMXAC274LlKBicDL3040XDBVKFFNDTdc8S8x2wF.jpg.webp?v=1733324523',
    summary: 'До книжки Юрія Андруховича (1960) — найкультовішого сучасного українського письменника-постмодерніста і Патріарха «Бу-Ба-Бу» — увійшли «канонічні» вірші з усіх його збірок, а також знаменитий цикл «Листи в Україну». Це найповніше на сьогодні вибране поета.'
  },
  {
    title: 'Сад Гетсиманський',
    authorId: 6,
    publisherId: 4,
    categoryId: 1,
    pages: 632,
    discount: DiscountType.MEDIUM25,
    readingAge: '16+',
    dimensions: '125x165 мм',
    coverUrl: 'https://ksd.ua/storage/products/gallery/medium_x2/Fug4NaJvs1IufyAYROqsppo9xxSa1dWeT84yTW6K.jpg.webp?v=1733321579',
    summary: '«Ліпше поламати ребра ста невинним, аніж пропустити одного винного» — таким було гасло епохи, в якій жили мільйони українців 1930-х, і саме цей трагічний досвід у своєму романі «Сад Гетсиманський» зображає Іван Багряний. '
  },
  {
    title: 'Тигролови',
    authorId: 6,
    publisherId: 4,
    categoryId: 1,
    pages: 360,
    readingAge: '16+',
    dimensions: '125x165 мм',
    coverUrl: 'https://ksd.ua/storage/products/gallery/expanded_x2/rIMGJLM7iRHNDgvwI5GuNJgYJ5EFdodZjA3vPErF.jpg.webp?v=1750766226',
    summary: '«Ліпше поламати ребра ста невинним, аніж пропустити одного винного» — таким було гасло епохи, в якій жили мільйони українців 1930-х, і саме цей трагічний досвід у своєму романі «Сад Гетсиманський» зображає Іван Багряний. '
  },

  //ХОРРОР
  {
    title: 'Команда скелетів',
    authorId: 1,
    publisherId: 4,
    categoryId: 3,
    pages: 800,
    readingAge: '16+',
    discount: DiscountType.LARGE30,
    dimensions: '125x165 мм',
    coverUrl: 'https://ksd.ua/storage/products/gallery/expanded_x2/lgANi1bAlrexZKIMjtxDhC652zc4N3qI2T1mnoWi.jpg.webp?v=1733318975',
    summary: '«Команда скелетів» - це неймовірна збірка моторошних історій, які занурять вас в атмосферу хаосу і безвиході та добряче полоскочуть нерви.'
  },
  {
    title: 'Аутсайдер',
    authorId: 1,
    publisherId: 4,
    categoryId: 3,
    pages: 592,
    readingAge: '16+',
    dimensions: '125x165 мм',
    discount: DiscountType.LARGE40,
    coverUrl: 'https://ksd.ua/storage/products/gallery/expanded_x2/sKxl2CKYyvaOisFrkWVHrc4bMNPvkAsZBPDAbmkD.jpg.webp?v=1733325101',
    summary: 'Тренер молодіжної бейсбольної команди, викладач англійської, чоловік та батько двох доньок. Усе це про Террі. Так, про таких кажуть «класний чувак», з таким усі хочуть дружити і такому не бояться позичити грошей. Так, Террі крутий. А ще — убивця.'
  },
  {
    title: 'Гості на літо',
    authorId: 8,
    publisherId: 1,
    categoryId: 3,
    pages: 369,
    readingAge: '16+',
    dimensions: '125x165 мм',
    coverUrl: 'https://ksd.ua/storage/products/gallery/expanded_x2/muQWFVE0OeJnr9fVn1nBnOwlydmRwTmWrT5VuvRn.jpg.webp?v=1746615351',
    summary: 'Колишні шпигуни - Меґґі Вілл та її друзі - вийшли на заслужений відпочинок. Тепер вони стежать не за ворогами держави, а за ластівками й дятлами, а замість зустрічей у штаб-квартирах збираються обговорювати книжки за келихом улюбленого напою.'
  },

]

export const comments = [
  {
    content: 'тестовий коментар.',
    rating: 5,
    userId: 1,
    bookId: 1
  },
  {
    content: 'тестовий коментар 2!',
    rating: 3,
    userId: 2,
    bookId: 1
  }
]

export const chats = [
  { userId: 1, adminId: 2 },
  { userId: 2, adminId: 4 },
  { userId: 3, adminId: null },
  { userId: 4, adminId: 27 },
  { userId: 5, adminId: 2 },
  { userId: 6, adminId: null },
  { userId: 7, adminId: 26 },
  { userId: 8, adminId: null },
  { userId: 9, adminId: 2 },
  { userId: 10, adminId: 4 },
  { userId: 11, adminId: null },
  { userId: 12, adminId: 27 },
  { userId: 13, adminId: 2 },
  { userId: 14, adminId: null },
  { userId: 15, adminId: 26 },
  { userId: 16, adminId: 27 },
  { userId: 17, adminId: null },
  { userId: 18, adminId: null },
];


const now = new Date();
export const messages = [
  { chatId: 1, senderId: 1, content: 'Hello from user 1 (CHAT 1)', createdAt: new Date(now.getTime() + 1000) },
  { chatId: 1, senderId: 2, content: 'Reply from admin 2', createdAt: new Date(now.getTime() + 2000) },
  { chatId: 1, senderId: 1, content: 'Another message from user 1', createdAt: new Date(now.getTime() + 3000) },
  { chatId: 1, senderId: 2, content: 'Admin 2 responds again', createdAt: new Date(now.getTime() + 4000) },

  { chatId: 2, senderId: 3, content: 'Hey from user 3 (CHAT 2)', createdAt: new Date(now.getTime() + 5000) },
  { chatId: 2, senderId: 4, content: 'Admin 4 reply', createdAt: new Date(now.getTime() + 6000) },
  { chatId: 2, senderId: 3, content: 'User 3 again', createdAt: new Date(now.getTime() + 7000) },
  { chatId: 2, senderId: 4, content: 'Admin 4 responds', createdAt: new Date(now.getTime() + 8000) }
];


export const users = [
  {
    firstName: "Тестовий",
    lastName: "Користувач",
    email: "user@gmail.com",
    password: "user123",
    role: UserRole.USER,
  },
  {
    firstName: "Анастасія",
    lastName: "Довгошия",
    email: "admin@gmail.com",
    password: "admin",
    role: UserRole.ADMIN,
  },
  {
    firstName: "Тестовий",
    lastName: "Користувач-ДВА",
    email: "user2@gmail.com",
    password: "user2",
    role: UserRole.USER,
  },
  {
    firstName: "Тестовий",
    lastName: "Адміністратор",
    email: "admin1@gmail.com",
    password: "admin1",
    role: UserRole.ADMIN,
  },

  { firstName: "Олена", lastName: "Коваленко", email: "user03@gmail.com", password: "user03", role: UserRole.USER },
  { firstName: "Іван", lastName: "Мельник", email: "user04@gmail.com", password: "user04", role: UserRole.USER },
  { firstName: "Наталія", lastName: "Бойко", email: "user05@gmail.com", password: "user05", role: UserRole.USER },
  { firstName: "Максим", lastName: "Гончар", email: "user06@gmail.com", password: "user06", role: UserRole.USER },
  { firstName: "Марина", lastName: "Родіна", email: "user07@gmail.com", password: "user07", role: UserRole.USER },
  { firstName: "Олексій", lastName: "Савченко", email: "user08@gmail.com", password: "user08", role: UserRole.USER },
  { firstName: "Софія", lastName: "Петренко", email: "user09@gmail.com", password: "user09", role: UserRole.USER },
  { firstName: "Віктор", lastName: "Кравець", email: "user10@gmail.com", password: "user10", role: UserRole.USER },
  { firstName: "Людмила", lastName: "Демченко", email: "user11@gmail.com", password: "user11", role: UserRole.USER },
  { firstName: "Роман", lastName: "Федоренко", email: "user12@gmail.com", password: "user12", role: UserRole.USER },
  { firstName: "Дарина", lastName: "Гриценко", email: "user13@gmail.com", password: "user13", role: UserRole.USER },
  { firstName: "Богдан", lastName: "Семенюк", email: "user14@gmail.com", password: "user14", role: UserRole.USER },
  { firstName: "Катерина", lastName: "Мазур", email: "user15@gmail.com", password: "user15", role: UserRole.USER },
  { firstName: "Юрій", lastName: "Лисенко", email: "user16@gmail.com", password: "user16", role: UserRole.USER },
  { firstName: "Ольга", lastName: "Кравчук", email: "user17@gmail.com", password: "user17", role: UserRole.USER },
  { firstName: "Сергій", lastName: "Онищенко", email: "user18@gmail.com", password: "user18", role: UserRole.USER },
  { firstName: "Ірина", lastName: "Марченко", email: "user19@gmail.com", password: "user19", role: UserRole.USER },
  { firstName: "Дмитро", lastName: "Коваленко", email: "user20@gmail.com", password: "user20", role: UserRole.USER },
  { firstName: "Анна", lastName: "Захаренко", email: "user21@gmail.com", password: "user21", role: UserRole.USER },
  { firstName: "Михайло", lastName: "Сидоренко", email: "user22@gmail.com", password: "user22", role: UserRole.USER },
  { firstName: "Валентина", lastName: "Тимченко", email: "user23@gmail.com", password: "user23", role: UserRole.USER },
  { firstName: "Оксана", lastName: "Поліщук", email: "admin2@gmail.com", password: "admin2", role: UserRole.ADMIN },
  { firstName: "Андрій", lastName: "Гаврилюк", email: "admin3@gmail.com", password: "admin3", role: UserRole.ADMIN },
  { firstName: "Юлія", lastName: "Данилюк", email: "admin4@gmail.com", password: "admin4", role: UserRole.ADMIN },
  { firstName: "Петро", lastName: "Жуков", email: "admin5@gmail.com", password: "admin5", role: UserRole.ADMIN },
  { firstName: "Вікторія", lastName: "Романюк", email: "admin6@gmail.com", password: "admin6", role: UserRole.ADMIN },
];
