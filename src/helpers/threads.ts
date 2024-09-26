import type { ICategory } from "@/interfaces/thread";
import { ApiServices } from "@/services/api";

export class ThreadHelper {
  private api: ApiServices;

  constructor(api: ApiServices) {
    this.api = api;
  }

  async getCategories(): Promise<ICategory[]> {
    return this.api.get("/threads/categories", {
      "Content-Type": "application/json",
    });
  }
}
