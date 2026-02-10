import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PapierkramClient } from "../api-client.js";

export function registerBankingTools(
  server: McpServer,
  client: PapierkramClient
) {
  server.tool(
    "papierkram_list_bank_connections",
    "Liste alle Bankverbindungen aus Papierkram auf",
    { page: z.number().optional(), page_size: z.number().optional() },
    async ({ page, page_size }) => {
      const result = await client.listBankConnections({ page, page_size });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_get_bank_connection",
    "Rufe Details einer Bankverbindung ab",
    { id: z.number().describe("ID der Bankverbindung") },
    async ({ id }) => {
      const result = await client.getBankConnection(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_list_bank_transactions",
    "Liste alle Banktransaktionen aus Papierkram auf",
    { page: z.number().optional(), page_size: z.number().optional() },
    async ({ page, page_size }) => {
      const result = await client.listBankTransactions({ page, page_size });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_get_bank_transaction",
    "Rufe Details einer Banktransaktion ab",
    { id: z.number().describe("ID der Transaktion") },
    async ({ id }) => {
      const result = await client.getBankTransaction(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
