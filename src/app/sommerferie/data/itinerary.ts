export const ACCESS_PIN = "sommer26";

export interface DayPlan {
  day: number;
  title: string;
  description: string;
  emoji: string;
  tag?: string;
}


export interface Camper {
  id: string;
  name: string;
  weight: string;
  sleeps: number;
  description: string;
  link?: string;
}

export const campers: Camper[] = [];

export interface PackingItem {
  id: string;
  label: string;
  category: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export const departureDate = new Date("2026-07-06T08:00:00");
export const returnDate = new Date("2026-07-17T18:00:00");

export const days: DayPlan[] = [
  {
    day: 1,
    title: "Kjøre gjennom Sverige",
    description: "Avreise fra Oslo. Ca. 5 timer kjøring sørover E6. Finne campingplass i Sverige for overnatting.",
    emoji: "🇸🇪",
    tag: "Kjøredag",
  },
  {
    day: 2,
    title: "Videre forbi København",
    description: "Kjøre videre gjennom Sverige, forbi København og over til vestkysten av Danmark. Finne en skikkelig bra campingplass med lekestativer og masse opplegg for barn.",
    emoji: "🏕️",
    tag: "Kjøredag",
  },
  {
    day: 3,
    title: "Rolig dag på campingplassen",
    description: "Kose seg på campingplassen og utforske området rundt. Lekestativ, grilling og avslapping.",
    emoji: "☀️",
    tag: "Fridag",
  },
  {
    day: 4,
    title: "Legoland, Billund",
    description: "Heldagstur til Legoland! Legobyer, berg-og-dal-baner, Miniland og masse moro for store og små.",
    emoji: "🧱",
    tag: "Aktivitet",
  },
  {
    day: 5,
    title: "Stranda, vestkysten",
    description: "Stranddag på den danske vestkysten. Bading, sandslott, sanddyner og den friske Nordsjøen.",
    emoji: "🏖️",
    tag: "Strand",
  },
  {
    day: 6,
    title: "Bytur, vestkysten",
    description: "Utforske en by langs vestkysten. Gå rundt, spise godt, handle litt og nyte dansk stemning.",
    emoji: "🏘️",
    tag: "Bytur",
  },
  {
    day: 7,
    title: "Lalandia, Billund",
    description: "Tropisk badeland, bowling, minigolf og massevis av aktiviteter. Avslapning for foreldre, moro for barna.",
    emoji: "🏊",
    tag: "Aktivitet",
  },
  {
    day: 8,
    title: "Kjøre nordover langs kysten",
    description: "Videre nordover langs vestkysten mot Hirtshals. Finne ny campingplass underveis.",
    emoji: "🚗",
    tag: "Kjøredag",
  },
  {
    day: 9,
    title: "Leke på ny campingplass",
    description: "Utforske den nye campingplassen. Leke, slappe av og nyte de siste dagene i Danmark.",
    emoji: "⛺",
    tag: "Fridag",
  },
  {
    day: 10,
    title: "Campingplass eller bytur?",
    description: "Enda en dag her — kommer an på hvor bra plassen er, eller om det er en spennende by i nærheten.",
    emoji: "🤔",
    tag: "Åpent",
  },
  {
    day: 11,
    title: "Fårup Sommerland?",
    description: "Kanskje en dag i Fårup Sommerland? Fornøyelsespark med badeland og berg-og-dal-baner.",
    emoji: "🎢",
    tag: "Kanskje",
  },
  {
    day: 12,
    title: "Ferge hjem",
    description: "Ferge fra Hirtshals til Larvik, deretter kjøre til Oslo. Vel hjem!",
    emoji: "⛴️",
    tag: "Hjemreise",
  },
];

export interface MeetUp {
  id: string;
  name: string;
  note: string;
}

export const meetUps: MeetUp[] = [];

export interface TodoItem {
  id: string;
  label: string;
}

export const todoList: TodoItem[] = [
  { id: "t1", label: "Planlegge reiserute — kart med stoppesteder og kjørerute" },
  { id: "t2", label: "Leie campingvogn som passer for Tesla Model Y" },
  { id: "t3", label: "Campingvogn til Tesla Model Y — maks tilhengervekt, kulefeste, rekkevidde" },
  { id: "t4", label: "Reisefølge — skal noen andre være med?" },
  { id: "t5", label: "Bestille billetter til Legoland og Lalandia" },
  { id: "t6", label: "Finne og reservere campingplasser" },
  { id: "t7", label: "Kjøredistanser — hvor langt per dag? Planlegge ladestopp for Tesla" },
];

export const packingList: PackingItem[] = [
  // Kjøretøy
  { id: "1", label: "Campingvogn klargjort", category: "Kjøretøy" },
  { id: "2", label: "Tilhengerfeste & el-tilkobling sjekket", category: "Kjøretøy" },
  { id: "3", label: "Lade-kabel Tesla", category: "Kjøretøy" },

  // Klær — voksne
  { id: "10", label: "Badetøy & håndklær (Mats + Ingvild)", category: "Klær voksne" },
  { id: "11", label: "Solkrem & solbriller", category: "Klær voksne" },
  { id: "12", label: "Regntøy", category: "Klær voksne" },
  { id: "13", label: "Varme klær til kvelden", category: "Klær voksne" },
  { id: "14", label: "Flip-flops / sandaler", category: "Klær voksne" },

  // Klær — barn
  { id: "20", label: "Badetøy & håndklær (Evelin + Helle)", category: "Klær barn" },
  { id: "21", label: "Badebleier (Helle)", category: "Klær barn" },
  { id: "22", label: "Solhatt & solkrem barn", category: "Klær barn" },
  { id: "23", label: "Regndress & gummistøvler", category: "Klær barn" },
  { id: "24", label: "Ekstra skift (minst 3 per barn)", category: "Klær barn" },
  { id: "25", label: "Pysjamas", category: "Klær barn" },

  // Barn — utstyr
  { id: "30", label: "Barnesete bil (Evelin, 4 år)", category: "Barneutstyr" },
  { id: "31", label: "Barnesete bil (Helle, 2 år)", category: "Barneutstyr" },
  { id: "32", label: "Reiseseng / campingseng (Helle)", category: "Barneutstyr" },
  { id: "33", label: "Bleier & våtservietter", category: "Barneutstyr" },
  { id: "34", label: "Drikkeflaske & snackboks", category: "Barneutstyr" },
  { id: "35", label: "Barnevogn / sammenleggbar vogn", category: "Barneutstyr" },
  { id: "36", label: "Nattlys / kosedyr", category: "Barneutstyr" },

  // Aktiviteter
  { id: "40", label: "Sandleker, bøtte & spade", category: "Aktiviteter" },
  { id: "41", label: "Brettspill & kortspill", category: "Aktiviteter" },
  { id: "42", label: "Fotball", category: "Aktiviteter" },
  { id: "43", label: "Tegnesaker & fargeblyanter", category: "Aktiviteter" },
  { id: "44", label: "Svømmevinger (Helle)", category: "Aktiviteter" },
  { id: "45", label: "Badering / vannleker", category: "Aktiviteter" },

  // Mat
  { id: "50", label: "Grill & grillkull", category: "Mat" },
  { id: "51", label: "Kjølebag & isposer", category: "Mat" },
  { id: "52", label: "Snacks til bilturen", category: "Mat" },
  { id: "53", label: "Barnemat / knekkebrød / frukt", category: "Mat" },
  { id: "54", label: "Drikke & juice", category: "Mat" },

  // Annet
  { id: "60", label: "Førstehjelpsskrin", category: "Annet" },
  { id: "61", label: "Ladere & powerbank", category: "Annet" },
  { id: "62", label: "Reisedokumenter & forsikring", category: "Annet" },
  { id: "63", label: "Nettbrett + hodetelefoner (biltur)", category: "Annet" },
  { id: "64", label: "Campingstol x2", category: "Annet" },
  { id: "65", label: "Myggspray", category: "Annet" },
];

export const familyMembers: FamilyMember[] = [
  {
    id: "1",
    name: "Mats",
    role: "Sjåfør & grillmester",
    avatar: "https://picsum.photos/seed/dad-avatar/200/200",
  },
  {
    id: "2",
    name: "Ingvild",
    role: "Navigator & pakkesjef",
    avatar: "https://picsum.photos/seed/mom-avatar/200/200",
  },
  {
    id: "3",
    name: "Evelin",
    role: "Legoekspert (4 år)",
    avatar: "https://picsum.photos/seed/kid1-avatar/200/200",
  },
  {
    id: "4",
    name: "Helle",
    role: "Sandslottarkitekt (2 år)",
    avatar: "https://picsum.photos/seed/kid2-avatar/200/200",
  },
];
