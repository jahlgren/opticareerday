import { useMutation, useQueryClient } from "react-query";
import apiRequest from "../../../../core/utils/client/api-request";
import AddQuestionBodyType from "../../shared/types/AddQuestionBodyType";

const addQuestion = async (body: AddQuestionBodyType) => (
  apiRequest.post('/questions', body)
);

const useAddQuestionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((body: AddQuestionBodyType) => addQuestion(body), {
    onSuccess: () => {
      queryClient.invalidateQueries('questions');
    }
  });
}

export default useAddQuestionMutation;
