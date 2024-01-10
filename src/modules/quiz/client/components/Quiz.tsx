import { useState } from "react";
import { useTranslation } from "next-i18next";
import Attempt from "../../../../core/mikro-orm/shared/entities/Attempt";
import Question from "../../../../core/mikro-orm/shared/entities/Question";
import useLocalStorage from "../../../../core/utils/client/useLocalStorage";
import InitQuestionView from "./views/InitQuestionView";
import InitQuizView from "./views/InitQuizView";
import QuizEndScreen from "./views/QuizEndScreen";
import QuizQuestionView from "./views/QuizQuestionView";
import StartQuizView from "./views/StartQuizView";

type QuizStateType = 'init'|'start'|'initQuestion'|'question'|'end';

export type QuizStateData = {
  attempt: Attempt,
  question?: Question,
  totalQuesitons: number,
  totalAnswered: number,
  totalCorrectAnswers: number
}

const Quiz = () => {

  const [ storedAttemptId, setStoredAttemptId, removeStoredAttemptId ] = useLocalStorage('attemptId', null);
  const [ state, setState ] = useState<QuizStateType>('init');
  const [ data, setData ] = useState<QuizStateData|null>(null);
  
  const questionId = (data && data.attempt && data.attempt.nextQuestion) ? (
    typeof data.attempt.nextQuestion === 'string' ? data.attempt.nextQuestion : data.attempt.nextQuestion.id
  ) : '';
  
  const retry = () => {
    setState('init');
    setData(null);
  }

  const onInitialized = (data: QuizStateData|null) => {
    if(!data || !data.attempt) {
      setState('start');
      return;
    }
    setData(data);
    if(data.totalQuesitons === data.totalAnswered || !data.attempt.nextQuestion) {
      setState('end');
      return;
    }
    setState('initQuestion');
  }

  const onStarted = (data: QuizStateData) => {
    setStoredAttemptId(data.attempt.id);
    setData(data);
    setState('initQuestion');
  }

  const onQuestionInitialized = (question: Question) => {
    setData({ ...data!, question });
    if(question) {
      setState('question');
      return;
    }
    setState('init');
  }

  const onQuestionFinished = (data: QuizStateData) => {
    setData(data);
    if(data.attempt.nextQuestion) {
      setState('initQuestion');
      return;
    }
    setState('init')
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full grow overflow-x-hidden">
      { state === 'init' && <InitQuizView attemptId={storedAttemptId} onInitialized={onInitialized} /> }
      { state === 'start' && <StartQuizView onStarted={onStarted} /> }
      { state === 'initQuestion' && <InitQuestionView 
        questionId={questionId} 
        totalQuesitons={data!.totalQuesitons} 
        totalAnswered={data!.totalAnswered} 
        onInitialized={onQuestionInitialized} 
        onFailedTryAgain={retry}
      /> }
      { state === 'question' && <QuizQuestionView onFinished={onQuestionFinished} attemptId={data!.attempt.id} question={data!.question!} /> }
      { state === 'end' && <QuizEndScreen correctAnswersCount={data!.totalCorrectAnswers} questionCount={data!.totalQuesitons} /> }
    </div>
  );
}

export default Quiz;
