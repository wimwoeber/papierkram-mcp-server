import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PapierkramClient } from "../api-client.js";

export function registerPropositionTools(
  server: McpServer,
  client: PapierkramClient
) {
  server.tool(
    "papierkram_list_propositions",
    "Liste alle Produkte und Dienstleistungen aus Papierkram auf",
    { page: z.number().optional(), page_size: z.number().optional() },
    async ({ page, page_size }) => {
      const result = await client.listPropositions({ page, page_size });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_get_proposition",
    "Rufe Details eines Produkts/einer Dienstleistung ab",
    { id: z.number().describe("ID des Produkts/der Dienstleistung") },
    async ({ id }) => {
      const result = await client.getProposition(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_create_proposition",
    "Erstelle ein neues Produkt/eine neue Dienstleistung",
    {
      name: z.string().describe("Name des Produkts/der Dienstleistung"),
      article_no: z.string().optional().describe("Artikelnummer"),
      description: z.string().optional(),
      proposition_type: z
        .enum(["product", "service"])
        .optional()
        .describe("Typ: product oder service"),
      price: z.string().optional().describe("Preis (z.B. '100.00')"),
      unit: z.string().optional().describe("Einheit (z.B. Stück, Stunde)"),
      vat_rate: z.string().optional().describe("MwSt-Satz (z.B. '19.0')"),
    },
    async (params) => {
      const result = await client.createProposition(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_update_proposition",
    "Aktualisiere ein Produkt/eine Dienstleistung",
    {
      id: z.number().describe("ID"),
      name: z.string().optional(),
      article_no: z.string().optional(),
      description: z.string().optional(),
      price: z.string().optional(),
      unit: z.string().optional(),
      vat_rate: z.string().optional(),
    },
    async ({ id, ...data }) => {
      const result = await client.updateProposition(id, data);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_delete_proposition",
    "Lösche ein Produkt/eine Dienstleistung",
    { id: z.number().describe("ID") },
    async ({ id }) => {
      const result = await client.deleteProposition(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  // Zahlungsbedingungen
  server.tool(
    "papierkram_list_payment_terms",
    "Liste alle Zahlungsbedingungen auf",
    { page: z.number().optional(), page_size: z.number().optional() },
    async ({ page, page_size }) => {
      const result = await client.listPaymentTerms({ page, page_size });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
