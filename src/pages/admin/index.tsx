import Link from "next/link";
import { signOut } from 'next-auth/react';
import AdminTopbar from "../../core/ui/client/blocks/AdminTopbar";
import Button from "../../core/ui/client/components/Button";
import useAttemptStatsQuery from "../../modules/quiz/client/queries/useAttemptStatsQuery";
import Spinner from "../../core/ui/client/components/Spinner";
import useDeleteAllAttemptsMutation from "../../modules/quiz/client/mutations/useDeleteAllAttempts";

const AdminIndexPage = () => {

  const { data: resultData, isLoading } = useAttemptStatsQuery();
  const {mutate: deleteAllAnswers, isLoading: isDeleting} = useDeleteAllAttemptsMutation();

  const onDelete = () => {
    if(confirm('Är du säker på att du vill radera alla svar?')) {
      deleteAllAnswers();
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
            <h1 className="font-light text-4xl">Quiz svar</h1>
            <Button onClick={onDelete}>Radera alla svar</Button>
          </div>
          <div className="bg-white rounded shadow p-4 relative">
            {isDeleting && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-white/70">
                <Spinner size="lg" />
                <span>Raderar alla svar</span>
              </div>
            )}
            <table className="w-full overflow-x-auto">
              <thead>
                <tr className="border-b border-b-black/20">
                  <th className="text-left font-medium text-base px-2 py-2">Namn</th>
                  <th className="text-left font-medium text-base px-2 py-2" >Email</th>
                  <th className="text-right font-medium text-base px-2 py-2">Rätt svar</th>
                  <th className="text-right font-medium text-base px-2 py-2">Tidsåtgång</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={4} className="p-2"><Spinner /></td>
                  </tr>
                )}
                {isLoading || !resultData ? undefined : resultData.results
                  .filter(result => !!result.timeSpent)
                  .sort((a, b) => a.totalCorrect === b.totalCorrect 
                    ? (a.timeSpent! < b.timeSpent! ? -1 : 1)
                    : (a.totalCorrect > b.totalCorrect ? -1 : 1))
                  .map(result => (
                  <tr key={result.attemptId} className="border-b border-b-black/10">
                    <td className="text-left text-base px-2 py-2">{result.name}</td>
                    <td className="text-left text-base px-2 py-2" >{result.email}</td>
                    <td className="text-right text-base px-2 py-2">{result.totalCorrect}</td>
                    <td className="text-right text-base px-2 py-2">{result.timeSpent! / 1000} sek</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminIndexPage;
