<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Product architecture

- Keep the original caption application's home and six tab views at `/`, reusing its caption, hashtag, font, and image-creation modules; this preserves the restored pre-replacement architecture.
- Centralize caption count bounds, tone rules and output validation in caption-settings and enforce them in both the stream handler and client; this prevents text and media generation from diverging.
- Preserve original quote category identities and use one shared multilingual category catalog for text and media controls; this keeps restored filters and generation validation aligned.
- Pre-optimize the language-bar switch alongside React and React DOM in Vite; this prevents late dependency discovery from mixing React module generations in the preview.

- Keep the splash timing in splash-settings and the daily quote in a focused Home component; this makes startup behavior testable without changing caption generation.
