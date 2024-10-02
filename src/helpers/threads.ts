import type { ICategory, IThread } from "@/interfaces/thread";
import { getMemberCookies } from "@/middlewares/cookies";
import { ApiServices } from "@/services/api";

export class ThreadHelper {
  private api: ApiServices;

  constructor(api: ApiServices) {
    this.api = api;
  }

  async getThreads(): Promise<IThread[]> {
    return this.api.get("/threads", {
      "Content-Type": "application/json",
    });
  }

  async getThread(id: number): Promise<IThread> {
    return this.api.get(`/threads/${id}`, {
      "Content-Type": "application/json",
    });
  }

  async addComment(id: number, comment: string): Promise<any> {
    const token = await getMemberCookies();
    return this.api.post(`/threads/${id}/comments`, { content: comment }, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });
  }

  async addReply(id: number, comment: string): Promise<any> {
    const token = await getMemberCookies();
    return this.api.post(`/threads/${id}/replies`, { content: comment }, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });
  }

  async addReplyToReply(id: number, comment: string): Promise<any> {
    const token = await getMemberCookies();
    return this.api.post(`/threads/${id}/replies`, { content: comment }, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
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
