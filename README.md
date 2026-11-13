# Karrygo

Karrygo is an interactive visual prototype for a coordinated school transport and meals platform.

## View the prototype

Once the **Deploy Karrygo prototype to GitHub Pages** workflow completes, the prototype is available at:

**https://ikaminu.github.io/Karrygo/**

## Deploy

Every push to `main` automatically installs dependencies, builds the Vite app and deploys the `dist` directory to GitHub Pages. You can also start a deployment manually from **Actions → Deploy Karrygo prototype to GitHub Pages → Run workflow**.

In repository settings, ensure **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions**.

## Run locally

Requirements: Node.js 22.12+ and pnpm 9.

```bash
pnpm install
pnpm dev
```

Create a production build with:

```bash
pnpm build
pnpm preview
```

## Prototype status

This is a demonstration interface using sample records and simulated interactions. It is not connected to a production database, real-time GPS, payment processing, identity verification or live notifications. Do not enter real children's or customer information.

The prototype includes role-based visual workspaces for parents, Karrygo operations, drivers, schools, food vendors and fleet partners. The role switcher is for demonstration only and is not an authentication or access-control system.
