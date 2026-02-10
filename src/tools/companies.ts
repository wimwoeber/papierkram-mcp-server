import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PapierkramClient } from "../api-client.js";

export function registerCompanyTools(
  server: McpServer,
  client: PapierkramClient
) {
  server.tool(
    "papierkram_list_companies",
    "Liste alle Firmen/Kunden aus Papierkram auf",
    { page: z.number().optional(), page_size: z.number().optional() },
    async ({ page, page_size }) => {
      const result = await client.listCompanies({ page, page_size });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_get_company",
    "Rufe Details einer bestimmten Firma ab",
    { id: z.number().describe("ID der Firma") },
    async ({ id }) => {
      const result = await client.getCompany(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_create_company",
    "Erstelle eine neue Firma/Kunden in Papierkram",
    {
      name: z.string().describe("Name der Firma"),
      contact_type: z
        .enum(["customer", "supplier"])
        .optional()
        .describe("Typ: customer oder supplier"),
      street: z.string().optional(),
      zip: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      website: z.string().optional(),
      vat_identifier: z.string().optional().describe("USt-IdNr."),
      ust_idnr: z.string().optional().describe("Steuernummer"),
      note: z.string().optional(),
    },
    async (params) => {
      const result = await client.createCompany(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_update_company",
    "Aktualisiere eine bestehende Firma",
    {
      id: z.number().describe("ID der Firma"),
      name: z.string().optional(),
      contact_type: z.enum(["customer", "supplier"]).optional(),
      street: z.string().optional(),
      zip: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      website: z.string().optional(),
      note: z.string().optional(),
    },
    async ({ id, ...data }) => {
      const result = await client.updateCompany(id, data);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_delete_company",
    "Lösche eine Firma aus Papierkram",
    { id: z.number().describe("ID der Firma") },
    async ({ id }) => {
      const result = await client.deleteCompany(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
