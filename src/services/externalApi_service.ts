import { Routes } from "../utils/enum";
import { useClient } from "../clients/AxiosClient";
import { UserPayload } from "../utils/jwtUtils";

class ExternalApiService {
  static async validateToken(): Promise<UserPayload> {
    try {
      console.log(useClient());

      const response = await useClient().post(Routes.VERIFYTOKEN);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ExternalApiService;
