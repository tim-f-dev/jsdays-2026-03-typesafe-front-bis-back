# Server Functions (Next.js) – Hands-on

> **Optionale Zusatzübung** – für alle, die mit den anderen Aufgaben fertig sind.

## Setup

```bash
npm run dev
```

Öffnet den **Next.js Dev-Server** unter [http://localhost:3005](http://localhost:3005).

Kein separater Server, kein separater Client – alles in einem.

## Aufgabe

Tracks und Talks werden bereits angezeigt. Deine Aufgabe: **Speaker-Funktionen implementieren und in der Seite nutzen.**

### 1. Funktionen schreiben (`src/lib/data.ts`)

Implementiere `getSpeakers()` und `getSpeaker(id)` – analog zu den vorhandenen Funktionen für Tracks und Talks.

### 2. Seite erweitern (`src/app/page.tsx`)

Importiere deine Funktionen, rufe sie auf und rendere die Speaker-Cards.

Das war's. Kein Router, kein Client-Library, kein Schema, kein Codegen.

## Kurzreferenz

### Server-Funktion

```ts
export function getThings() {
  const { things } = loadData();
  return things;
}
```

Das ist eine ganz normale TypeScript-Funktion. Sie läuft auf dem Server, weil sie nur von einer Server Component importiert wird.

### Server Component (async)

```tsx
export default async function Page() {
  const things = getThings();

  return (
    <main>
      {things.map((t) => (
        <div key={t.id}>
          <h3>{t.name}</h3>
        </div>
      ))}
    </main>
  );
}
```

Die `Page`-Funktion ist eine **Server Component** – sie wird auf dem Server ausgeführt und kann direkt auf Dateisystem, Datenbanken oder andere Server-Ressourcen zugreifen.

### JSX-Grundlagen

Falls du noch nicht mit React/JSX gearbeitet hast:

- `className` statt `class`
- Expressions in geschweiften Klammern: `{variable}`
- Listen mit `.map()` rendern, jedes Element braucht ein `key`-Prop
- Inline-Styles als Objekt: `style={{ color: "red" }}`

## Stolperfallen

- **Kein API-Endpunkt:** Die Funktionen sind nicht von außen erreichbar – sie laufen nur auf dem Server. Das ist Absicht und die größte Einschränkung dieses Ansatzes.
- **Kein Zod, kein Schema:** Die Typen fließen direkt durch TypeScript. Validierung passiert hier nicht, weil Server und Client derselbe Prozess sind.
- **Hot Reload:** Next.js aktualisiert die Seite automatisch nach Änderungen – kein manuelles Neuladen nötig.
- **`async function Page`:** Server Components in Next.js dürfen `async` sein und direkt Daten laden – kein `useEffect`, kein `useState` nötig.
