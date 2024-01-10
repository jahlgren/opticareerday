import { useMutation, useQueryClient } from "react-query";
import apiRequest from "../../../../core/utils/client/api-request";

const deleteAttempts = async () => (
  apiRequest.delete('/attempts')
);

const useDeleteAllAttemptsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteAttempts(), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['attempt']);
    }
  });
}

export default useDeleteAllAttemptsMutation;
