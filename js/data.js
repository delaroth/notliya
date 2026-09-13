const SITE_DATA = {
  profile: {
    name: "ליה",
    englishName: "Liya",
    handle: "@not.liya",
    instagramUrl: "https://www.instagram.com/not.liya/",
    tiktokUrl: "https://www.tiktok.com/@not.liya",
    avatar: "images/avatar.jpg",
    bioHe: "פאנצ'ים שיכלתי לזרוק, אהבה שיכלתי לקבל, ופרישה מוקדמת מהאינטרנט העולמי.",
    bioEn: "Punchlines I could have thrown, love I could have received, and an early retirement from the global internet rat race.",
    resetStoryHe: "פעם היו מיליוני עוקבים מכל העולם. מחקתי הכל כדי לחזור לדבר פה בגובה העיניים, בלי בולשיט, עם האנשים שמבינים את השפה וההומור.",
    resetStoryEn: "Once had a massive global following. Wiped it clean to keep things real, intimate, and casual with the people who actually get the humor.",
    stats: {
      tiktokFollowers: "65.1K+",
      tiktokLikes: "3.4M+",
      igFollowers: "23K+",
      tolerance: "0%"
    }
  },

  // Mood Check-in data for Community
  moods: [
    {
      id: "caffeinated_panic",
      icon: "☕",
      labelHe: "קפאין וחרדות",
      labelEn: "Caffeine & Panic",
      responseHe: "שתית אייס קפה על בטן ריקה ועכשיו הדופק שלך שומע צבעים? ברוכה הבאה לקבוצה. שבי, תשתי כוס מים ותזכרי שאף אחד לא באמת יודע מה הוא עושה בעולם הזה.",
      responseEn: "Chugged iced espresso on an empty stomach and now your pulse can hear colors? Welcome to the club. Drink some water and remember nobody knows what they're doing."
    },
    {
      id: "bed_rotting",
      icon: "🛏️",
      labelHe: "מרקיבה במיטה",
      labelEn: "Full Bed-Rot",
      responseHe: "מרקיבה במיטה מתחת לשמיכה כבר 6 שעות וגוללת רילים? זה לא עצלנות, זו שמירה על אנרגיה קיומית. את נראית מושלמת ככה.",
      responseEn: "Bed-rotting under the duvet for 6 hours straight scrolling reels? That's not laziness, that is strategic existential energy preservation. Carry on."
    },
    {
      id: "fine_world_burns",
      icon: "🫠",
      labelHe: "הכל בסדר גמור™",
      labelEn: "Everything Is Fine™",
      responseHe: "הכל בוער מסביב אבל את מחייכת ואומרת 'יהיה בסדר'? גישה מעולה, הדחקה היא אומנות. אם תתעלמי מזה מספיק זמן זה כנראה לא ייעלם, אבל לפחות יש מזגן.",
      responseEn: "Everything is burning around you but you're smiling saying 'it's fine'? Repression is an art form. It won't solve anything, but at least there's air conditioning."
    },
    {
      id: "ready_to_roast",
      icon: "🤌",
      labelHe: "מוכנה לזרוק פאנץ'",
      labelEn: "Ready to Roast",
      responseHe: "מישהו עצבן אותך היום? קחי נשימה עמוקה, אל תעשי מזה סצנה - פשוט תכתבי על זה ריל ציני שיקבל 200 אלף צפיות.",
      responseEn: "Did someone test your patience? Take a breath, don't cause a scene — just turn them into a viral roast that hits 200k views."
    }
  ],

  // Emergency Sanity Reality Checks (Warm, funny mental health checks)
  sanityChecks: [
    {
      he: "בדיקת מערכות: שחררי את הלסת. תורידי את הכתפיים מהאוזניים. קחי שלוק מים. תזכרי שאנחנו על סלע שמרחף בחלל וכל הדברים שמלחיצים אותך היום יהיו לא רלוונטיים עוד שנה.",
      en: "System check: Unclench your jaw. Drop your shoulders away from your ears. Sip some water. Remember we are on a rock floating in space and whatever stresses you today won't matter soon."
    },
    {
      he: "זה בסדר שאין לך כוח היום. העולם הוא מקום מתיש, אנשים מעייפים, וגם סוללה של אייפון צריכה להיטען על 1%. תני לעצמך פס.",
      en: "It is 100% fine that you have zero energy today. The world is exhausting, people are draining, and even an iPhone needs to charge at 1%. Cut yourself some slack."
    },
    {
      he: "ביטול תוכניות ברגע האחרון זה לא פשע, זו הגנה עצמית על בריאות הנפש.",
      en: "Canceling plans at the last minute is not a crime; it is legal self-defense for your mental health."
    },
    {
      he: "לא כל מחשבה שעוברת לך בראש ב-02:00 בלילה היא עובדה מדעית. לפעמים המוח שלך פשוט משועמם ומחפש דרמות.",
      en: "Not every intrusive thought that hits at 2am is a scientific fact. Sometimes your brain is just bored and manufacturing reality TV."
    },
    {
      he: "למחוק עוקבים, לנקות רעשי רקע ולבחור לעצמך שקט זה לא בריחה - זה הצעד הכי אמיץ שיש. ליה כבר הוכיחה את זה.",
      en: "Cleaning house, resetting your circle, and choosing inner peace isn't quitting — it's the smartest move on earth. Liya already proved it."
    }
  ],

  posts: [
    {
      id: "DD7n-KhIptn",
      code: "DD7n-KhIptn",
      titleHe: "יא חתיך אחד",
      titleEn: "Ya Hatich Echad",
      quoteHe: "יא חתיך אחד 🤌🤌",
      quoteEn: "You handsome devil 🤌🤌",
      captionHe: "מחוות ידיים איטלקיות ופלירטוטים אגרסיביים מדי",
      captionEn: "Aggressive Italian hand gestures and questionable flirting techniques",
      category: "dating",
      categoryLabelHe: "דייטים וגברים",
      categoryLabelEn: "Dating & Men",
      image: "images/post_1_DD7n-KhIptn.jpg",
      views: "182K",
      likes: "19.4K",
      date: "2024-12-23",
      url: "https://www.instagram.com/p/DD7n-KhIptn/",
      tagHe: "פלירטוט ויראלי",
      tagEn: "Viral Flirt"
    },
    {
      id: "DDkS_eUIv9t",
      code: "DDkS_eUIv9t",
      titleHe: "למה אני לסבית",
      titleEn: "Why I'm a Lesbian",
      quoteHe: "הוא חושב על המחמאה הזאת עד היום...",
      quoteEn: "He is still thinking about that compliment to this day...",
      captionHe: "הוא חושב על המחמאה הזאת עד היום וזאת הסיבה המדויקת למה אני לסבית",
      captionEn: "He still thinks about that compliment to this day and that's precisely why I'm a lesbian",
      category: "dating",
      categoryLabelHe: "דייטים וגברים",
      categoryLabelEn: "Dating & Men",
      image: "images/post_2_DDkS_eUIv9t.jpg",
      views: "245K",
      likes: "28.1K",
      date: "2024-12-14",
      url: "https://www.instagram.com/p/DDkS_eUIv9t/",
      tagHe: "אהוב הקהל",
      tagEn: "Fan Favorite"
    },
    {
      id: "Dc1QeIQCach",
      code: "Dc1QeIQCach",
      titleHe: "בתכלס...",
      titleEn: "Basically...",
      quoteHe: "בתכלס יש לי עוד המון להגיד בנושא, אבל נהיה ארוך וממילא אין קשב.",
      quoteEn: "Truth is I have so much more to say, but it got long and nobody has an attention span.",
      captionHe: "יש לי עוד להגיד בנושא אבל נהיה ארוך",
      captionEn: "I have more to say on the matter but it got way too long",
      category: "rant",
      categoryLabelHe: "רנטים ודעות",
      categoryLabelEn: "Unfiltered Rants",
      image: "images/post_3_Dc1QeIQCach.jpg",
      views: "138K",
      likes: "14.2K",
      date: "2026-09-03",
      url: "https://www.instagram.com/p/Dc1QeIQCach/",
      tagHe: "טייק רותח",
      tagEn: "Hot Take"
    },
    {
      id: "DcwHOeJiqKg",
      code: "DcwHOeJiqKg",
      titleHe: "מנסה להשחיט דירה",
      titleEn: "Apartment Demolition Phase",
      quoteHe: "מנסה להשחיט דירה. זרקו רעיונות בבקשה לפני שהמשכיר מגלה.",
      quoteEn: "Trying to renovate/destroy my apartment. Send ideas before the landlord notices.",
      captionHe: "זרקו רעיונות בבקשה וכל מי שחזר ללימודים אז שיבושם לו יום ראשון שמח",
      captionEn: "Drop ideas please, and whoever went back to school good for you happy Sunday",
      category: "lifestyle",
      categoryLabelHe: "כאוס יומיומי",
      categoryLabelEn: "Daily Chaos",
      image: "images/post_4_DcwHOeJiqKg.jpg",
      views: "164K",
      likes: "17.9K",
      date: "2026-09-01",
      url: "https://www.instagram.com/p/DcwHOeJiqKg/",
      tagHe: "שיפוצים וכאוס",
      tagEn: "DIY Panic"
    },
    {
      id: "DSQBX0kgnMB",
      code: "DSQBX0kgnMB",
      titleHe: "מקווה שעזרתי לכן",
      titleEn: "Hope I Helped You Girls",
      quoteHe: "מקווה שעזרתי לכן, ואם לא - לפחות שרפתי לכן 40 שניות מהחיים.",
      quoteEn: "Hope I helped you girls. If not, at least I wasted 40 seconds of your life.",
      captionHe: "מקווה שעזרתי לכן",
      captionEn: "Tips I learned the hard way so you don't have to suffer through it",
      category: "advice",
      categoryLabelHe: "עצות מפוקפקות",
      categoryLabelEn: "Dubious Advice",
      image: "images/post_5_DSQBX0kgnMB.jpg",
      views: "310K",
      likes: "34.5K",
      date: "2025-12-14",
      url: "https://www.instagram.com/p/DSQBX0kgnMB/",
      tagHe: "עצה לחיים",
      tagEn: "Life Advice"
    },
    {
      id: "DR2KOUtAh0b",
      code: "DR2KOUtAh0b",
      titleHe: "חלבון (מאז שהבן זוג שלי...)",
      titleEn: "Protein (Boyfriend Gym Era)",
      quoteHe: "מאז שהבן זוג שלי נכנס לכושר, כל החיים שלי זה אבקות וחלבון.",
      quoteEn: "Since my boyfriend entered his gym era, our home is an industrial whey protein facility.",
      captionHe: "חלבון. זה כל האישיות של אנשים עכשיו",
      captionEn: "Protein. That is literally everyone's entire personality now",
      category: "dating",
      categoryLabelHe: "דייטים וגברים",
      categoryLabelEn: "Dating & Men",
      image: "images/post_6_DR2KOUtAh0b.jpg",
      views: "420K",
      likes: "51.2K",
      date: "2025-12-04",
      url: "https://www.instagram.com/p/DR2KOUtAh0b/",
      tagHe: "רוסט על ג'ימברוז",
      tagEn: "Gym Bro Roast"
    },
    {
      id: "DRzRYB3At6n",
      code: "DRzRYB3At6n",
      titleHe: "אין משהו יותר מביך",
      titleEn: "Nothing More Humiliating",
      quoteHe: "אין משהו יותר מביך מלהתחנן לאינגייג'מנט, אבל הנה אני פה. לא תביאו לי?",
      quoteEn: "Nothing is more embarrassing than begging for engagement, yet here I stand. Won't you give me some?",
      captionHe: "לא תביאו לי באינגיימנט?",
      captionEn: "Won't you give me some engagement?",
      category: "rant",
      categoryLabelHe: "רנטים ודעות",
      categoryLabelEn: "Unfiltered Rants",
      image: "images/post_7_DRzRYB3At6n.jpg",
      views: "195K",
      likes: "22.8K",
      date: "2025-12-03",
      url: "https://www.instagram.com/p/DRzRYB3At6n/",
      tagHe: "מטא-הומור",
      tagEn: "Meta Humor"
    },
    {
      id: "DRzE3nygvmH",
      code: "DRzE3nygvmH",
      titleHe: "חיכה שנתיים להגיד לי",
      titleEn: "Waited 2 Years to Bring It Up",
      quoteHe: "חיכה שנתיים שלמות לשלוף את זה. הלוואי שהייתה לי כזאת מסירות לפנסיה שלי.",
      quoteEn: "He waited two whole years just to drop that on me. Wish I had that dedication to my 401k.",
      captionHe: "חיכה שנתיים להגיד לי",
      captionEn: "People who hoard resentment at an Olympic medal level",
      category: "dating",
      categoryLabelHe: "דייטים וגברים",
      categoryLabelEn: "Dating & Men",
      image: "images/post_8_DRzE3nygvmH.jpg",
      views: "278K",
      likes: "31.0K",
      date: "2025-12-03",
      url: "https://www.instagram.com/p/DRzE3nygvmH/",
      tagHe: "שמירת טינה",
      tagEn: "Petty Grudges"
    },
    {
      id: "DRxU2idgsJU",
      code: "DRxU2idgsJU",
      titleHe: "לאן לעזאזל הגענו כחברה",
      titleEn: "Where Did We Go as a Society",
      quoteHe: "לאן לעזאזל הגענו כחברה? פחד אמיתי שלי זה הדבר הזה, ולהיכנס להיריון.",
      quoteEn: "Where on earth did we go wrong as a society? My two deepest fears: this, and accidental pregnancy.",
      captionHe: "פחד אמיתי שלי זה ולהיכנס להיריון",
      captionEn: "A genuine fear of mine is that, plus getting pregnant",
      category: "dark",
      categoryLabelHe: "הומור שחור",
      categoryLabelEn: "Dark Humor",
      image: "images/post_9_DRxU2idgsJU.jpg",
      views: "360K",
      likes: "44.9K",
      date: "2025-12-02",
      url: "https://www.instagram.com/p/DRxU2idgsJU/",
      tagHe: "חרדה קיומית",
      tagEn: "Existential Dread"
    },
    {
      id: "DRxB_56AqXB",
      code: "DRxB_56AqXB",
      titleHe: "כשהייתי קטנה: תיאוריית הזומבים",
      titleEn: "Childhood Zombie Theory",
      quoteHe: "כשהייתי קטנה חשבתי שחסרי דיור הם כמו זומבים שיכולים להדביק אותך בנשיכה.",
      quoteEn: "When I was little I was convinced homeless people were zombies that pass poverty via biting.",
      captionHe: "כשהייתי קטנה חשבתי שחסרי דיור הם כמו זומבים שיכולים להדביק אותך בנשיכה",
      captionEn: "When I was little I thought homeless people were like zombies who infect you if they bite you",
      category: "dark",
      categoryLabelHe: "הומור שחור",
      categoryLabelEn: "Dark Humor",
      image: "images/post_10_DRxB_56AqXB.jpg",
      views: "510K",
      likes: "62.3K",
      date: "2025-12-02",
      url: "https://www.instagram.com/p/DRxB_56AqXB/",
      tagHe: "טראומת ילדות",
      tagEn: "Core Memory"
    },
    {
      id: "DRwvLwlE1zb",
      code: "DRwvLwlE1zb",
      titleHe: "התחרות הסמויה",
      titleEn: "The Covert Competition",
      quoteHe: "מכירים את התחרות הסמויה הזאת? ...לפחות אין לו אפילפסיה יותר (כי הוא לא כאן).",
      quoteEn: "You know that secret competition? ...At least he doesn't have epilepsy anymore (because he's not here).",
      captionHe: "לפחות אין לו אפילפסיה יותר (כי הוא לא כאן)",
      captionEn: "At least he doesn't have epilepsy anymore (because he's not here)",
      category: "dark",
      categoryLabelHe: "הומור שחור",
      categoryLabelEn: "Dark Humor",
      image: "images/post_11_DRwvLwlE1zb.jpg",
      views: "590K",
      likes: "78.4K",
      date: "2025-12-02",
      url: "https://www.instagram.com/p/DRwvLwlE1zb/",
      tagHe: "שיא ההומור השחור",
      tagEn: "Peak Dark Humor"
    },
    {
      id: "DRchG3kgm_I",
      code: "DRchG3kgm_I",
      titleHe: "טראומת העט-עיפרון ביסודי",
      titleEn: "Mechanical Pencil Trauma",
      quoteHe: "היה ילד שתמיד היה תוקע את החוד של העט עפרון שלו בישבן שלי. ועדיין שואלים למה אני כזאת.",
      quoteEn: "A kid used to perpetually jab 0.7mm mechanical pencil lead into my butt. And you wonder why I'm cynical.",
      captionHe: "כשהייתי ביסודי היה ילד שתמיד היה תוקע את החוד של העט עפרון שלו בישבן שלי",
      captionEn: "When I was in elementary school there was a kid who always poked the lead of his pencil into my butt",
      category: "dark",
      categoryLabelHe: "הומור שחור",
      categoryLabelEn: "Dark Humor",
      image: "images/post_12_DRchG3kgm_I.jpg",
      views: "430K",
      likes: "53.7K",
      date: "2025-11-24",
      url: "https://www.instagram.com/p/DRchG3kgm_I/",
      tagHe: "סיפור מקור",
      tagEn: "Origin Story"
    }
  ],

  cynicQuotes: [
    {
      he: "הוא חושב על המחמאה הזאת עד היום... וזאת הסיבה המדויקת למה אני מעדיפה שקט.",
      en: "He's still thinking about that compliment to this day... which is precisely why I prefer silence."
    },
    {
      he: "לפחות אין לו אפילפסיה יותר (כי הוא לא כאן). שחור? קצת. נכון? מאוד.",
      en: "At least he doesn't have epilepsy anymore (because he's not here). Dark? Yes. Accurate? Extremely."
    },
    {
      he: "לאן לעזאזל הגענו כחברה? אני שואלת את עצמי את זה בכל פעם שאני פותחת את הפיד.",
      en: "Where the hell did we go as a society? I ask myself this every time I open my feed."
    },
    {
      he: "כשהייתי קטנה חשבתי שחסרי דיור הם זומבים שיכולים להדביק אותך בנשיכה. היום אני מבינה שכולנו קצת זומבים.",
      en: "As a kid I thought homeless people were zombies who infect you with a bite. Now I realize we're all a bit zombie."
    },
    {
      he: "חלבון. מאז שהבן זוג שלי נכנס לכושר, כל חדר בבית מריח כמו וניל מלאכותי ודיכאון.",
      en: "Protein. Ever since my partner got fit, every room smells like artificial vanilla and mild depression."
    },
    {
      he: "אין משהו יותר מביך מלהתחנן לאינגייג'מנט, אבל הנה אני עושה את זה בכל זאת. תעשו לייק לפני שאתחרט.",
      en: "Nothing is more embarrassing than begging for engagement, yet here I am. Drop a like before I regret breathing."
    },
    {
      he: "היה ילד ביסודי שתקע לי עט עיפרון בישבן. זאת הייתה ההכנה הכי טובה לעולם המבוגרים.",
      en: "A kid jabbed mechanical pencil lead into my butt in 4th grade. Honestly the best preparation for adulthood."
    },
    {
      he: "יא חתיך אחד 🤌🤌 קח צעד אחורה לפני שאני שולפת את הציניות שלי.",
      en: "You handsome devil 🤌🤌 Take one step back before I unleash my emotional unavailability."
    },
    {
      he: "מקווה שעזרתי לכן, ואם לא - לפחות בזבזתי לכן עוד 40 שניות מהחיים.",
      en: "Hope I helped you girls. If not, at least I burned 40 seconds off your mortal countdown."
    },
    {
      he: "חיכה שנתיים שלמות לשלוף את זה. אנשים שומרים טינה טוב יותר משבנקים שומרים כסף.",
      en: "He waited two full years to bring it up. People hoard petty grudges better than Swiss banks hoard gold."
    },
    {
      he: "פאנצ'ים שיכלתי לזרוק ואהבה שיכלתי לקבל - ספוילר: בחרתי בפאנצ'ים.",
      en: "Punchlines I could have thrown and love I could have received — spoiler: I went with the punchlines."
    },
    {
      he: "למחוק את כל הפיד העולמי ולהישאר רק עם הקהילה המקומית זה כמו להחליף מסיבת טבע רועשת בקפה שקט במרפסת. הטוב ביותר שעשיתי.",
      en: "Deleting a massive global feed to hang out only with my local crowd is like swapping a sweaty stadium for a quiet coffee. Best move ever."
    },
    {
      he: "אני לא פסימית, אני פשוט ריאליסטית עם חוש הומור בעייתי.",
      en: "I'm not a pessimist. I'm just a realist with an extremely problematic sense of humor."
    },
    {
      he: "אם מישהו אומר לך 'יהיה בסדר', תתרחקי ממנו מיד. הוא כנראה הוזה.",
      en: "If anyone tells you 'everything will be fine', distance yourself immediately. They are hallucinating."
    },
    {
      he: "למה לפתור דברים בתקשורת בוגרת כשאפשר פשוט לפרסם סרטון עם מוזיקה דרמטית?",
      en: "Why resolve conflict through mature dialogue when you can post a video with moody bass?"
    },
    {
      he: "הדבר הכי יציב בחיים שלי כרגע זה החוסר חשק לקום מהמיטה בבוקר.",
      en: "The most stable constant in my life right now is the total reluctance to exit my bed."
    }
  ],

  pollOptions: [
    {
      id: "safe_space",
      titleHe: "מועדון 'מרקיבות ביחד' (Safe Space ציני)",
      titleEn: "'Rotting Together' Club (Cynical Safe Space)",
      descHe: "קהילה אינטימית לשיתוף חרדות, רנטים קצרים, ודיונים על למה כולנו צריכים שנ\"צ של 14 שעות.",
      descEn: "An intimate space to share existential panic, quick rants, and why we all need a 14-hour nap.",
      votes: 2140
    },
    {
      id: "roast_hotline",
      titleHe: "מוקד רוסטים ועצות ציניות לחיים",
      titleEn: "Sarcastic Advice Hotline & Personal Roasts",
      descHe: "שולחים דילמה בחיים ומקבלים מליה רוסט אכזרי אבל מנחם שיסדר לכם את הראש.",
      descEn: "Submit your life crisis and receive an unfiltered reality-check roast from Liya.",
      votes: 1850
    },
    {
      id: "merch_drop",
      titleHe: "מרצ' 'חלבון, חרדות ופאנצ'ים'",
      titleEn: "'Whey, Anxiety & Sarcasm' Merch Drop",
      descHe: "אוברסייז קפוצ'ונים עם 'לאן הגענו כחברה', שייקרים ומדבקות לפריקה עצמית.",
      descEn: "Heavyweight hoodies emblazoned with 'Where Did Society Go Wrong', shakers & sticker packs.",
      votes: 1420
    },
    {
      id: "podcast_void",
      titleHe: "פודקאסט אינטימי: 'צועקים לתוך הריק'",
      titleEn: "Intimate Podcast: 'Screaming into the Void'",
      descHe: "ליה יושבת עם מיקרופון ומדברת בגובה העיניים על בריאות הנפש, גברים, והעולם המודרני בלי פילטרים.",
      descEn: "Liya sits with a mic and talks raw about mental health, dating, and modern chaos with zero PR filter.",
      votes: 2490
    }
  ],

  confessions: [
    {
      author: "אנונימית עם חרדה חברתית",
      authorEn: "Social Anxiety Anon",
      textHe: "נשארתי במסיבה 15 דקות רק כדי שיראו שבאתי, ואז התחבאתי בשירותים עד שהיה מנומס להזמין מונית הביתה. ליה הצלת לי את השפיות עם הרילים שלך.",
      textEn: "Stayed at a party for 15 mins just to be seen, then hid in the bathroom until it was polite to Uber home. Liya your reels keep me sane.",
      timestamp: "לפני יומיים / 2d ago",
      verified: true
    },
    {
      author: "בוגר טראומת עט-עיפרון",
      authorEn: "0.7mm Survivor",
      textHe: "עד היום כשאני רואה עט עיפרון שפיצים 0.7 הדופק שלי עולה ל-140. ליה את הריפוי שלי.",
      textEn: "To this day when I see a 0.7mm mechanical pencil my heart rate spikes to 140. Liya your videos are my therapy.",
      timestamp: "לפני 4 ימים / 4d ago",
      verified: true
    },
    {
      author: "חובבת ביטול תוכניות",
      authorEn: "Professional Flaker",
      textHe: "הרגשתי אשמה שביטלתי דייט כדי לבהות בתקרה, עד שראיתי את הסרטון שלך על שקט נפשי. תודה שנתת לגיטימציה לבטלה.",
      textEn: "Felt guilty for canceling a date to stare at the ceiling, until I saw your video on peace of mind. Thanks for legitimizing my bed-rot.",
      timestamp: "אתמול / Yesterday",
      verified: true
    }
  ],

  merch: [
    {
      id: "merch_1",
      titleHe: "טי-שירט 'חלבון וחרדות' Acid Wash",
      titleEn: "'Whey & Anxiety' Heavyweight Acid Tee",
      descHe: "100% כותנה כבדה. מיועד לאנשים שמתמודדים עם החיים בעזרת קפאין, ציניות וחוסר שעות שינה.",
      descEn: "100% heavyweight washed cotton. For anyone surviving reality on caffeine, cynicism, and 4 hours of sleep.",
      price: "169 ₪",
      priceUsd: "$45",
      badgeHe: "בסטסלר מומצא",
      badgeEn: "Fictional Best Seller",
      imageMock: "images/post_6_DR2KOUtAh0b.jpg"
    },
    {
      id: "merch_2",
      titleHe: "ספל 'לאן לעזאזל הגענו כחברה'",
      titleEn: "'Where The Hell Did Society Go' Mug",
      descHe: "ספל קרמיקה שחור מאט 450 מ\"ל ללגימת קפה שחור וייאוש קיומי מול המיילים בעבודה.",
      descEn: "Matte black 450ml ceramic mug for sipping dark roast coffee alongside cold existential dread.",
      price: "69 ₪",
      priceUsd: "$19",
      badgeHe: "חובה במשרד",
      badgeEn: "Office Essential",
      imageMock: "images/post_9_DRxU2idgsJU.jpg"
    },
    {
      id: "merch_3",
      titleHe: "קפוצ'ון 'מרקיבות ביחד' אוברסייז",
      titleEn: "'Rotting Together' Oversized Hoodie",
      descHe: "קפוצ'ון ענק ומנחם במיוחד לבהייה ממושכת בטיקטוק בתוך המיטה בלי שאיש ישפוט אותך.",
      descEn: "Ultra-oversized cozy fleece hoodie designed strictly for staring at the ceiling in complete peace.",
      price: "249 ₪",
      priceUsd: "$68",
      badgeHe: "מהדורה ביתית",
      badgeEn: "Home Edition",
      imageMock: "images/post_1_DD7n-KhIptn.jpg"
    },
    {
      id: "merch_4",
      titleHe: "מגן אחורי נגד עטי-עיפרון (שריון פולימרי)",
      titleEn: "Tactical Anti-Pencil Glute Armor",
      descHe: "מגן טיטניום גמיש לכיס האחורי נגד ילדים סוררים בכיתה ד' שמחזיקים פיילוט 0.7.",
      descEn: "Flexible titanium pocket shield for complete immunity against chaotic 4th grade pencil assassins.",
      price: "99 ₪",
      priceUsd: "$28",
      badgeHe: "טראומה ממוסחרת",
      badgeEn: "Monetized Trauma",
      imageMock: "images/post_12_DRchG3kgm_I.jpg"
    }
  ],

  translations: {
    he: {
      siteTitle: "ליה • not.liya | הפינה השקטה והצינית שלנו",
      navBio: "הסיפור שלי",
      navVault: "סרטונים ורנטים",
      navCheckin: "איך אנחנו היום?",
      nav8ball: "פאנצ'ומטר",
      navSanity: "עזרה ראשונה לנפש",
      navPitch: "הצבעה לאתר",
      navConfess: "וידויים",
      navMerch: "מרצ' דמיוני",
      statusOnline: "מחוברת ושופטת באהבה",
      forLiyaBtn: "👋 ליה, כנסי לפה!",
      heroBadge: "מהמיליונים בעולם לקפה אינטימי בישראל",
      heroPunchline: "פאנצ'ים שיכלתי לזרוק ואהבה שיכלתי לקבל.",
      heroSub: "בלי אלגוריתמים עולמיים ובלי זיוף. מחקתי את הרעש כדי להישאר עם האנשים האמיתיים. מקום בטוח לפרוק חרדות, לקטר על גברים ולצחוק על הכל.",
      btnVault: "צפו ברנטים",
      btnSanity: "עזרה ראשונה לנפש 🛟",
      btnPitch: "הצביעו לאתר הבא",
      statTiktok: "עוקבים בטיקטוק",
      statLikes: "לייקים של אהבה",
      statIg: "הקהילה שלנו באינסטגרם",
      statPatience: "סבלנות לאנשים מזויפים",
      moodTitle: "איך אנחנו מרגישות היום?",
      moodSubtitle: "לחצי על המצב הנפשי הנוכחי שלך וקבלי תגובה מותאמת אישית מליה.",
      vaultTitle: "כספת הסרטונים והפאנצ'ים",
      vaultSubtitle: "כל הלהיטים הוויראליים, ההתמוטטויות העצביות והתובנות החברתיות שנשמרו לנצח.",
      filterAll: "הכל (12)",
      filterDark: "הומור שחור",
      filterDating: "דייטים וגברים",
      filterRant: "רנטים ודעות",
      filterLifestyle: "כאוס וחיים",
      loreTitle: "הריסטארט: למה לעזוב את העולם בשביל הבית?",
      loreSubtitle: "פעם מיליוני עוקבים זרים, היום קהילה חמה, כנה וצינית שמבינה בדיוק כל ניואנס.",
      sanityTitle: "כפתור עזרה ראשונה למתמוטטות קלות",
      sanitySubtitle: "מרגישה מוצפת? החרדה קפצה לבקר? לחצי על הכפתור לקבלת סטירת מציאות מנחמת ומחבקת.",
      sanityBtn: "תני לי פרופורציה עכשיו 🛟",
      cynicTitle: "הפאנצ'ומטר: מוקד ייעוץ אכזרי",
      cynicSubtitle: "תקועים עם דילמה בחיים? בחרו בעיה או הקלידו, ותקבלו סטירת מציאות מליה.",
      cynicPlaceholder: "למשל: הבחור לא עונה לי, מה לעשות?",
      cynicBtn: "תני לי פאנץ' לפנים 💥",
      cynicCopy: "העתק ציטוט",
      cynicCopied: "הועתק ללוח!",
      pitchTitle: "ליה שאלה: 'איזה אתר אתם רוצים?'",
      pitchSubtitle: "הצביעו על הפיצ'רים שחייבים להיות באתר הרשמי הבא של ליה, או הציעו רעיון משלכם!",
      pitchVoteBtn: "הצביעו לפיצ'ר",
      pitchVoted: "הצבעתם!",
      pitchInputPlaceholder: "יש לכם רעיון גאוני אחר לאתר של ליה? כתבו כאן...",
      pitchSubmitBtn: "שלחו הצעה לליה",
      confessTitle: "תיבת תלונות ווידויים מביכים",
      confessSubtitle: "קרה לכם משהו מביך בטירוף? שתפו אנונימית. אולי זה יגיע לריל הבא.",
      confessPlaceholder: "ספרו כאן את הסיפור המביך שלכם בלי שמות...",
      confessAuthorPlaceholder: "כינוי (או השאירו ריק לאנונימי)",
      confessSubmitBtn: "שגרו לריק",
      merchTitle: "דברים שהייתי מוכרת אם היה לי אכפת",
      merchSubtitle: "קולקציית קפסולה פיקטיבית לציניקנים בלב ובנפש.",
      merchBuyBtn: "הזמנה מוקדמת (בצחוק)",
      merchToast: "אל תתרגשו, המרצ' עדיין בדמיון של ליה.",
      footerCredits: "נבנה באהבה, כבוד והמון ציניות עבור @not.liya. הבית האינטימי של הקהילה.",
      soundOn: "סאונד פעיל",
      soundOff: "השתק",
      openInIg: "צפו בריל המקורי באינסטגרם",
      modalClose: "סגור (Esc)"
    },
    en: {
      siteTitle: "Liya • @not.liya | Our Cozy & Cynical Clubhouse",
      navBio: "The Story",
      navVault: "Rants & Reels",
      navCheckin: "Daily Check-in",
      nav8ball: "Cynic 8-Ball",
      navSanity: "Sanity First-Aid",
      navPitch: "Vote Features",
      navConfess: "Confessions",
      navMerch: "Concept Merch",
      statusOnline: "Online & judging with love",
      forLiyaBtn: "👋 Hey Liya, click here!",
      heroBadge: "From global millions to a cozy Israeli clubhouse",
      heroPunchline: "Punchlines I could have thrown and love I could have received.",
      heroSub: "No fake algorithms, no international PR facade. Wiped the global noise to keep it real with the core community. A safe harbor to unpack anxiety, roast men, and laugh through existential dread.",
      btnVault: "Explore The Vault",
      btnSanity: "Sanity First-Aid 🛟",
      btnPitch: "Vote For The Site",
      statTiktok: "TikTok Followers",
      statLikes: "Video Likes",
      statIg: "Instagram Community",
      statPatience: "Tolerance for Fakes",
      moodTitle: "How Are We Feeling Today?",
      moodSubtitle: "Click your current emotional state to get a custom reaction from Liya.",
      vaultTitle: "The Rant Vault & Video Archive",
      vaultSubtitle: "Every viral hit, existential dread breakdown, and unvarnished social observation.",
      filterAll: "All (12)",
      filterDark: "Dark Humor",
      filterDating: "Dating & Men",
      filterRant: "Rants & Takes",
      filterLifestyle: "Chaos & Life",
      loreTitle: "The Reset: Why Trade The World For Home?",
      loreSubtitle: "Once chasing millions globally, now building a real, grounded, sarcastic haven where every nuance lands.",
      sanityTitle: "Mental Health & Sanity First-Aid",
      sanitySubtitle: "Feeling overwhelmed? Existential dread paying a visit? Hit the button for an unpretentious reality-check hug.",
      sanityBtn: "Give Me Perspective 🛟",
      cynicTitle: "The Cynic 8-Ball & Reality Check",
      cynicSubtitle: "Stuck with a life dilemma? Type your problem and get an immediate reality check.",
      cynicPlaceholder: "e.g., He left me on read for 14 hours, what should I do?",
      cynicBtn: "Roast My Life Dilemma 💥",
      cynicCopy: "Copy Quote",
      cynicCopied: "Copied to clipboard!",
      pitchTitle: "Liya Asked: 'What site should we build?'",
      pitchSubtitle: "Vote on the killer features for her permanent website, or pitch a crazy idea directly!",
      pitchVoteBtn: "Vote for Feature",
      pitchVoted: "Voted!",
      pitchInputPlaceholder: "Got a brilliant concept for Liya's permanent website? Pitch it here...",
      pitchSubmitBtn: "Send Pitch to Liya",
      confessTitle: "Awkward Confessions & Complaint Box",
      confessSubtitle: "Did something humiliating happen to you? Drop it anonymously. It might become her next video.",
      confessPlaceholder: "Share your unhinged awkward story here without names...",
      confessAuthorPlaceholder: "Nickname (or leave blank for Anon)",
      confessSubmitBtn: "Drop into the Void",
      merchTitle: "Things I'd Sell If I Actually Cared",
      merchSubtitle: "A fictitious capsule collection tailored for full-time cynics.",
      merchBuyBtn: "Pre-order (Just Kidding)",
      merchToast: "Don't get too excited, this merch only lives in Liya's imagination.",
      footerCredits: "Crafted with dark humor, affection, and respect for @not.liya following her community call.",
      soundOn: "Sound FX On",
      soundOff: "Muted",
      openInIg: "Open Original Reel on Instagram",
      modalClose: "Close (Esc)"
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_DATA;
}
