# Desi Roast Factory and Viral Vault

## Build
- Replace the current home experience with a visual-first Desi Roast Factory: searchable roast posts, category filters, copy, save, and share actions.
- Add a dedicated Viral Vault screen with organized clip categories, format and duration details, preview thumbnails, search, sorting, saved clips, and working downloads.
- Add compact shared navigation between Roast Factory and Viral Vault, preserving the existing dark/light theme behavior and mobile ergonomics.

## Remove
- Delete the prank voice screen, speech streaming endpoint, browser speech playback, voice character configuration, soundboard controls, and all voice-facing copy.
- Remove obsolete voice dependencies and references so no audio-generation or listening path remains.

## Content and visuals
- Seed the new screens with original desi roast text and a small starter collection of locally served visual clips suitable for testing downloads.
- Use bold poster-style thumbnails and a high-energy editorial visual direction without reintroducing audio controls.

## Verification
- Check search, filtering, saving, copying, sharing, previewing, and downloading in the live app on desktop and mobile-sized layouts.
- Confirm both content routes have unique page metadata and that no voice-related code or UI remains.

## Technical details
- Keep TanStack file routes authoritative: `/` for Desi Roast Factory and `/viral-vault` for the clip library.
- Store starter content in browser-safe data modules and local assets; downloads remain client-side and require no new backend access.