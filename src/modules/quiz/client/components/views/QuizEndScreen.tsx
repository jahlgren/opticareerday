import { useTranslation } from "next-i18next";
import Logo from "../../../../../core/ui/client/components/Logo";

type QuizEndScreenProps = {
  correctAnswersCount: number,
  questionCount: number
}

const QuizEndScreen = ({ correctAnswersCount, questionCount }: QuizEndScreenProps) => {
  const {t} = useTranslation();
  return (
    <div className="flex flex-col items-center w-full max-w-[700px] p-4">
      <Logo title="quiz" />

      <div className="mt-8 sm:mt-16 space-y-4 text-center">
        <p>{t("quiz-end-message")}</p>
        <p>{t("quiz-end-correct-answers").replace("{?}", correctAnswersCount.toString())}</p>
        <p>{t("quiz-end-incorrect-answers").replace("{?}", (questionCount - correctAnswersCount).toString())}</p>
      </div>
    </div>
  );
}

export default QuizEndScreen;
