import NiceModal from "@ebay/nice-modal-react";
import Link from "next/link";
import { useRouter } from "next/router";
import Question from "../../../core/mikro-orm/shared/entities/Question";
import AdminTopbar from "../../../core/ui/client/blocks/AdminTopbar";
import Button from "../../../core/ui/client/components/Button";
import Spinner from "../../../core/ui/client/components/Spinner";
import AddQuestionDialog from "../../../modules/quiz/client/dialogs/AddQuestionDialog";
import useAllQuestions from "../../../modules/quiz/client/queries/useAllQuestionsQuery";

const AdminQuestionsPage = () => {

  const router = useRouter();
  const { data: questionsData, isLoading,  } = useAllQuestions();
  const questions = questionsData?.questions;

  const addQuestion = async () => {
    const question = await NiceModal.show<Question>(AddQuestionDialog);
    if(question) {
      router.push('/admin/questions/' + question.id);
    }
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header>
        <AdminTopbar />
      </header>
      
      <main className="px-4 py-8">
        <div className="w-full max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="font-light text-4xl">Quiz frågor</h1>
            <Button onClick={addQuestion}>Skapa ny fråga</Button>
          </div>
          <div className="bg-white rounded shadow p-4">
            
            { isLoading ? <Spinner /> : (
              <ul>
                { questions?.map(question => (
                  <li key={question.id} className="border-b border-b-gray-200 last:border-b-0">
                    <Link
                      className="block px-4 py-3 w-full text-left hover:bg-gray-100"
                      href={"/admin/questions/" + question.id}
                    >{ question.content.sv }</Link>
                  </li>
                )) }
              </ul>
            ) }

          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminQuestionsPage;
