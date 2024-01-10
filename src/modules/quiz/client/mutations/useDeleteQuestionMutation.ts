import { useMutation, useQueryClient } from "react-query";
import apiRequest from "../../../../core/utils/client/api-request";

const deleteQuestion = async (id: string) => (
  apiRequest.delete('/questions/' + id)
);

const useDeleteQuestionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteQuestion(id), {
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['questions'] })
    }
  });
}

export default useDeleteQuestionMutation;
