import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PapierkramClient } from "../api-client.js";

export function registerContactTools(
  server: McpServer,
  client: PapierkramClient
) {
  server.tool(
    "papierkram_list_contact_persons",
    "Liste alle Ansprechpartner einer Firma auf",
    {
      company_id: z.number().describe("ID der Firma"),
      page: z.number().optional(),
      page_size: z.number().optional(),
    },
    async ({ company_id, page, page_size }) => {
      const result = await client.listContactPersons(company_id, {
        page,
        page_size,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_get_contact_person",
    "Rufe Details eines Ansprechpartners ab",
    {
      company_id: z.number().describe("ID der Firma"),
      person_id: z.number().describe("ID des Ansprechpartners"),
    },
    async ({ company_id, person_id }) => {
      const result = await client.getContactPerson(company_id, person_id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_create_contact_person",
    "Erstelle einen neuen Ansprechpartner für eine Firma",
    {
      company_id: z.number().describe("ID der Firma"),
      first_name: z.string().describe("Vorname"),
      last_name: z.string().describe("Nachname"),
      title: z.string().optional().describe("Titel (z.B. Dr.)"),
      salutation: z.string().optional().describe("Anrede"),
      position: z.string().optional().describe("Position/Funktion"),
      department: z.string().optional().describe("Abteilung"),
      phone: z.string().optional(),
      mobile: z.string().optional(),
      fax: z.string().optional(),
      email: z.string().optional(),
      note: z.string().optional(),
    },
    async ({ company_id, ...data }) => {
      const result = await client.createContactPerson(company_id, data);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_update_contact_person",
    "Aktualisiere einen Ansprechpartner",
    {
      company_id: z.number().describe("ID der Firma"),
      person_id: z.number().describe("ID des Ansprechpartners"),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      title: z.string().optional(),
      salutation: z.string().optional(),
      position: z.string().optional(),
      department: z.string().optional(),
      phone: z.string().optional(),
      mobile: z.string().optional(),
      fax: z.string().optional(),
      email: z.string().optional(),
      note: z.string().optional(),
    },
    async ({ company_id, person_id, ...data }) => {
      const result = await client.updateContactPerson(
        company_id,
        person_id,
        data
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_delete_contact_person",
    "Lösche einen Ansprechpartner",
    {
      company_id: z.number().describe("ID der Firma"),
      person_id: z.number().describe("ID des Ansprechpartners"),
    },
    async ({ company_id, person_id }) => {
      const result = await client.deleteContactPerson(company_id, person_id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
