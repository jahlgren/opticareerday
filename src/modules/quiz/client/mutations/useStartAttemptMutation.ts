import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import Attempt from "../../../../core/mikro-orm/shared/entities/Attempt";
import apiRequest from "../../../../core/utils/client/api-request";
import StartAttemptBodyType from "../../shared/types/StartAttemptBodyType";

export type StartAttemptMutationResponseType = {
  attempt: Attempt,
  totalQuesitons: number,
  totalAnswered: number
}

const startAttempt = async (body: StartAttemptBodyType): Promise<AxiosResponse<StartAttemptMutationResponseType, any>> => (
  apiRequest.post('/attempts/start', body)
);

const useStartAttemptMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((body: StartAttemptBodyType) => startAttempt(body));
}

export default useStartAttemptMutation;
