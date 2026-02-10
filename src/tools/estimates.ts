import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PapierkramClient } from "../api-client.js";

export function registerEstimateTools(
  server: McpServer,
  client: PapierkramClient
) {
  server.tool(
    "papierkram_list_estimates",
    "Liste alle Angebote/Kostenvoranschläge aus Papierkram auf",
    { page: z.number().optional(), page_size: z.number().optional() },
    async ({ page, page_size }) => {
      const result = await client.listEstimates({ page, page_size });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_get_estimate",
    "Rufe Details eines Angebots ab",
    { id: z.number().describe("ID des Angebots") },
    async ({ id }) => {
      const result = await client.getEstimate(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_create_estimate",
    "Erstelle ein neues Angebot in Papierkram",
    {
      name: z.string().describe("Titel des Angebots"),
      customer_id: z.number().optional().describe("Kunden-ID"),
      project_id: z.number().optional().describe("Projekt-ID"),
      description: z.string().optional(),
    },
    async (params) => {
      const result = await client.createEstimate(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_update_estimate",
    "Aktualisiere ein bestehendes Angebot",
    {
      id: z.number().describe("ID des Angebots"),
      name: z.string().optional(),
      customer_id: z.number().optional(),
      project_id: z.number().optional(),
      description: z.string().optional(),
    },
    async ({ id, ...data }) => {
      const result = await client.updateEstimate(id, data);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_delete_estimate",
    "Lösche ein Angebot aus Papierkram",
    { id: z.number().describe("ID des Angebots") },
    async ({ id }) => {
      const result = await client.deleteEstimate(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
