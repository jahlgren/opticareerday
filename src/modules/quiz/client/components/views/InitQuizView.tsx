import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import Button from "../../../../../core/ui/client/components/Button";
import Spinner from "../../../../../core/ui/client/components/Spinner"
import useAttemptQuery from "../../queries/useAttemptQuery";
import { QuizStateData } from "../Quiz";

export type InitQuizViewProps = {
  attemptId?: string,
  onInitialized: (data: QuizStateData|null) => void
}

const InitQuizView = ({ attemptId, onInitialized }: InitQuizViewProps) => {

  const {t} = useTranslation();
  const { data, isLoading, isError, refetch } = useAttemptQuery(attemptId);
  
  useEffect(() => {
    if(!isLoading && !isError) {
      onInitialized(!data ? null : {
        attempt: data.attempt,
        totalQuesitons: data.totalQuesitons,
        totalAnswered: data.totalAnswered,
        totalCorrectAnswers: data.totalCorrectAnswers
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onTryAgain = () => {
    refetch();
  }

  return (
    <div>
      { isError
        ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <span className='font-light text-3xl'>{t("quiz-error-something-went-wrong")}</span>
            <Button onClick={onTryAgain}>{t("quiz-error-try-again")}</Button>
          </div>
        ) : (
          <>
            <Spinner size="lg" />
            <span className="block mt-2 text-base text-typography-black/50 select-none">{t("quiz-preparing")}</span>
          </>
      )}
    </div>
  );
}

export default InitQuizView;
