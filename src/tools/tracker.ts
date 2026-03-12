import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PapierkramClient } from "../api-client.js";

export function registerTrackerTools(
  server: McpServer,
  client: PapierkramClient
) {
  // ========== AUFGABEN ==========
  server.tool(
    "papierkram_list_tasks",
    "Liste alle Aufgaben aus dem Papierkram Tracker auf",
    { page: z.number().optional(), page_size: z.number().optional() },
    async ({ page, page_size }) => {
      const result = await client.listTasks({ page, page_size });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_get_task",
    "Rufe Details einer Tracker-Aufgabe ab",
    { id: z.number().describe("ID der Aufgabe") },
    async ({ id }) => {
      const result = await client.getTask(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_create_task",
    "Erstelle eine neue Aufgabe im Papierkram Tracker",
    {
      name: z.string().describe("Name der Aufgabe"),
      project_id: z.number().optional().describe("ID des zugehörigen Projekts"),
      proposition_id: z.number().optional().describe("ID der Dienstleistung/Produkt"),
      deadline: z.string().optional().describe("Deadline (YYYY-MM-DD)"),
      relative_costs: z.number().optional().describe("Kosten"),
      user_id: z.number().optional().describe("Zugewiesener Benutzer"),
    },
    async (params) => {
      const result = await client.createTask(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_update_task",
    "Aktualisiere eine Tracker-Aufgabe",
    {
      id: z.number().describe("ID der Aufgabe"),
      name: z.string().optional(),
      project_id: z.number().optional(),
      deadline: z.string().optional(),
      relative_costs: z.number().optional(),
    },
    async ({ id, ...data }) => {
      const result = await client.updateTask(id, data);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_delete_task",
    "Lösche eine Tracker-Aufgabe",
    { id: z.number().describe("ID der Aufgabe") },
    async ({ id }) => {
      const result = await client.deleteTask(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  // ========== ZEITEINTRÄGE ==========
  server.tool(
    "papierkram_list_time_entries",
    "Liste alle Zeiteinträge aus Papierkram auf",
    { page: z.number().optional(), page_size: z.number().optional() },
    async ({ page, page_size }) => {
      const result = await client.listTimeEntries({ page, page_size });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_get_time_entry",
    "Rufe Details eines Zeiteintrags ab",
    { id: z.number().describe("ID des Zeiteintrags") },
    async ({ id }) => {
      const result = await client.getTimeEntry(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  // Explicit z.object().shape to ensure stable schema serialization for MCP
  const createTimeEntryShape = z.object({
    entry_date: z.string().describe("Datum (YYYY-MM-DD)"),
    started_at_time: z.string().optional().describe("Startzeit (HH:MM)"),
    ended_at_time: z.string().optional().describe("Endzeit (HH:MM)"),
    duration: z.number().optional().describe("Dauer in Minuten"),
    task_id: z.number().optional().describe("Aufgaben-ID"),
    project_id: z.number().optional().describe("Projekt-ID"),
    user_id: z.number().optional().describe("Benutzer-ID"),
    comments: z.string().optional().describe("Beschreibung/Kommentar"),
    billable: z.boolean().optional().describe("Abrechenbar?"),
  }).shape;

  server.tool(
    "papierkram_create_time_entry",
    "Erstelle einen neuen Zeiteintrag in Papierkram",
    createTimeEntryShape,
    async ({ task_id, project_id, user_id, ...rest }) => {
      // Papierkram API expects nested objects for task, project, user
      const payload: Record<string, unknown> = { ...rest };
      if (task_id !== undefined) payload.task = { id: task_id };
      if (project_id !== undefined) payload.project = { id: project_id };
      if (user_id !== undefined) payload.user = { id: user_id };
      const result = await client.createTimeEntry(payload);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  const updateTimeEntryShape = z.object({
    id: z.number().describe("ID des Zeiteintrags"),
    entry_date: z.string().optional(),
    started_at_time: z.string().optional(),
    ended_at_time: z.string().optional(),
    duration: z.number().optional(),
    task_id: z.number().optional().describe("Aufgaben-ID"),
    project_id: z.number().optional().describe("Projekt-ID"),
    comments: z.string().optional(),
    billable: z.boolean().optional(),
  }).shape;

  server.tool(
    "papierkram_update_time_entry",
    "Aktualisiere einen Zeiteintrag",
    updateTimeEntryShape,
    async ({ id, task_id, project_id, ...data }) => {
      const payload: Record<string, unknown> = { ...data };
      if (task_id !== undefined) payload.task = { id: task_id };
      if (project_id !== undefined) payload.project = { id: project_id };
      const result = await client.updateTimeEntry(id, payload);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "papierkram_delete_time_entry",
    "Lösche einen Zeiteintrag",
    { id: z.number().describe("ID des Zeiteintrags") },
    async ({ id }) => {
      const result = await client.deleteTimeEntry(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
