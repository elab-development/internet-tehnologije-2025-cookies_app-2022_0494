# Cookies App

Web aplikacija za upravljanje obrazovnim kursevima namenjena učenicima i administratorima. Platforma omogućava pregled dostupnih kurseva, prijavu na kurseve, praćenje kupljenih kurseva, kao i komunikaciju putem pitanja i odgovora. Administratori imaju mogućnost upravljanja korisnicima, prijavama i sadržajem.

Projekat je razvijen kao studentski projekat u okviru predmeta Internet tehnologije na Visokoj školi elektrotehnike i računarstva (VIŠER), Beograd.

---

## Tehnologije

### Frontend

| Tehnologija | Verzija | Namena |
|---|---|---|
| Next.js | 16 | React framework sa App Routerom i SSR podrškom |
| React | 19 | UI biblioteka |
| TypeScript | 5 | Statičko tipiziranje |
| Tailwind CSS | 4 | Utility-first CSS framework |
| Axios | 1.x | HTTP klijent za API pozive |
| Formik + Yup | 2.x / 1.x | Forme i validacija unosa |
| Framer Motion | 12 | Animacije i tranzicije |
| Lottie React | 2.x | JSON animacije |
| React Icons | 5.x | Ikone (Material Design, Font Awesome) |
| UUID | 13.x | Generisanje jedinstvenih ključeva |

### Backend

| Tehnologija | Verzija | Namena |
|---|---|---|
| Node.js | 20 | JavaScript runtime okruženje |
| Express | 5 | Web framework za REST API |
| MongoDB + Mongoose | Atlas / 8.x | NoSQL baza podataka i ODM |
| JWT (jsonwebtoken) | 9.x | Autentifikacija i autorizacija |
| Bcrypt | 5.x | Hashovanje lozinki |
| Swagger UI + swagger-jsdoc | 5.x / 6.x | Interaktivna API dokumentacija |
| dotenv | 16.x | Upravljanje environment varijablama |
| cors | 2.x | Cross-Origin Resource Sharing |

### Infrastruktura

- **MongoDB Atlas** – cloud NoSQL baza podataka
- **Docker + Docker Compose** – kontejnerizacija i orkestracija servisa
- **Vercel** – hosting frontend aplikacije

---

## Arhitektura

Aplikacija koristi klasičnu **client-server** arhitekturu razdvojenu u dva nezavisna servisa:

- **Frontend** (Next.js) komunicira sa backendom putem REST API poziva
- **Backend** (Express) prima zahteve, vrši autentifikaciju putem JWT middleware-a i komunicira sa MongoDB Atlas bazom
- **Autentifikacija** se zasniva na JWT tokenima koji se čuvaju u httpOnly kolačićima (cookies)
- **Autorizacija** se kontroliše middleware funkcijama koje proveravaju JWT token i ulogu korisnika pre pristupa zaštićenim rutama

---

## Struktura projekta

```
/
├── backend/                  # Express REST API server
│   ├── controllers/          # Logika obrade zahteva (userController, coursesController...)
│   ├── middleware/            # Auth middleware (provjera JWT tokena i uloga)
│   ├── models/               # Mongoose šeme i modeli (User, Course, Application...)
│   ├── routes/               # Express rute (userRoute, coursesRoutes, questionRoutes, roleRoutes)
│   ├── swagger.js            # Swagger/OpenAPI 3.0 konfiguracija
│   ├── index.js              # Ulazna tačka servera, registracija middleware-a i ruta
│   ├── Dockerfile            # Docker konfiguracija za backend
│   └── .env                  # Environment varijable (nije u git repozitorijumu)
├── front/                    # Next.js frontend aplikacija
│   └── src/
│       ├── app/              # Stranice (Next.js App Router)
│       │   ├── kursevi/      # Pregled svih dostupnih kurseva
│       │   ├── moji-kursevi/ # Kursevi koje je korisnik kupio
│       │   ├── nastava/      # Stranica sa sadržajem kursa
│       │   ├── o-nama/       # Informacije o timu
│       │   ├── login/        # Stranica za prijavu
│       │   ├── register/     # Stranica za registraciju
│       │   └── coming-soon/  # Placeholder za buduće stranice
│       ├── components/       # Zajednički React komponenti
│       ├── context/          # React Context (AuthContext za globalno stanje korisnika)
│       └── hooks/            # Custom React hookovi (useAuthContext, useLogin, useRegister...)
│   ├── Dockerfile            # Docker konfiguracija za frontend
│   └── next.config.ts        # Next.js konfiguracija (standalone output za Docker)
├── docker-compose.yml        # Docker Compose orkestracija oba servisa
└── README.md
```

---

## Funkcionalnosti

- Registracija i prijava korisnika sa JWT autentifikacijom
- Pregled svih dostupnih kurseva sa filterima (Frontend, Backend, Office, Na popustu, Aktuelan)
- Pretraga kurseva po ključnim rečima
- Prikaz cene kursa u RSD i konverzija u EUR putem živog deviznog kursa
- IT rečnik widget — pretraga i prikaz definicija tehničkih termina
- Kupovina/prijava na kurs
- Pregled kupljenih kurseva i pristup sadržaju
- Postavljanje pitanja (kontakt forma)
- Admin panel za upravljanje korisnicima, prijavama i ulogama
- Interaktivna Swagger dokumentacija za sve API endpointe

---

## Pokretanje lokalno

### Preduslovi

- Node.js 18+
- npm

### Backend

```bash
cd backend
npm install
npm run dev
```

Server se pokreće na `http://localhost:5000`

### Frontend

```bash
cd front
npm install
npm run dev
```

Aplikacija se pokreće na `http://localhost:3000`

### Environment varijable (backend)

Kreirati fajl `backend/.env` sa sledećim varijablama:

```env
PORT=5000
DB_URI=<MongoDB Atlas connection string>
SECRET=<JWT tajni ključ>
```

---

## Pokretanje sa Dockerom

### Preduslovi

- Docker Desktop instaliran i pokrenut

### Pokretanje

```bash
docker-compose up --build
```

| Servis | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Swagger UI | http://localhost:5000/api-docs |

```bash
# Zaustavljanje i uklanjanje kontejnera
docker-compose down
```

---

## API dokumentacija

Swagger UI je dostupan nakon pokretanja backend-a:

```
http://localhost:5000/api-docs
```

### Endpointi

| Metoda | Putanja | Opis | JWT |
|---|---|---|---|
| POST | `/api/users/register` | Registracija novog korisnika | Ne |
| POST | `/api/users/login` | Prijava korisnika | Ne |
| GET | `/api/users` | Lista svih korisnika | Da |
| DELETE | `/api/users/remove/:id` | Brisanje korisnika | Da |
| GET | `/api/courses` | Lista svih kurseva | Da |
| GET | `/api/courses/:id` | Detalji jednog kursa | Da |
| GET | `/api/courses/my-courses/:userId` | Kursevi korisnika | Da |
| POST | `/api/courses/add-course` | Dodavanje kursa korisniku | Da |
| POST | `/api/courses/applications` | Nova prijava na kurs | Ne |
| GET | `/api/courses/applications` | Lista svih prijava | Da |
| DELETE | `/api/courses/applications/:id` | Brisanje prijave | Da |
| POST | `/api/questions` | Slanje novog pitanja | Ne |
| GET | `/api/questions` | Lista svih pitanja | Ne |
| DELETE | `/api/questions/:id` | Brisanje pitanja | Ne |
| POST | `/api/roles` | Kreiranje nove uloge | Ne |
| GET | `/api/roles` | Lista svih uloga | Ne |
| DELETE | `/api/roles/:id` | Brisanje uloge | Ne |

---

## Autori

**Nemanja Simić** — indeks 2022/0089

**Mihajlo Stajkovac** — indeks 2022/0494

Visoka škola elektrotehnike i računarstva strukovnih studija (VIŠER), Beograd
Predmet: Internet tehnologije, 2024/2025.
