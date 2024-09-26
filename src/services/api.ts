type HtppMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method: HtppMethod;
  headers: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

export class ApiServices {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      ...options?.headers,
    };
    let body: string | FormData | undefined = options?.body;

    if (body instanceof FormData) {
      delete headers["Content-Type"];
    } else if (typeof body === "object") {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }

    const config: RequestInit = {
      method: options?.method,
      headers,
      body,
    };

    try {
      const response = await fetch(url, config);
      const responseData = await response.text();

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${responseData}`
        );
      }

      return responseData ? JSON.parse(responseData) : {};
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  }

  public async get<T>(endpoint: string, headers: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", headers });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async post<T>(endpoint: string, body: any, headers: Record<string, string>): Promise<T> {
      return this.request<T>(endpoint, { method: "POST", body, headers });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async put<T>(endpoint: string, body: any, headers: Record<string, string>): Promise<T> {
      return this.request<T>(endpoint, { method: "PUT", body, headers });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async delete<T>(endpoit: string, body: any, headers: Record<string, string>): Promise<T> {
      return this.request<T>(endpoit, { method: "DELETE", body, headers });
  }
}

const api = new ApiServices(process.env.NEXT_PUBLIC_BASE_API_URL as string);
export default api;
