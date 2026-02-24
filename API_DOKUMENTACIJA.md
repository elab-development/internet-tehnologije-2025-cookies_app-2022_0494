# Dokumentacija eksternih API-ja

## Pregled

U okviru projekta korišćena su dva eksterna API servisa:

1. **Currency API** – konverzija valuta (RSD → EUR) na stranici kurseva
2. **Free Dictionary API** – pretraga definicija IT termina u rečnik widgetu

---

## 1. Currency API

### Naziv servisa

**Currency API** – besplatni servis za kursne liste valuta, hostovan na Cloudflare Pages.

- **Bazna URL adresa:** `https://latest.currency-api.pages.dev`
- **Dokumentacija:** https://github.com/fawazahmed0/exchange-api

### Svrha u okviru aplikacije

Koristi se na stranici `/kursevi` kako bi se prikazala cena kursa i u evrima pored standardne cene u dinarima (RSD). Svaka kartica kursa sadrži ikonicu za promenu valute (`MdCurrencyExchange`). Klikom na ikonicu, cena se konvertuje iz RSD u EUR po trenutnom srednjem kursu koji se preuzima sa ovog API-ja.

Kurs se učitava jednom pri montiranju komponente `AllCourses` i prosleđuje se svakoj kartici kao prop `eurRate`.

### Komunikacija

- **Protokol:** REST
- **Format odgovora:** JSON
- **Autentifikacija:** nije potrebna (javni API, bez API ključa)
- **Metoda:** `GET`

### Endpoint

```
GET https://latest.currency-api.pages.dev/v1/currencies/eur.json
```

Vraća kursnu listu za EUR u odnosu na sve valute sveta, uključujući RSD (srpski dinar).

### Primer zahteva

```javascript
fetch("https://latest.currency-api.pages.dev/v1/currencies/eur.json")
  .then((res) => res.json())
  .then((data) => setEurRate(data.eur.rsd))
  .catch(() => {});
```

### Primer odgovora (skraćen)

```json
{
  "date": "2025-06-01",
  "eur": {
    "usd": 1.08,
    "rsd": 117.15,
    "gbp": 0.85,
    "chf": 0.96,
    "...": "..."
  }
}
```

Koristi se vrednost `data.eur.rsd` (npr. `117.15`) — to znači da je 1 EUR = 117.15 RSD.

### Konverzija cene

```typescript
const eurPrice = eurRate
  ? (parseFloat(price as string) / eurRate).toFixed(2)
  : null;
```

Na primer, kurs od 6000 RSD uz kurs 117.15 daje: `6000 / 117.15 ≈ 51.22 EUR`.

### Integracija u projektu

**Fajl:** `front/src/components/AllCourses.tsx`

```typescript
const [eurRate, setEurRate] = useState<number | undefined>(undefined);

useEffect(() => {
  fetch("https://latest.currency-api.pages.dev/v1/currencies/eur.json")
    .then((res) => res.json())
    .then((data) => setEurRate(data.eur.rsd))
    .catch(() => {});
}, []);
```

**Fajl:** `front/src/components/Course.tsx`

```tsx
const eurPrice = eurRate
  ? (parseFloat(price as string) / eurRate).toFixed(2)
  : null;

// Prikaz cene u zavisnosti od stanja showEur:
{showEur && eurPrice
  ? <h2>{eurPrice} EUR</h2>
  : <h2>{price} RSD</h2>
}
```

---

## 2. Free Dictionary API

### Naziv servisa

**Free Dictionary API** – besplatni engleski rečnik koji vraća definicije, primere upotrebe i gramatičke kategorije reči.

- **Bazna URL adresa:** `https://api.dictionaryapi.dev`
- **Dokumentacija:** https://dictionaryapi.dev

### Svrha u okviru aplikacije

Koristi se u `DictionaryWidget` komponenti koja je prikazana kao fiksni widget u donjem desnom uglu stranice `/kursevi`. Korisnik može da unese IT termin na engleskom (npr. `API`, `algorithm`, `cache`, `server`) i dobije definiciju sa primerom upotrebe. Widget se otvara/zatvara klikom na ikonicu knjige.

Servis je posebno koristan za studente koji se susreću sa nepoznatim tehničkim terminima tokom pregleda kurseva.

### Komunikacija

- **Protokol:** REST
- **Format odgovora:** JSON
- **Autentifikacija:** nije potrebna (javni API, bez API ključa)
- **Metoda:** `GET`

### Endpoint

```
GET https://api.dictionaryapi.dev/api/v2/entries/en/{word}
```

| Parametar | Opis |
|-----------|------|
| `{word}` | Reč koja se pretražuje (URL-enkodovana) |

### Primer zahteva

```javascript
const res = await fetch(
  `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
);
const data = await res.json();
const result = data[0]; // Uzimamo prvi rezultat
```

### Primer odgovora za reč "API"

```json
[
  {
    "word": "API",
    "meanings": [
      {
        "partOfSpeech": "noun",
        "definitions": [
          {
            "definition": "Application Programming Interface: a set of routines, protocols, and tools for building software applications.",
            "example": "The API allows developers to access the service programmatically."
          }
        ]
      }
    ]
  }
]
```

### HTTP status kodovi

| Kod | Značenje |
|-----|----------|
| `200 OK` | Reč pronađena, odgovor sadrži definicije |
| `404 Not Found` | Reč nije pronađena u rečniku |

### Obrada grešaka

```typescript
if (!res.ok) {
  setError("Termin nije pronađen. Pokušaj na engleskom (npr. API, server, algorithm).");
  return;
}
```

### Struktura prikaza u widgetu

Prikazuju se:
- Naziv reči (`result.word`)
- Do **2 gramatičke kategorije** (`meanings.slice(0, 2)`)
- Do **2 definicije** po kategoriji (`definitions.slice(0, 2)`)
- Primer upotrebe, ako postoji (`def.example`)

### Integracija u projektu

**Fajl:** `front/src/components/DictionaryWidget.tsx`

```typescript
const search = async (e: React.FormEvent) => {
  e.preventDefault();
  const word = query.trim();
  if (!word) return;
  setLoading(true);
  setError("");
  setResult(null);
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
    );
    if (!res.ok) {
      setError("Termin nije pronađen. Pokušaj na engleskom (npr. API, server, algorithm).");
      return;
    }
    const data = await res.json();
    setResult(data[0]);
  } catch {
    setError("Greška pri pretrazi. Provjeri internet konekciju.");
  } finally {
    setLoading(false);
  }
};
```

---

## Poređenje korišćenih API-ja

| Karakteristika | Currency API | Free Dictionary API |
|----------------|--------------|---------------------|
| Svrha | Kursna lista valuta | Definicije reči |
| Endpoint | `/v1/currencies/eur.json` | `/api/v2/entries/en/{word}` |
| Metoda | GET | GET |
| Format | JSON | JSON |
| Autentifikacija | Nije potrebna | Nije potrebna |
| Ograničenja | Nema | Nema |
| Učestalost poziva | Jednom pri učitavanju | Na zahtev korisnika |
| Obrada greške | Tiho (catch prazan) | Poruka korisniku |

---

## Napomene

- Oba API-ja su **besplatna i javno dostupna** bez registracije ili API ključa.
- Podaci se preuzimaju **isključivo na klijentskoj strani** (Next.js client komponente označene sa `"use client"`).
- Currency API koristi Cloudflare Pages infrastrukturu i redovno se ažurira (jednom dnevno).
- Dictionary API podržava samo engleski jezik — zbog toga widget sugeriše pretragu IT termina na engleskom.
