import { GraphQLClient } from "graphql-request";
import type {
  GetTracksQuery,
  GetTalksQuery,
} from "../../generated/graphql.js";
import { TRACKS_QUERY, TALKS_QUERY } from "./queries.js";

// GraphQL-Client – Vite proxied /graphql zum Server (siehe vite.config.ts)
const client = new GraphQLClient(`${window.location.origin}/graphql`);
const app = document.getElementById("app")!;

async function render() {
  let html = "";

  // --- Tracks ---
  try {
    const { tracks } = await client.request<GetTracksQuery>(TRACKS_QUERY);
    html += `<h2>Tracks</h2>`;
    tracks.forEach((t) => {
      html += `<span class="tag" style="background:${t.color}">${t.name}</span> `;
    });
  } catch {
    app.innerHTML = `<div class="error">Fehler: Server erreichbar? (npm run server)</div>`;
    return;
  }

  // --- Talks ---
  // Beachte: Speaker-Name und Track-Daten kommen direkt aus der
  // verschachtelten Query – kein zweiter Request nötig!
  try {
    const { talks } = await client.request<GetTalksQuery>(TALKS_QUERY);
    html += `<h2>Talks</h2>`;
    talks.forEach((t) => {
      html += `
        <div class="card">
          <h3>${t.title}</h3>
          <p>${t.abstract}</p>
          <p><small>Speaker: ${t.speaker?.name ?? "–"} · Track: ${t.track ? `<span class="tag" style="background:${t.track.color}">${t.track.name}</span>` : "–"}</small></p>
        </div>`;
    });
  } catch (e) {
    html += `<div class="error">Fehler beim Laden der Talks</div>`;
  }

  // --- Speakers ---
  // Aufgabe:
  // 1. Importiere SPEAKERS_QUERY aus ./queries.js (oben ergänzen)
  // 2. Importiere GetSpeakersQuery aus ../../generated/graphql.js
  //    (funktioniert erst nach `npm run generate`)
  // 3. Lade die Speaker und ersetze die Platzhalter im Template
  //    Tippe s. und schau was die Autovervollständigung vorschlägt!
  //
  // Uncomment und ergänze:
  // try {
  //   const { speakers } = await client.request<GetSpeakersQuery>(SPEAKERS_QUERY);
  //   html += `<h2>Speaker</h2>`;
  //   speakers.forEach((s) => {
  //     html += `
  //       <div class="card">
  //         <h3>Hier kommt der Name</h3>
  //         <p>Hier kommt die Bio</p>
  //         <p><small>Hier kommt die Firma</small></p>
  //       </div>`;
  //   });
  // } catch (e) {
  //   html += `<div class="error">Fehler beim Laden der Speaker</div>`;
  // }


  app.innerHTML = html;
}

render();
