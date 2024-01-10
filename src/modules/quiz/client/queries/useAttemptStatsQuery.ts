import { useQuery } from "react-query"
import Attempt from "../../../../core/mikro-orm/shared/entities/Attempt";
import apiRequest from "../../../../core/utils/client/api-request";
import { ResultType } from "../../../../pages/api/attempts/stats";

export type AttemptStatsQueryResponseType = {
  results: ResultType[],
  totalQuestions: number
}

const fetchAttemptStats = async () => {
  const response = await apiRequest.get<AttemptStatsQueryResponseType>('/attempts/stats');
  return response.data;
};

const useAttemptStatsQuery = () => (
  useQuery(['attempt', 'stats'], fetchAttemptStats)
);

export default useAttemptStatsQuery;
