import { useMutation, useQueryClient } from "react-query";
import apiRequest from "../../../../core/utils/client/api-request";

const deleteAnswer = async (id: string) => (
  apiRequest.delete('/answers/' + id)
);

const useDeleteAnswerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteAnswer(id), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['answers', { id: res.data.answerId }]);
      queryClient.invalidateQueries(['questions', { id: res.data.questionId }]);
    }
  });
}

export default useDeleteAnswerMutation;
