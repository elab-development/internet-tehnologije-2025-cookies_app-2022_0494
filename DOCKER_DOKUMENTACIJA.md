# Dokumentacija — Dockerizacija aplikacije

## Sadržaj

1. [Uvod i tehnologije](#1-uvod-i-tehnologije)
2. [Struktura projekta](#2-struktura-projekta)
3. [Šta je Docker i zašto se koristi](#3-šta-je-docker-i-zašto-se-koristi)
4. [Kreirana i izmenjena datoteka po datoteka](#4-kreirana-i-izmenjena-datoteka-po-datoteka)
   - [backend/Dockerfile](#41-backenddockerfile)
   - [front/Dockerfile](#42-frontdockerfile)
   - [docker-compose.yml](#43-docker-composeyml)
   - [backend/.dockerignore](#44-backenddockerignore)
   - [front/.dockerignore](#45-frontdockerignore)
   - [front/next.config.ts](#46-frontnextconfigts)
5. [Ispravka TypeScript greške](#5-ispravka-typescript-greške)
6. [Pokretanje aplikacije](#6-pokretanje-aplikacije)
7. [Korisne Docker komande](#7-korisne-docker-komande)

---

## 1. Uvod i tehnologije

Aplikacija se sastoji od dva odvojena servisa:

| Servis   | Tehnologija         | Port |
|----------|---------------------|------|
| Backend  | Node.js + Express   | 5000 |
| Frontend | Next.js (React + TypeScript + Tailwind CSS) | 3000 |

Backend komunicira sa **MongoDB Atlas** bazom podataka koja je hostovana u cloudu, što znači da nije potrebno pokretati MongoDB kao poseban Docker kontejner.

---

## 2. Struktura projekta

```
/
├── docker-compose.yml          ← orkestracija svih servisa
├── DOCKER_DOKUMENTACIJA.md     ← ovaj fajl
├── backend/
│   ├── Dockerfile              ← upustvo za izgradnju backend image-a
│   ├── .dockerignore           ← fajlovi koji se isključuju iz image-a
│   ├── index.js
│   ├── package.json
│   └── .env                    ← environment varijable (PORT, DB_URI, SECRET)
└── front/
    ├── Dockerfile              ← upustvo za izgradnju frontend image-a
    ├── .dockerignore           ← fajlovi koji se isključuju iz image-a
    ├── next.config.ts          ← izmenjen da podrži standalone output
    └── src/
```

---

## 3. Šta je Docker i zašto se koristi

**Docker** je platforma za kontejnerizaciju aplikacija. Kontejner je izolovano okruženje koje sadrži sve što je potrebno za pokretanje aplikacije: kod, runtime, biblioteke i konfiguraciju.

### Prednosti korišćenja Dockera:

- **Prenosivost** — aplikacija radi identično na svakom računaru, serveru ili cloud platformi, bez problema sa različitim verzijama Node.js ili OS-a.
- **Izolacija** — backend i frontend rade u odvojenim kontejnerima i ne mešaju međusobne zavisnosti.
- **Jednostavno pokretanje** — cela aplikacija se pokreće jednom komandom (`docker-compose up`).
- **Reproducibilnost** — svaki build uvek daje isti rezultat.

### Ključni koncepti:

- **Image** — "recept" za kontejner, izgradjen iz Dockerfile-a. Sadrži fajlove i konfiguraciju ali ne radi.
- **Kontejner** — pokrenuta instanca image-a. Radi kao izolovan proces.
- **Dockerfile** — tekstualni fajl sa instrukcijama za izgradnju image-a.
- **docker-compose** — alat koji omogućava definisanje i pokretanje više kontejnera zajedno.

---

## 4. Kreirana i izmenjena datoteka po datoteka

### 4.1 `backend/Dockerfile`

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
```

**Objašnjenje instrukcija:**

| Instrukcija | Objašnjenje |
|---|---|
| `FROM node:20-alpine` | Bazni image — Node.js verzija 20 na Alpine Linux (minimalna distribucija, ~5MB). |
| `WORKDIR /app` | Postavlja radni direktorijum unutar kontejnera. Sve naredne komande se izvršavaju u `/app`. |
| `COPY package*.json ./` | Kopira `package.json` i `package-lock.json` u kontejner pre ostatka koda. Ovo se radi namerno — Docker kešira svaki korak, pa ako se `package.json` nije promenio, `npm install` se neće ponavljati pri sledećem buildu. |
| `RUN npm install --omit=dev` | Instalira samo production zavisnosti (izostavlja `devDependencies`). Smanjuje veličinu image-a. |
| `COPY . .` | Kopira ostatak koda projekta u kontejner. |
| `EXPOSE 5000` | Dokumentuje da kontejner koristi port 5000 (ne otvara ga automatski — to radi `docker-compose`). |
| `CMD ["node", "index.js"]` | Komanda koja se izvršava kada kontejner startuje — pokreće Express server. |

---

### 4.2 `front/Dockerfile`

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

**Objašnjenje — Multi-stage build:**

Frontend Dockerfile koristi **multi-stage build** — tehniku gde se build proces deli u više faza. Ovo je standardna praksa za Next.js aplikacije.

**Faza 1 — `builder`:**

| Instrukcija | Objašnjenje |
|---|---|
| `FROM node:20-alpine AS builder` | Startuje prvu fazu i daje joj ime `builder`. |
| `COPY package*.json ./` | Kopira dependency fajlove radi Docker cache optimizacije. |
| `RUN npm install` | Instalira sve zavisnosti, uključujući `devDependencies` koje su potrebne za build. |
| `COPY . .` | Kopira ceo izvorni kod. |
| `RUN npm run build` | Kompajlira Next.js aplikaciju u optimizovani production build. Generiše `.next/standalone` direktorijum. |

**Faza 2 — `runner`:**

| Instrukcija | Objašnjenje |
|---|---|
| `FROM node:20-alpine AS runner` | Startuje novu, čistu fazu. Sve iz faze `builder` se odbacuje osim onoga što se eksplicitno kopira. |
| `ENV NODE_ENV=production` | Postavlja environment varijablu koja govori Next.js-u da radi u production modu. |
| `COPY --from=builder /app/public ./public` | Kopira statičke fajlove (slike, fontovi, itd.) iz builder faze. |
| `COPY --from=builder /app/.next/standalone ./` | Kopira minimalni standalone server koji Next.js generiše. Sadrži samo što je potrebno za pokretanje — bez `node_modules` kompletnih. |
| `COPY --from=builder /app/.next/static ./.next/static` | Kopira kompajlirane JS/CSS fajlove koji se serviraju klientu. |
| `CMD ["node", "server.js"]` | Pokreće Next.js server generisan od strane standalone outputa. |

**Zašto multi-stage?** Finalni image sadrži samo runtime fajlove, bez izvornog koda, bez `devDependencies`, bez kompajlera. Rezultat je image koji je višestruko manji od alternativnog pristupa.

---

### 4.3 `docker-compose.yml`

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    env_file:
      - ./backend/.env
    restart: unless-stopped

  frontend:
    build: ./front
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000
    depends_on:
      - backend
    restart: unless-stopped
```

**Objašnjenje:**

`docker-compose.yml` definiše sve servise aplikacije i kako oni međusobno funkcionišu. To je centralna konfiguraciona datoteka.

**Sekcija `backend`:**

| Ključ | Objašnjenje |
|---|---|
| `build: ./backend` | Docker treba da izgradi image iz Dockerfile-a koji se nalazi u `./backend` folderu. |
| `ports: "5000:5000"` | Mapiranje portova u formatu `HOST:KONTEJNER`. Port 5000 na host mašini se mapira na port 5000 unutar kontejnera. |
| `env_file: ./backend/.env` | Učitava environment varijable iz `.env` fajla i prosleđuje ih kontejneru. |
| `restart: unless-stopped` | Kontejner se automatski restartuje ako padne, osim ako nije ručno zaustavljen. |

**Sekcija `frontend`:**

| Ključ | Objašnjenje |
|---|---|
| `build: ./front` | Docker treba da izgradi image iz Dockerfile-a koji se nalazi u `./front` folderu. |
| `ports: "3000:3000"` | Port 3000 na host mašini mapiran na port 3000 unutar kontejnera. |
| `environment` | Direktno definisanje environment varijabli (bez fajla). `NEXT_PUBLIC_API_URL` govori frontend-u gde se nalazi backend API. |
| `depends_on: backend` | Frontend kontejner neće startovati pre nego što backend kontejner bude pokrenut. |
| `restart: unless-stopped` | Automatski restart pri padu. |

---

### 4.4 `backend/.dockerignore`

```
node_modules
.env
*.log
```

**Objašnjenje:**

`.dockerignore` funkcioniše slično kao `.gitignore` — govori Dockeru koje fajlove i foldere treba ignorisati pri kopiranju sadržaja u image.

| Stavka | Razlog isključivanja |
|---|---|
| `node_modules` | Zavisnosti se instaliraju unutar kontejnera komandom `npm install`. Kopiranje `node_modules` sa host mašine bi moglo dovesti do nekompatibilnosti ako host koristi drugačiji OS od Alpine Linux-a. |
| `.env` | Sadrži osetljive podatke (lozinke, API ključeve). U kontejner se prosleđuje kroz `env_file` u `docker-compose.yml`. |
| `*.log` | Log fajlovi nisu deo aplikacije i nepotrebno povećavaju veličinu image-a. |

---

### 4.5 `front/.dockerignore`

```
node_modules
.next
*.log
```

| Stavka | Razlog isključivanja |
|---|---|
| `node_modules` | Isti razlog kao kod backend-a. |
| `.next` | Lokalno kompajlirani build fajlovi. Build se obavlja unutar kontejnera, ne kopira se sa host mašine. |
| `*.log` | Nepotrebni log fajlovi. |

---

### 4.6 `front/next.config.ts` — izmena

**Pre izmene:**
```typescript
const nextConfig: NextConfig = {
  /* config options here */
};
```

**Nakon izmene:**
```typescript
const nextConfig: NextConfig = {
  output: "standalone",
};
```

**Objašnjenje:**

Dodavanje `output: "standalone"` je **obavezno** za Docker deployment Next.js aplikacije. Ova opcija instruira Next.js kompajler da pri buildu generiše `standalone` verziju servera.

Bez ove opcije, `npm run build` ne bi generisao `server.js` fajl niti `.next/standalone` direktorijum — koji su neophodni za pokretanje aplikacije u Docker kontejneru bez kompletnih `node_modules`.

Standalone output automatski analizira koje zavisnosti su stvarno potrebne za pokretanje servera i uključuje samo njih, što rezultuje mnogo manjim finalnim image-om.

---

## 5. Ispravka TypeScript greške

Tokom prvog pokušaja izgradnje Docker image-a, build je pao sa sledećom greškom:

```
Type error: Type 'string' has no properties in common with type
'Properties<string | number, string & {}>'.

./src/components/Nav.tsx:60:117
<HiMenu style={"font-size:2.1rem"}/>
```

**Uzrok:** React `style` prop očekuje JavaScript objekat sa camelCase svojstvima, a ne CSS string. TypeScript je ispravno prijavio ovu grešku.

**Ispravka u `front/src/components/Nav.tsx`:**

```tsx
// Pogrešno — string nije validan tip za style prop
<HiMenu style={"font-size:2.1rem"}/>

// Ispravno — objekat sa camelCase svojstvima
<HiMenu style={{fontSize: "2.1rem"}}/>
```

Ova greška nije bila vidljiva tokom lokalnog razvoja jer je `next dev` (development mode) tolerantniji prema tipovima, ali `next build` (production build koji se koristi u Dockerfile-u) pokreće puni TypeScript type-check i prijavljuje sve greške.

---

## 6. Pokretanje aplikacije

### Preduslovi

- Instaliran [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Docker Desktop mora biti pokrenut

### Komanda za pokretanje

Iz **root foldera projekta** (gde se nalazi `docker-compose.yml`):

```bash
docker-compose up --build
```

**Objašnjenje zastavice `--build`:** Primorava Docker da uvek iznova izgradi image-e. Bez ove zastavice, Docker bi koristio keširane image-e iz prethodnog pokretanja, što može dovesti do toga da izmene u kodu nisu primenjene.

### Rezultat

```
[+] Running 2/2
 ✔ Container backend   Started
 ✔ Container frontend  Started
```

- Frontend dostupan na: `http://localhost:3000`
- Backend API dostupan na: `http://localhost:5000`

### Zaustavljanje aplikacije

```bash
docker-compose down
```

Ova komanda zaustavlja i uklanja kontejnere, ali čuva izgrađene image-e.

---

## 7. Korisne Docker komande

| Komanda | Objašnjenje |
|---|---|
| `docker-compose up --build` | Izgradi image-e i pokreni sve kontejnere. |
| `docker-compose up` | Pokreni kontejnere koristeći postojeće image-e. |
| `docker-compose down` | Zaustavi i ukloni kontejnere. |
| `docker-compose logs -f backend` | Prati live logove backend kontejnera. |
| `docker-compose logs -f frontend` | Prati live logove frontend kontejnera. |
| `docker images` | Prikaži listu svih izgrađenih image-a na sistemu. |
| `docker ps` | Prikaži listu svih trenutno pokrenutih kontejnera. |
| `docker-compose up --build backend` | Rebuildi i pokreni samo backend servis. |
| `docker build -t cookies-backend ./backend` | Ručno izgradi backend image sa nazivom `cookies-backend`. |
| `docker build -t cookies-frontend ./front` | Ručno izgradi frontend image sa nazivom `cookies-frontend`. |

---

*Dokumentacija obuhvata kompletnu dockerizaciju full-stack aplikacije sa Next.js frontendom i Express.js backendom.*
