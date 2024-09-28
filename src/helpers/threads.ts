import type { ICategory } from "@/interfaces/thread";
import { getMemberCookies } from "@/middlewares/cookies";
import { ApiServices } from "@/services/api";

export class ThreadHelper {
  private api: ApiServices;

  constructor(api: ApiServices) {
    this.api = api;
  }

  async getThreads(): Promise<any> {
    return this.api.get("/threads", {
      "Content-Type": "application/json",
    });
  }

  async getCategories(): Promise<ICategory[]> {
    return this.api.get("/threads/categories", {
      "Content-Type": "application/json",
    });
  }

  async createThread(data: any): Promise<any> {
    const token = await getMemberCookies();
    return this.api.post("/threads/create/", data, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });
  }
}
