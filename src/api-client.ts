/**
 * Papierkram REST API Client
 * Basis-URL: https://{subdomain}.papierkram.de/api/v1
 */

export interface PapierkramConfig {
  baseUrl: string;
  apiToken: string;
}

export interface PaginationParams {
  page?: number;
  page_size?: number;
}

export class PapierkramClient {
  private baseUrl: string;
  private apiToken: string;

  constructor(config: PapierkramConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.apiToken = config.apiToken;
  }

  private async request(
    method: string,
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | undefined>
  ): Promise<unknown> {
    const url = new URL(`${this.baseUrl}${path}`);

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiToken}`,
      Accept: "application/json",
    };

    if (body) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Papierkram API Fehler ${response.status}: ${errorText}`
      );
    }

    // Manche Endpunkte geben 204 No Content zurück
    if (response.status === 204) {
      return { success: true };
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return response.json();
    }

    // Für PDF-Downloads etc.
    return { success: true, contentType };
  }

  // ========== INFO ==========
  async getInfo(): Promise<unknown> {
    return this.request("GET", "/info");
  }

  // ========== KONTAKTE: FIRMEN ==========
  async listCompanies(params?: PaginationParams): Promise<unknown> {
    return this.request("GET", "/contact/companies", undefined, params as Record<string, string | number>);
  }

  async getCompany(id: number): Promise<unknown> {
    return this.request("GET", `/contact/companies/${id}`);
  }

  async createCompany(data: Record<string, unknown>): Promise<unknown> {
    return this.request("POST", "/contact/companies", data);
  }

  async updateCompany(
    id: number,
    data: Record<string, unknown>
  ): Promise<unknown> {
    return this.request("PUT", `/contact/companies/${id}`, data);
  }

  async deleteCompany(id: number): Promise<unknown> {
    return this.request("DELETE", `/contact/companies/${id}`);
  }

  // ========== KONTAKTE: ANSPRECHPARTNER ==========
  async listContactPersons(
    companyId: number,
    params?: PaginationParams
  ): Promise<unknown> {
    return this.request(
      "GET",
      `/contact/companies/${companyId}/persons`,
      undefined,
      params as Record<string, string | number>
    );
  }

  async getContactPerson(
    companyId: number,
    personId: number
  ): Promise<unknown> {
    return this.request(
      "GET",
      `/contact/companies/${companyId}/persons/${personId}`
    );
  }

  async createContactPerson(
    companyId: number,
    data: Record<string, unknown>
  ): Promise<unknown> {
    return this.request(
      "POST",
      `/contact/companies/${companyId}/persons`,
      data
    );
  }

  async updateContactPerson(
    companyId: number,
    personId: number,
    data: Record<string, unknown>
  ): Promise<unknown> {
    return this.request(
      "PUT",
      `/contact/companies/${companyId}/persons/${personId}`,
      data
    );
  }

  async deleteContactPerson(
    companyId: number,
    personId: number
  ): Promise<unknown> {
    return this.request(
      "DELETE",
      `/contact/companies/${companyId}/persons/${personId}`
    );
  }

  // ========== PROJEKTE ==========
  async listProjects(params?: PaginationParams): Promise<unknown> {
    return this.request("GET", "/projects", undefined, params as Record<string, string | number>);
  }

  async getProject(id: number): Promise<unknown> {
    return this.request("GET", `/projects/${id}`);
  }

  async createProject(data: Record<string, unknown>): Promise<unknown> {
    return this.request("POST", "/projects", data);
  }

  async updateProject(
    id: number,
    data: Record<string, unknown>
  ): Promise<unknown> {
    return this.request("PUT", `/projects/${id}`, data);
  }

  async deleteProject(id: number): Promise<unknown> {
    return this.request("DELETE", `/projects/${id}`);
  }

  // ========== RECHNUNGEN (INCOME) ==========
  async listInvoices(params?: PaginationParams): Promise<unknown> {
    return this.request("GET", "/income/invoices", undefined, params as Record<string, string | number>);
  }

  async getInvoice(id: number): Promise<unknown> {
    return this.request("GET", `/income/invoices/${id}`);
  }

  async createInvoice(data: Record<string, unknown>): Promise<unknown> {
    return this.request("POST", "/income/invoices", data);
  }

  async updateInvoice(
    id: number,
    data: Record<string, unknown>
  ): Promise<unknown> {
    return this.request("PUT", `/income/invoices/${id}`, data);
  }

  async deleteInvoice(id: number): Promise<unknown> {
    return this.request("DELETE", `/income/invoices/${id}`);
  }

  async archiveInvoice(id: number): Promise<unknown> {
    return this.request("POST", `/income/invoices/${id}/archive`);
  }

  async unarchiveInvoice(id: number): Promise<unknown> {
    return this.request("POST", `/income/invoices/${id}/unarchive`);
  }

  async cancelInvoice(id: number): Promise<unknown> {
    return this.request("POST", `/income/invoices/${id}/cancel`);
  }

  async sendInvoice(id: number, data?: Record<string, unknown>): Promise<unknown> {
    return this.request("POST", `/income/invoices/${id}/deliver`, data);
  }

  // ========== ANGEBOTE (ESTIMATES) ==========
  async listEstimates(params?: PaginationParams): Promise<unknown> {
    return this.request("GET", "/income/estimates", undefined, params as Record<string, string | number>);
  }

  async getEstimate(id: number): Promise<unknown> {
    return this.request("GET", `/income/estimates/${id}`);
  }

  async createEstimate(data: Record<string, unknown>): Promise<unknown> {
    return this.request("POST", "/income/estimates", data);
  }

  async updateEstimate(
    id: number,
    data: Record<string, unknown>
  ): Promise<unknown> {
    return this.request("PUT", `/income/estimates/${id}`, data);
  }

  async deleteEstimate(id: number): Promise<unknown> {
    return this.request("DELETE", `/income/estimates/${id}`);
  }

  // ========== PRODUKTE & DIENSTLEISTUNGEN ==========
  async listPropositions(params?: PaginationParams): Promise<unknown> {
    return this.request("GET", "/income/propositions", undefined, params as Record<string, string | number>);
  }

  async getProposition(id: number): Promise<unknown> {
    return this.request("GET", `/income/propositions/${id}`);
  }

  async createProposition(data: Record<string, unknown>): Promise<unknown> {
    return this.request("POST", "/income/propositions", data);
  }

  async updateProposition(
    id: number,
    data: Record<string, unknown>
  ): Promise<unknown> {
    return this.request("PUT", `/income/propositions/${id}`, data);
  }

  async deleteProposition(id: number): Promise<unknown> {
    return this.request("DELETE", `/income/propositions/${id}`);
  }

  // ========== ZAHLUNGSBEDINGUNGEN ==========
  async listPaymentTerms(params?: PaginationParams): Promise<unknown> {
    return this.request("GET", "/income/payment_terms", undefined, params as Record<string, string | number>);
  }

  // ========== AUSGABEN (EXPENSE VOUCHERS) ==========
  async listExpenseVouchers(params?: PaginationParams): Promise<unknown> {
    return this.request("GET", "/expense/vouchers", undefined, params as Record<string, string | number>);
  }

  async getExpenseVoucher(id: number): Promise<unknown> {
    return this.request("GET", `/expense/vouchers/${id}`);
  }

  async createExpenseVoucher(data: Record<string, unknown>): Promise<unknown> {
    return this.request("POST", "/expense/vouchers", data);
  }

  async updateExpenseVoucher(
    id: number,
    data: Record<string, unknown>
  ): Promise<unknown> {
    return this.request("PUT", `/expense/vouchers/${id}`, data);
  }

  async deleteExpenseVoucher(id: number): Promise<unknown> {
    return this.request("DELETE", `/expense/vouchers/${id}`);
  }

  // ========== TRACKER: AUFGABEN ==========
  async listTasks(params?: PaginationParams): Promise<unknown> {
    return this.request("GET", "/tracker/tasks", undefined, params as Record<string, string | number>);
  }

  async getTask(id: number): Promise<unknown> {
    return this.request("GET", `/tracker/tasks/${id}`);
  }

  async createTask(data: Record<string, unknown>): Promise<unknown> {
    return this.request("POST", "/tracker/tasks", data);
  }

  async updateTask(
    id: number,
    data: Record<string, unknown>
  ): Promise<unknown> {
    return this.request("PUT", `/tracker/tasks/${id}`, data);
  }

  async deleteTask(id: number): Promise<unknown> {
    return this.request("DELETE", `/tracker/tasks/${id}`);
  }

  // ========== TRACKER: ZEITEINTRÄGE ==========
  async listTimeEntries(params?: PaginationParams): Promise<unknown> {
    return this.request("GET", "/tracker/time_entries", undefined, params as Record<string, string | number>);
  }

  async getTimeEntry(id: number): Promise<unknown> {
    return this.request("GET", `/tracker/time_entries/${id}`);
  }

  async createTimeEntry(data: Record<string, unknown>): Promise<unknown> {
    return this.request("POST", "/tracker/time_entries", data);
  }

  async updateTimeEntry(
    id: number,
    data: Record<string, unknown>
  ): Promise<unknown> {
    return this.request("PUT", `/tracker/time_entries/${id}`, data);
  }

  async deleteTimeEntry(id: number): Promise<unknown> {
    return this.request("DELETE", `/tracker/time_entries/${id}`);
  }

  // ========== BANKING ==========
  async listBankConnections(params?: PaginationParams): Promise<unknown> {
    return this.request("GET", "/banking/bank_connections", undefined, params as Record<string, string | number>);
  }

  async getBankConnection(id: number): Promise<unknown> {
    return this.request("GET", `/banking/bank_connections/${id}`);
  }

  async listBankTransactions(params?: PaginationParams): Promise<unknown> {
    return this.request("GET", "/banking/transactions", undefined, params as Record<string, string | number>);
  }

  async getBankTransaction(id: number): Promise<unknown> {
    return this.request("GET", `/banking/transactions/${id}`);
  }

  // ========== BUSINESS INTELLIGENCE ==========
  async getExpenseByCategory(params?: Record<string, string | number>): Promise<unknown> {
    return this.request("GET", "/business_intelligence/expense_by_category", undefined, params);
  }
}
