import type {
  IRegisterData,
  ILoginData,
  ILoginErrorResponse,
//   IMemberResponse,
  IRegisterSuccessResponse,
  IRegisterErrorResponse,
  IMember,
  IToken,
} from "@/interfaces/member";
import { ApiServices } from "@/services/api";

export class MemberHelper {
  private api: ApiServices;

  constructor(api: ApiServices) {
    this.api = api;
  }

  async register(
    data: IRegisterData
  ): Promise<IRegisterSuccessResponse | IRegisterErrorResponse> {
    return this.api.post("/member/register", data, {
      "Content-Type": "application/json",
    });
  }

  async login(
    data: ILoginData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<IToken | any | ILoginErrorResponse> {
    return this.api.post("/member/login", data, {
      "Content-Type": "application/json",
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getMemberByUsername(username: string): Promise<IMember | any> {
    return this.api.get(`/member/${username}`, {
      "Content-Type": "application/json",
    });
  }
}
