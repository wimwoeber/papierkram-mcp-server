import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PapierkramClient } from "../api-client.js";

export function registerInvoiceTools(
  server: McpServer,
  client: PapierkramClient
) {
  server.tool(
    "papierkram_list_invoices",
    "Liste alle Rechnungen (Einnahmen) aus Papierkram auf",
    { page: z.number().optional(), page_size: z.number().optional() },
    async ({ page, page_size }) => {
      const result = await client.listInvoices({ page, page_size });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_get_invoice",
    "Rufe Details einer bestimmten Rechnung ab",
    { id: z.number().describe("ID der Rechnung") },
    async ({ id }) => {
      const result = await client.getInvoice(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_create_invoice",
    "Erstelle eine neue Rechnung in Papierkram",
    {
      name: z.string().describe("Rechnungstitel"),
      supply_date: z.string().optional().describe("Lieferdatum (YYYY-MM-DD)"),
      customer_id: z.number().optional().describe("Kunden-ID"),
      project_id: z.number().optional().describe("Projekt-ID"),
      payment_term_id: z.number().optional().describe("Zahlungsbedingung-ID"),
    },
    async (params) => {
      const result = await client.createInvoice(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_update_invoice",
    "Aktualisiere eine bestehende Rechnung",
    {
      id: z.number().describe("ID der Rechnung"),
      name: z.string().optional(),
      supply_date: z.string().optional(),
      customer_id: z.number().optional(),
      project_id: z.number().optional(),
    },
    async ({ id, ...data }) => {
      const result = await client.updateInvoice(id, data);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_delete_invoice",
    "Lösche eine Rechnung aus Papierkram",
    { id: z.number().describe("ID der Rechnung") },
    async ({ id }) => {
      const result = await client.deleteInvoice(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_archive_invoice",
    "Archiviere eine Rechnung",
    { id: z.number().describe("ID der Rechnung") },
    async ({ id }) => {
      const result = await client.archiveInvoice(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_unarchive_invoice",
    "Stelle eine archivierte Rechnung wieder her",
    { id: z.number().describe("ID der Rechnung") },
    async ({ id }) => {
      const result = await client.unarchiveInvoice(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_cancel_invoice",
    "Storniere eine Rechnung",
    { id: z.number().describe("ID der Rechnung") },
    async ({ id }) => {
      const result = await client.cancelInvoice(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_send_invoice",
    "Versende eine Rechnung per E-Mail",
    {
      id: z.number().describe("ID der Rechnung"),
      email: z.string().optional().describe("E-Mail-Adresse des Empfängers"),
    },
    async ({ id, email }) => {
      const data = email ? { email } : undefined;
      const result = await client.sendInvoice(id, data);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
