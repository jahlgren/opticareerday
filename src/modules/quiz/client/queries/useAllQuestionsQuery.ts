import { useQuery } from "react-query"
import Question from "../../../../core/mikro-orm/shared/entities/Question";
import apiRequest from "../../../../core/utils/client/api-request";

const fetchQuestions = async () => {
  const response = await apiRequest.get<{ questions: Question[] }>('/questions');
  return response.data;
};

const useAllQuestions = () => (
  useQuery(['questions'], fetchQuestions)
);

export default useAllQuestions;
