export const roastCategories = ["All", "Savage", "Dosti", "Family", "Office", "Dating"] as const;
export type RoastCategory = (typeof roastCategories)[number];

export type RoastPost = {
  id: number;
  text: string;
  translation: string;
  category: Exclude<RoastCategory, "All">;
  heat: "Hot" | "Nuclear" | "Fresh";
  shares: string;
  gradient: string;
};

export const roastPosts: RoastPost[] = [
  { id: 1, text: "Tera confidence dekh ke lagta hai Wi-Fi full hai, bas internet nahi aa raha.", translation: "Full signal, zero connection.", category: "Savage", heat: "Nuclear", shares: "18.4K", gradient: "quote-gradient-three" },
  { id: 2, text: "Bhai tu dost kam, unpaid notification zyada hai — har time pop up ho jaata hai.", translation: "The friend who never stops appearing.", category: "Dosti", heat: "Hot", shares: "12.8K", gradient: "quote-gradient-two" },
  { id: 3, text: "Mummy ke saamne tera attitude bhi airplane mode pe chala jaata hai.", translation: "Every rebel has one final boss.", category: "Family", heat: "Fresh", shares: "9.7K", gradient: "quote-gradient-five" },
  { id: 4, text: "Meeting mein idea mera, credit tumhara — talent nahi, speed achhi hai.", translation: "Fastest credit collector in the office.", category: "Office", heat: "Nuclear", shares: "15.1K", gradient: "quote-gradient-four" },
  { id: 5, text: "Tumhare mixed signals se achha toh Indian traffic ka signal hai.", translation: "At least traffic lights eventually make sense.", category: "Dating", heat: "Hot", shares: "21.3K", gradient: "quote-gradient-one" },
  { id: 6, text: "Teri planning aur Monday ki motivation — dono lunch tak gayab.", translation: "Big plans, very short warranty.", category: "Office", heat: "Fresh", shares: "7.6K", gradient: "quote-gradient-two" },
  { id: 7, text: "Tu group project ka woh member hai jo bas ‘great work team’ likhta hai.", translation: "Contribution: one motivational message.", category: "Dosti", heat: "Nuclear", shares: "16.9K", gradient: "quote-gradient-three" },
  { id: 8, text: "Rishta aunty ko meri salary se zyada meri shaadi ki tension hai.", translation: "India's most dedicated unpaid recruiter.", category: "Family", heat: "Hot", shares: "11.2K", gradient: "quote-gradient-five" },
  { id: 9, text: "Bio mein ‘no drama’, inbox mein daily season finale.", translation: "Streaming a new episode every day.", category: "Dating", heat: "Nuclear", shares: "24.7K", gradient: "quote-gradient-one" },
  { id: 10, text: "Tera comeback itna late aaya, tab tak argument ka reunion ho gaya.", translation: "Delivered after three business days.", category: "Savage", heat: "Hot", shares: "13.5K", gradient: "quote-gradient-four" },
  { id: 11, text: "Tu intelligent hai, bas evidence private account pe rakha hai.", translation: "Proof currently unavailable.", category: "Savage", heat: "Fresh", shares: "8.9K", gradient: "quote-gradient-two" },
  { id: 12, text: "Papa ka ‘ek minute idhar aana’ hi asli horror notification hai.", translation: "The notification nobody wants to open.", category: "Family", heat: "Hot", shares: "19.6K", gradient: "quote-gradient-three" },
];