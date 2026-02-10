import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PapierkramClient } from "../api-client.js";

export function registerAnalyticsTools(
  server: McpServer,
  client: PapierkramClient
) {
  server.tool(
    "papierkram_expense_by_category",
    "Zeige Ausgaben nach Kategorie (Business Intelligence)",
    {
      year: z.number().optional().describe("Jahr (z.B. 2024)"),
    },
    async ({ year }) => {
      const params = year ? { year } : undefined;
      const result = await client.getExpenseByCategory(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
