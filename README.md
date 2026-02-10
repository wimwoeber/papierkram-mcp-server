# Papierkram MCP Server

MCP Server für die [Papierkram](https://www.papierkram.de) REST API. Ermöglicht Claude (Desktop & Code) den direkten Zugriff auf Buchhaltung, Rechnungen, Kontakte, Projekte und Zeiterfassung.

## Features

| Modul | Tools | Beschreibung |
|-------|-------|-------------|
| **Info** | 1 | Account-Informationen |
| **Firmen/Kunden** | 5 | CRUD für Firmen und Kunden |
| **Ansprechpartner** | 5 | CRUD für Kontaktpersonen pro Firma |
| **Projekte** | 5 | CRUD für Projekte |
| **Rechnungen** | 9 | CRUD + Archivieren, Stornieren, Versenden |
| **Angebote** | 5 | CRUD für Kostenvoranschläge |
| **Ausgaben** | 5 | CRUD für Ausgabenbelege |
| **Tracker Tasks** | 5 | CRUD für Aufgaben |
| **Zeiteinträge** | 5 | CRUD für Zeiterfassung |
| **Banking** | 4 | Bankverbindungen & Transaktionen (lesend) |
| **Produkte/DL** | 6 | CRUD für Produkte, Dienstleistungen + Zahlungsbedingungen |
| **Analytics** | 1 | Ausgaben nach Kategorie (Business Intelligence) |

**Gesamt: ~56 Tools**

## Voraussetzungen

- Node.js 18+
- Ein Papierkram-Account mit API-Zugang (ab Paket M)
- Einen API-Token (unter Einstellungen > API in Papierkram)

## Installation

```bash
git clone https://github.com/wimwoeber/papierkram-mcp-server.git
cd papierkram-mcp-server
npm install
npm run build
```

## Konfiguration

### Claude Desktop

In `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) bzw. `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "papierkram": {
      "command": "node",
      "args": ["/pfad/zu/papierkram-mcp-server/build/index.js"],
      "env": {
        "PAPIERKRAM_API_TOKEN": "dein-api-token",
        "PAPIERKRAM_BASE_URL": "https://dein-account.papierkram.de/api/v1"
      }
    }
  }
}
```

### Umgebungsvariablen

| Variable | Pflicht | Beschreibung |
|----------|---------|-------------|
| `PAPIERKRAM_API_TOKEN` | Ja | Dein Papierkram API-Token |
| `PAPIERKRAM_BASE_URL` | Nein | API-Basis-URL (Standard: `https://westkueste.papierkram.de/api/v1`) |

## Nutzung

Nach der Konfiguration stehen alle `papierkram_*` Tools in Claude zur Verfügung:

```
"Liste alle Projekte aus Papierkram auf"
"Erstelle eine Rechnung für Kunde X"
"Zeige mir die Zeiteinträge der letzten Woche"
"Wie viel Budget hat Projekt Y noch?"
"Zeige Ausgaben nach Kategorie für 2024"
```

## API-Endpunkte

Der Server nutzt die Papierkram REST API v1:

- `/contact/companies` - Firmen/Kunden
- `/contact/companies/:id/persons` - Ansprechpartner
- `/projects` - Projekte
- `/income/invoices` - Rechnungen
- `/income/estimates` - Angebote
- `/income/propositions` - Produkte & Dienstleistungen
- `/income/payment_terms` - Zahlungsbedingungen
- `/expense/vouchers` - Ausgabenbelege
- `/tracker/tasks` - Aufgaben
- `/tracker/time_entries` - Zeiteinträge
- `/banking/bank_connections` - Bankverbindungen
- `/banking/transactions` - Transaktionen
- `/business_intelligence/expense_by_category` - Analytics

## API-Credits

Jeder API-Aufruf verbraucht Credits (Paket M: 10.000/Monat, Paket L: 20.000/Monat). Schreibende Operationen verbrauchen mehr Credits als lesende.

## Tech Stack

- TypeScript
- [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk) - MCP SDK
- [Zod](https://zod.dev) - Schema-Validierung

## Lizenz

MIT
