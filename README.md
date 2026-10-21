# Passport York account recovery prototype

Static visual mockups for the Passport York sign-in, password reset, and recovery-email journeys. These screens are intended for design review and implementation by the team with access to the Passport York SDK.

## Run locally

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `index.html` through the local server for the interactive journey map and links to every screen. No package installation, build, environment variables, or backend is required. The overview loads Mermaid and SVG Pan Zoom from jsDelivr; individual screens use local assets only.

## Visual direction

The shared layout follows the supplied Passport York service examples: a white York University header, full-width York red service banner, a 1140px content area, blue section headings and primary actions, square form controls, contextual guidance, flat status panels, and a shared support footer. Forms and guidance stack on smaller screens. Prototype navigation is kept in the footer so it does not compete with the service identity.

`styles.css` owns the shared visual tokens and responsive layout. Each HTML page includes the same accessible header, skip link, main region, and footer. `app.js` retains the existing journey interactions. The journey overview remains a design-review tool rather than a service screen.

## Review journeys

- Sign in: `login.html` → `signed-in.html`.
- Password reset: `password-reset.html?flow=happy` → code → new password → completion.
- Missing recovery email: `password-reset.html?flow=no-recovery` → recovery unavailable → update recovery email.
- Recovery email: `update-recovery-email-1.html` with either `flow=happy` or `flow=no-recovery` → current/new recovery email → verification → completion.
- Error state: `password-reset-error.html`.

Use synthetic values only. Forms simulate navigation; they do not authenticate, send email, validate one-time codes against a service, save an email address, or change a password. The displayed password requirements and sample masked email are placeholders. The real SDK implementation must supply policy, validation, session state, and server responses.

## Designer handoff

Use the supplied service screenshots as the visual reference and these pages as the journey/content reference. This repository does not include or integrate the new SDK. Reuse official SDK components, typography, York and Passport York brand assets, and approved support/policy destinations in the real implementation. The existing York image and text Passport York identifier are prototype assets. No personal details from the reference screenshots are reproduced.

## Validation

The visual refresh was checked in Chromium at 1440px and 390px widths, with functional checks for diagram rendering, sign-in navigation, password visibility, both reset branches, code navigation, password mismatch feedback, successful reset, and both recovery-email journeys. All local page and asset references were checked. JavaScript syntax can be checked with `node --check app.js`.
