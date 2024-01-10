import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import cn from 'classnames';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../../../../core/ui/client/components/Input";
import Logo from "../../../../../core/ui/client/components/Logo"
import StartAttemptBodyType, { startAttemptBodySchema } from "../../../shared/types/StartAttemptBodyType";
import useStartAttemptMutation from "../../mutations/useStartAttemptMutation";
import Spinner from "../../../../../core/ui/client/components/Spinner";
import { QuizStateData } from "../Quiz";
import { useTranslation } from "next-i18next";

export type QuizStatViewProps = {
  onStarted: (data: QuizStateData) => void
}

const StartQuizView = ({onStarted}: QuizStatViewProps) => {

  const {t} = useTranslation();
  const { mutate, isLoading: isStarting, isSuccess } = useStartAttemptMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<StartAttemptBodyType>({ resolver: yupResolver(startAttemptBodySchema) });

  useEffect(() => {
    if(!errors.email && !errors.name) return;
    toast.error(t('quiz-start-input-error')); 
  }, [errors]);

  const onSubmit = async (body: StartAttemptBodyType) => {
    mutate(body, {
      onSuccess: (res) => {
        onStarted({
          attempt: res.data.attempt,
          totalQuesitons: res.data.totalQuesitons,
          totalAnswered: res.data.totalAnswered,
          totalCorrectAnswers: 0
        });
      }
    });
  }

  return (
    <div className="flex flex-col items-center w-full max-w-[700px] p-4">
      <Logo title="quiz" />

      <p className="w-full mt-14 mb-6 text-lg sm:text-xl leading-6 md:leading-8">{t("quiz-start-message")}</p>

      <div className="flex flex-col space-y-2 w-full mt-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Input disabled={isStarting || isSuccess} label={t("quiz-name-input")!} className="w-full" {...register('name')} />
        <Input disabled={isStarting || isSuccess} label={t("quiz-email-input")!} className="w-full" {...register('email')} />
      </div>
      <p className="text-sm text-blue-700 w-full mt-2">{t("quiz-data-storage")}</p>

      <button disabled={isStarting || isSuccess} onClick={handleSubmit(onSubmit)} 
        className="relative flex justify-center items-center mt-5 sm:mt-16 px-8 py-4 rounded-full bg-primary text-on-primary font-medium select-none outline-0 hover:bg-primary-light disabled:bg-gray-300">
        <span className={cn(
          { "opacity-0": isStarting || isSuccess }
        )}>{t("quiz-start")}</span>
        { (isStarting || isSuccess) && <span className="absolute"><Spinner /></span> }
      </button>
    </div>
  );
}

export default StartQuizView;
