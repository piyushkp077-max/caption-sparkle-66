export const characterIds = ["girl", "bihari", "boy", "lady"] as const;
export type CharacterId = (typeof characterIds)[number];

export const characterVoice: Record<CharacterId, { voice: string; style: string }> = {
  girl: { voice: "Leda", style: "Say in a sweet, cute, playful young Indian girl's voice with a natural Hindi accent" },
  bihari: { voice: "Algenib", style: "Say like a grumpy old Bihari man with a heavy, gravelly, rustic Bihari Hindi accent, slightly angry and dramatic" },
  boy: { voice: "Puck", style: "Say like a casual, cheerful young desi Indian guy, relaxed and funny, natural Hinglish accent" },
  lady: { voice: "Gacrux", style: "Say like a desi Indian grandmother aunty, taunting, dramatic and loving, with an old woman's warm Hindi accent" },
};

export const characters: { id: CharacterId; name: string; emoji: string; tag: string }[] = [
  { id: "girl", name: "Sweet Girl", emoji: "💖", tag: "Cute & Flirty" },
  { id: "bihari", name: "Bihari Old Man", emoji: "👴", tag: "Heavy, Roast & Angry" },
  { id: "boy", name: "Desi Boy", emoji: "👦", tag: "Casual & Fun" },
  { id: "lady", name: "Old Lady", emoji: "👵", tag: "Aunty / Dadi Taunts" },
];

// Openers × punchlines give 150+ unique clips per character.
const parts: Record<CharacterId, [string[], string[]]> = {
  girl: [
    ["Hiii, suno na,", "Oye cutie,", "Arey baba,", "Hello ji,", "Uff, tum bhi na,", "Sach batao,", "Achha suno,", "Hehe, pata hai,", "Jaanu sun lo,", "Ek baat bolun,", "Oho mister,", "Areee yaar,", "Chalo theek hai,"],
    ["aaj tum bahut cute lag rahe ho.", "mujhe chocolate chahiye abhi ke abhi!", "tumhari smile toh kamaal hai.", "itni der se reply kyun nahi kiya?", "main naraz hoon, manao mujhe.", "kal coffee pe chaloge na?", "tum mere favourite ho, bas.", "jhooth mat bolo, mujhe sab pata hai.", "mera dimaag mat khao, hehe.", "photo bhejo na apni.", "bas tumse baat karke achha laga.", "pagal ho tum, ekdum pagal!"],
  ],
  bihari: [
    ["Ka re babua,", "Ae chhaura,", "Hum bata rahe hain,", "Dekho ho bhaiya,", "Arre ka kar rahe ho,", "Suno ho mardwa,", "Kasam se,", "Bujhaiye nahi raha hai,", "Ae baabu,", "Hamra se mat uljho,", "Are bap re bap,", "Sun le dhyan se,", "Ee ka tamasha hai,"],
    ["dimaag ka dahi kar diye ho!", "litti chokha khaye ho ki nahi?", "padhai likhai chhod ke mobile chala rahe ho?", "ek thappad mein seedha Patna pahunch jaoge!", "hamra zamana mein aisa nahi hota tha.", "bhains se zyada akal toh tumhara nahi hai.", "bijli ka bill kaun bharega, tumhara baap?", "chal bhaag yahan se, nautanki!", "kaam dhaam kuch hai ki bas ghoomte rehte ho?", "hum sab samajh rahe hain, chaalaak mat bano.", "phone rakho aur khet pe chalo!", "itna bada ho gaye, akal nahi aaya?"],
  ],
  boy: [
    ["Bhai sun,", "Oye bro,", "Arey yaar,", "Scene kya hai,", "Bhai sach bolun,", "Chill maar,", "Dekh bhai,", "Bhai kasam se,", "Arre sun na,", "Yo bhai,", "Bhai ek kaam kar,", "Haan bhai bol,", "Kya bolta hai,"],
    ["aaj party kiski taraf se hai?", "maggi bana de, bhook lagi hai.", "tera phone kab se band tha?", "kal cricket khelne aa raha hai na?", "yeh setting tera nahi hone wala.", "chai pe chalte hain, tension mat le.", "tu toh full hero ban gaya re!", "mera paisa kab lautayega?", "exam ki tension baad mein, abhi movie dekhte hain.", "bike ki chaabi de de, bas do minute.", "tu legend hai bhai, sach mein.", "itna attitude kis baat ka?"],
  ],
  lady: [
    ["Hai Ram,", "Arey beta,", "Sunn le bitiya,", "Humare zamane mein,", "Dekho toh zara,", "Beta ji,", "Arey o lalla,", "Bhagwan bachaye,", "Sharma ji ka beta dekho,", "Chal hat,", "Arey kalmuhe,", "Meri baat sunn,", "Uff in bachchon ka,"],
    ["shaadi kab karoge?", "itne patle kyun ho gaye, khaana nahi milta?", "din bhar phone mein ghuse rehte ho.", "kuch kaam dhandha bhi kar liya karo.", "padosi ki beti doctor ban gayi, aur tum?", "baal kaatne ka paisa nahi hai kya?", "subah jaldi utha karo, aalsi kahin ke.", "ghee waali roti khao, taakat aayegi.", "itni raat ko kahan ghoom rahe the?", "humne toh kabhi aisa nahi kiya.", "naak kata di poore mohalle mein!", "chalo aao, laddoo khaa lo."],
  ],
};

export const clipsFor = (id: CharacterId) => {
  const [openers, lines] = parts[id];
  return openers.flatMap((o) => lines.map((l) => `${o} ${l}`));
};
