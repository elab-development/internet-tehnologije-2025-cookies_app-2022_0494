# Cookies App

Web aplikacija za upravljanje obrazovnim kursevima. Korisnici mogu pregledati dostupne kurseve, prijaviti se na njih, pratiti svoje kurseve i postavljati pitanja. Administratori upravljaju kursevima, prijavama i korisnicima.

## Tehnologije

**Frontend**
- Next.js 16 (React 19, TypeScript)
- Tailwind CSS 4
- Axios
- Formik + Yup (forme i validacija)
- Framer Motion (animacije)
- Lottie React (animacije)

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT autentifikacija (`jsonwebtoken`)
- Bcrypt (hashovanje lozinki)
- Swagger / OpenAPI 3.0 (API dokumentacija)

**Infrastruktura**
- MongoDB Atlas (cloud baza podataka)
- Docker + Docker Compose

## Struktura projekta

```
/
├── backend/                  # Express REST API
│   ├── controllers/          # Logika endpointa
│   ├── middleware/           # Auth middleware
│   ├── models/               # Mongoose modeli
│   ├── routes/               # Express rute
│   ├── swagger.js            # Swagger konfiguracija
│   ├── index.js              # Ulazna tačka servera
│   └── .env                  # Environment varijable
├── front/                    # Next.js aplikacija
│   └── src/
│       ├── app/              # Stranice (App Router)
│       │   ├── kursevi/      # Pregled kurseva
│       │   ├── moji-kursevi/ # Kursevi korisnika
│       │   ├── nastava/      # Nastava
│       │   ├── o-nama/       # O nama
│       │   ├── login/        # Prijava
│       │   ├── register/     # Registracija
│       │   └── coming-soon/  # Coming soon
│       └── components/       # Zajednički komponenti
├── docker-compose.yml        # Docker orkestracija
└── README.md
```

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

Kreiran fajl `backend/.env` sa sledećim varijablama:

```env
PORT=5000
DB_URI=<MongoDB Atlas connection string>
SECRET=<JWT tajni ključ>
```

## Pokretanje sa Dockerom

### Preduslovi

- Docker Desktop

### Komanda

```bash
docker-compose up --build
```

| Servis | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |

```bash
# Zaustavljanje
docker-compose down
```

## API dokumentacija

Swagger UI dostupan nakon pokretanja backend-a:

```
http://localhost:5000/api-docs
```

### Endpointi

| Metoda | Putanja | Opis | JWT |
|---|---|---|---|
| POST | `/api/users/register` | Registracija korisnika | Ne |
| POST | `/api/users/login` | Prijava | Ne |
| GET | `/api/users` | Svi korisnici | Da |
| DELETE | `/api/users/remove/:id` | Brisanje korisnika | Da |
| GET | `/api/courses` | Svi kursevi | Da |
| GET | `/api/courses/:id` | Jedan kurs | Da |
| GET | `/api/courses/my-courses/:userId` | Kursevi korisnika | Da |
| POST | `/api/courses/add-course` | Dodaj kurs korisniku | Da |
| POST | `/api/courses/applications` | Nova prijava na kurs | Ne |
| GET | `/api/courses/applications` | Sve prijave | Da |
| DELETE | `/api/courses/applications/:id` | Brisanje prijave | Da |
| POST | `/api/questions` | Novo pitanje | Ne |
| GET | `/api/questions` | Sva pitanja | Ne |
| DELETE | `/api/questions/:id` | Brisanje pitanja | Ne |
| POST | `/api/roles` | Nova uloga | Ne |
| GET | `/api/roles` | Sve uloge | Ne |
| DELETE | `/api/roles/:id` | Brisanje uloge | Ne |

## Autori

Nemanja Simić - 2022/0089
Mihajlo Stajkovac - 2022/0494

