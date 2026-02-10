import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PapierkramClient } from "../api-client.js";

export function registerExpenseTools(
  server: McpServer,
  client: PapierkramClient
) {
  server.tool(
    "papierkram_list_expenses",
    "Liste alle Ausgabenbelege aus Papierkram auf",
    { page: z.number().optional(), page_size: z.number().optional() },
    async ({ page, page_size }) => {
      const result = await client.listExpenseVouchers({ page, page_size });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_get_expense",
    "Rufe Details eines Ausgabenbelegs ab",
    { id: z.number().describe("ID des Belegs") },
    async ({ id }) => {
      const result = await client.getExpenseVoucher(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_create_expense",
    "Erstelle einen neuen Ausgabenbeleg",
    {
      name: z.string().describe("Belegbezeichnung"),
      due_date: z.string().optional().describe("Fälligkeitsdatum (YYYY-MM-DD)"),
      supply_date: z.string().optional().describe("Lieferdatum (YYYY-MM-DD)"),
      entertainment_reason: z.string().optional(),
      creditor_id: z.number().optional().describe("Lieferanten-ID"),
    },
    async (params) => {
      const result = await client.createExpenseVoucher(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_update_expense",
    "Aktualisiere einen Ausgabenbeleg",
    {
      id: z.number().describe("ID des Belegs"),
      name: z.string().optional(),
      due_date: z.string().optional(),
      supply_date: z.string().optional(),
    },
    async ({ id, ...data }) => {
      const result = await client.updateExpenseVoucher(id, data);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_delete_expense",
    "Lösche einen Ausgabenbeleg",
    { id: z.number().describe("ID des Belegs") },
    async ({ id }) => {
      const result = await client.deleteExpenseVoucher(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
