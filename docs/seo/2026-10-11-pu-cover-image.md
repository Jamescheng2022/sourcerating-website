# PU article cover image

Scope: only `polyurethane-screen-panels-china-vs-local` receives an explicit cover. Other articles and site-wide metadata defaults retain their existing behavior. The blog list shows an image only when the post declares `coverImage`.

## Source and review

- Asset: VIS-SR-001 v2, `chatgpt-lead-v2.png`.
- Original: https://github.com/Jamescheng2022/agent-bus/blob/1cc37e8eb3626799cd31391ee20d93f44c90f010/to-claude/assets/VIS-SR-001/chatgpt-lead-v2.png
- Original Git blob: `154efb27a6bbd55db2eb09b5ed544e9a83cacccc`.
- Original SHA256: `8692f96d4ff54f63cfa81ffaeb08732e6fc1f908b53e15431db873fcdbdee4a1`.
- Original: PNG, 1672 x 940, 2340849 bytes; preserved without modification.
- Independent acceptance: https://github.com/Jamescheng2022/agent-bus/blob/main/to-chatgpt/20261011-0930-claude-vis-sr-001-v2-pass-and-visual-standard.md
- Crop instruction: `to-claude/assets/VIS-SR-001/ASSET-NOTES-v2.md` in the same source repository.

The existing local original was rehashed and inspected before deriving the web image. The inspection confirmed the accepted orange panels, open slots, supporting blocks and resting caliper. The derivative was inspected after encoding. No image generation or reference photograph was used.

## Derivative

- Path: `public/images/blog/polyurethane-screen-panels-inspection-v2.jpg`.
- Center crop: left 4, top 2, width 1664, height 936 (16:9).
- Output: 1600 x 900, JPEG (`image/jpeg`), 224860 bytes.
- Encoder: sharp 0.34.5, mozjpeg 0826579, quality 85.
- SHA256: `aef330e40b3d9ffb6b039fc3c6ae0a5c20c610376e08d62223eb60833b8754b8`.
- Git blob: `8c067bc41584ad7e65abec28938feddaf06641f8`.
- Alt: Orange polyurethane screening panels with through-slots on a steel inspection bench beside a vernier caliper.
- Caption: AI-generated editorial image; not a photograph of a specific supplier or installation.

Article metadata, Twitter metadata and Article ImageObject use the same absolute URL and 1600 x 900 dimensions. The article renders its explicit cover independently of articleBody and displays the caption. Unmigrated posts retain their previous metadata and visible-cover behavior.

## Review state

This is a local repair candidate based on main `7c2486d654a8e61bf0a173303e753859dc0da8b9`, not an accepted release. The complete 84-file Git tree was recovered and verified against the pinned source manifest. Locked dependencies installed successfully (Next.js 16.3.0, React 19.2.8). Full project `npm run lint` and `tsc --noEmit --incremental false` passed. Isolated source regression assertions also passed for PU plus the other 17 articles.

`npm run build` stopped before application compilation: SWC failed to canonicalize the Windows checkout directory while loading next.config.ts (`os error 5`, access denied). That build step was stopped without a workaround. Browser automation failed to initialize twice (`trusted Node process exited unexpectedly`). Production build, actual HTTP metadata/MIME output and mobile/desktop browser checks remain unverified. Keep release readiness false until those checks and independent review are complete.

Cement and the other 16 non-PU articles have no newly matched independent cover in this change. Do not reuse the PU image for them. Coordinator and Claude review remain required before any merge or deployment.
