import { useQuery } from "react-query"
import Attempt from "../../../../core/mikro-orm/shared/entities/Attempt";
import apiRequest from "../../../../core/utils/client/api-request";

export type AttemptQueryResponseType = {
  attempt: Attempt,
  totalQuesitons: number,
  totalAnswered: number,
  totalCorrectAnswers: number
}

const fetchAttempt = async (id?: string) => {
  if(!id) return null;
  const response = await apiRequest.get<AttemptQueryResponseType>('/attempts/' + id);
  return response.data;
};

const useAttemptQuery = (attemptId?: string) => (
  useQuery(['attempt', { id: attemptId }], () => fetchAttempt(attemptId), {
    refetchOnWindowFocus: false
  })
);

export default useAttemptQuery;
