# tabby-checkout

A production-style checkout prototype of the Tabby BNPL flow built with:

- Vite
- React + TypeScript
- Tailwind CSS
- Zustand

## Flow

1. OTP verification (`8888` for successful login)
2. Plan selection with installment calculations
3. Payment review + payment method modal + cashback impact on due today
4. Success screen with animated feedback and loader

## UX Features

- Componentized architecture for targeted edits
- Desktop-first layout matching provided Figma screens
- Mobile responsive behavior with bottom-sheet modals
- Light/dark theme toggle in header
- Skeleton loaders on plan and payment pages
- CTA loading states and success motion
- Close confirmation modal

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run build
npm run lint
```
