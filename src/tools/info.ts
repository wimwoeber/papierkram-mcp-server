import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { PapierkramClient } from "../api-client.js";

export function registerInfoTools(
  server: McpServer,
  client: PapierkramClient
) {
  server.tool("papierkram_info", "Zeige Papierkram Account-Informationen an", {}, async () => {
    const info = await client.getInfo();
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
    };
  });
}
