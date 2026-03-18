# GraphQL – Hands-on

## Setup

```bash
npm run dev
```

App läuft unter [http://localhost:5104](http://localhost:5104).

Hilfreiche URLs:
- **GraphiQL:** [http://localhost:3004/graphql](http://localhost:3004/graphql) – interaktiver Query-Explorer (Autocompletion!)

## Aufgabe

Tracks und Talks werden bereits angezeigt. Deine Aufgabe: **Speaker-Query schreiben, Typen generieren und im Client nutzen.**

### 1. Query schreiben (`src/client/queries.ts`)

Schreibe eine GraphQL-Query `GetSpeakers`, die alle Speaker mit ihren Feldern lädt.

> **Tipp:** Öffne GraphiQL im Browser und nutze die Autocompletion (`Ctrl+Space`), um die verfügbaren Felder zu erkunden. Das Schema und die Resolver sind bereits fertig!

### 2. Typen generieren

> **Wichtig:** Der Server muss laufen, bevor du `npm run generate` ausführst. Wenn du `npm run dev` verwendest, läuft er bereits. Andernfalls starte ihn mit `npm run server`.

```bash
npm run generate
```

Das liest das Schema + deine Queries vom laufenden Server und generiert TypeScript-Typen in `src/client/generated/graphql.ts`.

### 3. Client nutzen (`src/client/main.ts`)

Importiere den generierten Query-Typ und lade die Speaker-Daten.

## Kurzreferenz

### GraphQL-Query schreiben

```ts
export const MY_QUERY = gql`
  query GetThings {
    things {
      id
      name
      nested {
        field
      }
    }
  }
`;
```

Bei GraphQL bestimmst **du als Client**, welche Felder geladen werden – nicht der Server.

### Typisierter Client-Aufruf

```ts
import type { GetThingsQuery } from "./generated/graphql";

const { things } = await client.request<GetThingsQuery>(MY_QUERY);
// things[0].name → typisiert!
```

### Nested Data in einer Query

GraphQL kann verschachtelte Daten in einem einzigen Request laden:

```graphql
query {
  talks {
    title
    speaker {      # ← Resolver löst die Beziehung auf
      name
    }
  }
}
```

## Stolperfallen

- **Codegen nach jeder Query-Änderung:** `npm run generate` neu ausführen. Der Server muss dafür laufen!
- **Query-Name = Typ-Name:** Die Query `GetSpeakers` generiert den Typ `GetSpeakersQuery`. Den brauchst du als Typ-Parameter für `client.request<...>()`.
- **Felder explizit anfordern:** GraphQL gibt nur die Felder zurück, die in der Query stehen. `id` vergessen? Dann fehlt es im Ergebnis.
- **`gql`-Template-Tag:** Ist ein reiner Marker – importiert von `graphql-request`. Er sorgt dafür, dass der Codegen die Query findet.
- **Schema vs. Query:** Das Schema (Typen, Resolver) definiert was *möglich* ist. Die Query definiert was *geladen* wird.
