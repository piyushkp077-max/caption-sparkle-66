export const vaultCategories = ["All Clips", "Reactions", "Shaadi", "Cricket"] as const;
export type VaultCategory = (typeof vaultCategories)[number];

export type VaultClip = {
  id: string;
  title: string;
  category: Exclude<VaultCategory, "All Clips">;
  duration: string;
  format: "9:16";
  quality: "HD";
  downloads: number;
  file: string;
};

export const vaultClips: VaultClip[] = [
  { id: "chai-shock", title: "Chai Pe Shock", category: "Reactions", duration: "0:04", format: "9:16", quality: "HD", downloads: 18400, file: "/clips/chai-shock.mp4" },
  { id: "shaadi-entry", title: "Shaadi Squad Entry", category: "Shaadi", duration: "0:04", format: "9:16", quality: "HD", downloads: 12600, file: "/clips/shaadi-entry.mp4" },
  { id: "match-point", title: "Last Ball Madness", category: "Cricket", duration: "0:04", format: "9:16", quality: "HD", downloads: 21300, file: "/clips/match-point.mp4" },
];