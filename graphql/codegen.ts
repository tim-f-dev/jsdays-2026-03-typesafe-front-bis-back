import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // Schema wird direkt aus der lokalen Datei gelesen (kein laufender Server nötig)
  schema: "./schema.graphql",
  // Client-Queries als Quelle für Operationstypen
  documents: "./src/client/**/*.ts",
  generates: {
    "./generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
