This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. npm i
2. npm run dev

alternativt (prod)

1. npm run build
2. npm run start

## Saker jag inte hann göra / kunde gjort mycket bättre

1. Kunde varit mycket responsivare
2. Glömde impementera "last 7 day" och "last 30 days" på charts
3. Tests

## Litet bug
Alltid när man kör npm run dev (förutom första gången) så dykter inte chartsen upp. Men om man refreshar sidan så dyker dem upp.
Tror det har någonting med att saker server rederas initialt och sedan efter man refreshar sidan så körs den client side (då dykter dem upp igen). Dock händer det inte I prod (npm run build, npm run start)
   
