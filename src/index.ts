#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { PapierkramClient } from "./api-client.js";
import { registerInfoTools } from "./tools/info.js";
import { registerCompanyTools } from "./tools/companies.js";
import { registerContactTools } from "./tools/contacts.js";
import { registerProjectTools } from "./tools/projects.js";
import { registerInvoiceTools } from "./tools/invoices.js";
import { registerEstimateTools } from "./tools/estimates.js";
import { registerExpenseTools } from "./tools/expenses.js";
import { registerTrackerTools } from "./tools/tracker.js";
import { registerBankingTools } from "./tools/banking.js";
import { registerPropositionTools } from "./tools/propositions.js";
import { registerAnalyticsTools } from "./tools/analytics.js";

function getConfig() {
  const apiToken = process.env.PAPIERKRAM_API_TOKEN;
  const baseUrl =
    process.env.PAPIERKRAM_BASE_URL || "https://westkueste.papierkram.de/api/v1";

  if (!apiToken) {
    console.error(
      "Fehler: PAPIERKRAM_API_TOKEN ist nicht gesetzt.\n\n" +
        "Setze die Umgebungsvariable PAPIERKRAM_API_TOKEN mit deinem API-Token.\n" +
        "Den Token findest du in Papierkram unter Einstellungen > API."
    );
    process.exit(1);
  }

  return { apiToken, baseUrl };
}

async function main() {
  const config = getConfig();

  const client = new PapierkramClient({
    baseUrl: config.baseUrl,
    apiToken: config.apiToken,
  });

  const server = new McpServer({
    name: "papierkram",
    version: "1.0.0",
  });

  // Alle Tool-Module registrieren
  registerInfoTools(server, client);
  registerCompanyTools(server, client);
  registerContactTools(server, client);
  registerProjectTools(server, client);
  registerInvoiceTools(server, client);
  registerEstimateTools(server, client);
  registerExpenseTools(server, client);
  registerTrackerTools(server, client);
  registerBankingTools(server, client);
  registerPropositionTools(server, client);
  registerAnalyticsTools(server, client);

  // Server über stdio starten
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(
    "Papierkram MCP Server v1.0 läuft - Firmen, Kontakte, Projekte, Rechnungen, Angebote, Ausgaben, Tracker, Banking, Analytics"
  );
}

main().catch((error) => {
  console.error("Fataler Fehler:", error);
  process.exit(1);
});
