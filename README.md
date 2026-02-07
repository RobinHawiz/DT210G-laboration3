# DT210G-Laboration3

Målet med uppgiften är att skapa en Single Page Application (SPA) med React och TypeScript. Applikationen ska kommunicera med ett befintligt backend-API som hanterar CRUD-operationer för item-objekt och sköter autentisering med JWT-tokens.

Backend-API:et som används går att hitta här: [DT210G-laboration3-backend](https://github.com/RobinHawiz/DT210G-laboration3-backend)

## Frontend

Obligatorisk funktionalitet:

- Publik del med översikt av innehåll, tex de senaste produkterna utskrivna
- Dynamiska routes för enskilda items
- Inloggningssystem med JWT-tokens
- Skyddad administrativ del för innehållshantering (hantera produkter)
- Navigationsmeny som uppdateras efter inloggningsstatus (det ska framgå om användaren är inloggad eller inte).

## Tekniska krav

Implementationen ska uppfylla följande tekniska krav:

- React Router för routingstruktur med navigering i gränsnittet.
- JWT-autentisering med tokenhantering, antingen lagrat i localStorage eller som HTTP-cookie.
- TypeScript med väldefinierade interface/types
- Responsiv design för olika skärmstorlekar
- Felhantering och tydliga felmeddelanden vid formulärhantering och API-anrop

## Valfri funktionalitet

I denna laboration har jag valt att använda [TanStack Query](https://tanstack.com/query/v5/docs/framework/react/overview) för datahämtning och cachehantering.
Det minskar behovet av manuell state-hantering med `useState`/`useEffect` för API-anrop och gör det enklare att hantera laddningsstatus och fel som uppstår.

Jag använder även bibliotekets cache för att minska antalet onödiga anrop mot backend.
I praktiken hämtas data en gång och betraktas sedan som aktuell tills appen själv gör en ändring (t.ex. skapa, uppdatera eller ta bort item).
Vid sådana förändringar/mutationer uppdateras eller invalideras relevanta queries så att gränssnittet hålls synkroniserat.

En begränsning är att ändringar som sker utanför appen inte visas direkt, men det är ett medvetet val i denna uppgift.
