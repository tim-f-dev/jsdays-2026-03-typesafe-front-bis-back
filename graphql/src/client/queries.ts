// GraphQL Query-Dokumente
// Diese werden vom Codegen gelesen und daraus TypeScript-Typen generiert.
// Der Client bestimmt hier exakt welche Felder er braucht –
// das ist der zentrale Vorteil von GraphQL gegenüber REST.

import { gql } from "graphql-request";

// --- Tracks ---

export const TRACKS_QUERY = gql`
  query GetTracks {
    tracks {
      id
      name
      color
    }
  }
`;

// --- Talks mit verschachtelten Daten ---
// Anders als bei REST können wir Speaker- und Track-Daten
// direkt in der Talk-Query mitladen – eine einzige Anfrage!

export const TALKS_QUERY = gql`
  query GetTalks {
    talks {
      id
      title
      abstract
      startTime
      speaker {
        name
      }
      track {
        name
        color
      }
    }
  }
`;

export const TALK_QUERY = gql`
  query GetTalk($id: ID!) {
    talk(id: $id) {
      id
      title
      abstract
      startTime
      speaker {
        name
        company
      }
      track {
        name
        color
      }
    }
  }
`;

// --- Speakers ---
// Aufgabe:
// 1. Erstelle eine Query SPEAKERS_QUERY die alle Speaker lädt
//    (id, name, bio, company)
// 2. Führe `npm run generate` aus um die Typen zu aktualisieren
// 3. Nutze die Query in main.ts (siehe Kommentar dort)
//
// Tipp: Schau dir TRACKS_QUERY als Vorlage an.
//
// Uncomment und ergänze die fehlenden Felder (name, bio, company):
// export const SPEAKERS_QUERY = gql`
//   query GetSpeakers {
//     speakers {
//       id
//     }
//   }
// `;

