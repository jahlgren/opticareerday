import { useMutation, useQueryClient } from "react-query";
import apiRequest from "../../../../core/utils/client/api-request";
import EditQuestionBodyType from "../../shared/types/EditQuestionBodyType";

const editQuestion = async (id: string, body: EditQuestionBodyType) => (
  apiRequest.post('/questions/' + id, body)
);

const useEditQuestionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((data: {id: string, body: EditQuestionBodyType}) => editQuestion(data.id, data.body), {
    onSuccess: (response) => {
      queryClient.invalidateQueries(['questions', { id: response.data.question.id }]);
    }
  });
}

export default useEditQuestionMutation;
