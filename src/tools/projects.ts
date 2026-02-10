import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PapierkramClient } from "../api-client.js";

export function registerProjectTools(
  server: McpServer,
  client: PapierkramClient
) {
  server.tool(
    "papierkram_list_projects",
    "Liste alle Projekte aus Papierkram auf",
    { page: z.number().optional(), page_size: z.number().optional() },
    async ({ page, page_size }) => {
      const result = await client.listProjects({ page, page_size });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_get_project",
    "Rufe Details eines bestimmten Projekts ab",
    { id: z.number().describe("ID des Projekts") },
    async ({ id }) => {
      const result = await client.getProject(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_create_project",
    "Erstelle ein neues Projekt in Papierkram",
    {
      name: z.string().describe("Projektname"),
      customer_id: z.number().optional().describe("ID des Kunden"),
      description: z.string().optional().describe("Beschreibung"),
      start_date: z.string().optional().describe("Startdatum (YYYY-MM-DD)"),
      end_date: z.string().optional().describe("Enddatum (YYYY-MM-DD)"),
      budget_type: z
        .enum(["minutes", "cents"])
        .optional()
        .describe("Budgettyp"),
      budget_money: z.number().optional().describe("Budget in Cent"),
      budget_time: z.number().optional().describe("Budget in Minuten"),
      color: z.string().optional().describe("Farbe (Hex)"),
    },
    async (params) => {
      const result = await client.createProject(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_update_project",
    "Aktualisiere ein bestehendes Projekt",
    {
      id: z.number().describe("ID des Projekts"),
      name: z.string().optional(),
      description: z.string().optional(),
      start_date: z.string().optional(),
      end_date: z.string().optional(),
      budget_type: z.enum(["minutes", "cents"]).optional(),
      budget_money: z.number().optional(),
      budget_time: z.number().optional(),
      color: z.string().optional(),
    },
    async ({ id, ...data }) => {
      const result = await client.updateProject(id, data);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_delete_project",
    "Lösche ein Projekt aus Papierkram",
    { id: z.number().describe("ID des Projekts") },
    async ({ id }) => {
      const result = await client.deleteProject(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
