import { useMutation, useQueryClient } from "react-query";
import apiRequest from "../../../../core/utils/client/api-request";
import UpsertAnswerBodyType from "../../shared/types/UpsertAnswerBodyType";

const upsertAnswer = async (body: UpsertAnswerBodyType, questionId: string, answerId?: string) => (
  answerId
    ? apiRequest.post('/answers/' + answerId, body)
    : apiRequest.post('/questions/' + questionId + '/answers', body)
);

const useUpsertAnswerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((data: { body: UpsertAnswerBodyType, questionId: string, answerId?: string }) => upsertAnswer(data.body, data.questionId, data.answerId), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['answers', { id: res.data.answer.id }]);
      queryClient.invalidateQueries(['questions', { id: res.data.answer.question }]);
    }
  });
}

export default useUpsertAnswerMutation;
