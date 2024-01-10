import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import Attempt from "../../../../core/mikro-orm/shared/entities/Attempt";
import apiRequest from "../../../../core/utils/client/api-request";
import AttemptAnswerBodyType from "../../shared/types/AttemptAnswerBodyType";

export type StartAttemptMutationResponseType = {
  attempt: Attempt,
  totalQuesitons: number,
  totalAnswered: number,
  correctAnswerIds: string[],
  totalCorrectAnswers: number
}

const attemptAnswer = async (attemptId: string, body: AttemptAnswerBodyType): Promise<AxiosResponse<StartAttemptMutationResponseType, any>> => (
  apiRequest.post('/attempts/' + attemptId + '/answers', body)
);

const useAttemptAnswerMutation = (attemptId: string) => {
  return useMutation((body: AttemptAnswerBodyType) => attemptAnswer(attemptId, body));
}

export default useAttemptAnswerMutation;
