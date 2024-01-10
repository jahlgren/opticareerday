import NiceModal from "@ebay/nice-modal-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Answer from "../../../core/mikro-orm/shared/entities/Answer";
import Question from "../../../core/mikro-orm/shared/entities/Question";
import AdminTopbar from "../../../core/ui/client/blocks/AdminTopbar";
import Button from "../../../core/ui/client/components/Button";
import IconButton from "../../../core/ui/client/components/IconButton";
import AddIcon from "../../../core/ui/client/components/icons/AddIcon";
import EditIcon from "../../../core/ui/client/components/icons/EditIcon";
import Input from "../../../core/ui/client/components/Input";
import Spinner from "../../../core/ui/client/components/Spinner";
import EditQuestionDialog from "../../../modules/quiz/client/dialogs/EditQuestionDialog";
import UpsertAnswerDialog from "../../../modules/quiz/client/dialogs/UpsertAnswerDialog";
import useDeleteQuestionMutation from "../../../modules/quiz/client/mutations/useDeleteQuestionMutation";
import useQuestionByIdQuery from "../../../modules/quiz/client/queries/useQuestionByIdQuery";

const AdminQuestionIdPage = () => {

  const router = useRouter();
  const questionId = router.query.questionId as string;

  const { data: questionData, isLoading } = useQuestionByIdQuery(questionId);
  const { mutate: deleteQuestion, isLoading: isDeleting, isSuccess: isDeleted } = useDeleteQuestionMutation();

  const answers = questionData?.question?.answers as Answer[] | undefined;

  const onBack = () => router.push('/admin/questions');

  const onEdit = async () => {
    await NiceModal.show<Question>(EditQuestionDialog, { question: questionData?.question });
  }

  const onDelete = () => {
    deleteQuestion(questionId, {
      onSuccess: (res) => {
        toast.info('Frågan är nu raderad');
        router.push('/admin/questions');
      },
      onError: () => {
        toast.error("Frågan raderades inte, prova igen");
      }
    })
  }

  const onAddAnswer = async () => {
    await NiceModal.show<Question>(UpsertAnswerDialog, { questionId });
  }
  
  const onEditAnswer = async (answer: Answer) => {
    await NiceModal.show<Question>(UpsertAnswerDialog, { questionId, answer });
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header>
        <AdminTopbar />
      </header>
      
      <main className="px-4 py-8">
        <div className="w-full max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="font-light text-4xl">Quiz fråga</h1>
          </div>

          { isLoading || isDeleted ? <Spinner /> : <>

            <div className="bg-white rounded shadow p-4">
              <div className="flex justify-between mb-4">
                <h3 className="font-light text-3xl">Frågans text</h3>
                <IconButton onClick={onEdit}><EditIcon /></IconButton>
              </div>
              <div className="flex">
                <span className="font-medium w-8 shrink-0">sv:</span>
                <span>{ questionData?.question?.content.sv }</span>
              </div>
              <div className="flex">
                <span className="font-medium w-8 shrink-0">fi:</span>
                <span>{ questionData?.question?.content.fi }</span>
              </div>
            </div>

            
            <div className="bg-white rounded shadow p-4">
              <div className="flex justify-between mb-4">
                <h3 className="font-light text-3xl">Svar</h3>
                <IconButton onClick={onAddAnswer}><AddIcon /></IconButton>
              </div>

              <ul>
                { answers?.map(answer => (
                  <li key={answer.id} 
                    className="flex items-center px-4 py-3 border-b border-b-gray-200 last:border-b-0 hover:bg-gray-100 cursor-pointer"
                    onClick={() => onEditAnswer(answer)}
                  >
                    <span>{ answer.content.sv }</span>
                    { answer.isCorrect && <span className="ml-4 text-base select-none text-blue-500">(Rätt)</span> }
                  </li>
                )) }
              </ul>
            </div>

          </> }

          { isDeleted ? undefined : (
            <div className="flex justify-between mt-8 bg-white rounded shadow p-4">
              <Button onClick={onBack} variant="primary-outlined">Tillbaka</Button>
              <Button onClick={onDelete}>Radera</Button>
            </div>
          ) }

        </div>
      </main>
    </div>
  );
}

export default AdminQuestionIdPage;
