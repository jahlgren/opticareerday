import { AxiosResponse } from "axios";
import { useQuery } from "react-query"
import Question from "../../../../core/mikro-orm/shared/entities/Question";
import apiRequest, { mockApiRequest } from "../../../../core/utils/client/api-request";

const fetchQuestion = async (id: string) => {
  if(!id) return { question: null };
  const response = await apiRequest.get<{ question: Question|null }>('/questions/' + id);
  return response.data;
};

const useQuestionByIdQuery = (id: string) => (
  useQuery(['questions', { id }], () => fetchQuestion(id), {
    refetchOnWindowFocus: false
  })
);

export default useQuestionByIdQuery;
