import { AnimatePresence, motion} from 'framer-motion';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import Answer from '../../../../../core/mikro-orm/shared/entities/Answer';
import Question from "../../../../../core/mikro-orm/shared/entities/Question"
import useAttemptAnswerMutation from '../../mutations/useAttemptAnswerMutation';
import { QuizStateData } from '../Quiz';
import { useTranslation } from 'next-i18next';

type QuizQuestionViewProps = {
  attemptId: string,
  question: Question,
  onFinished: (data: QuizStateData) => void
}

const QuizQuestionView = ({
  attemptId,
  question,
  onFinished
}: QuizQuestionViewProps) => {

  const {t, i18n} = useTranslation();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [answeredId, setAnsweredId] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [hasFinishedAnswering, setHasFinishedAnswering] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [nextData, setNextData] = useState<QuizStateData>();
  const {mutate, isLoading: isAnswering} = useAttemptAnswerMutation(attemptId);

  useEffect(() => {
    const answers = [...(question.answers as unknown as Answer[])];
    const answersRandomOrder: Answer[] = [];
    while(answers.length > 0) 
      answersRandomOrder.push(answers.splice(Math.floor(answers.length * Math.random()), 1)[0]);
    setAnswers(answersRandomOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  useEffect(() => {
    if(!hasFinishedAnswering) return;
    const timeout = setTimeout(() => setAnimateOut(true), 1500);
    return () => clearTimeout(timeout);
  }, [hasFinishedAnswering]);

  const hasAnswered = answeredId.length > 0;

  const onAnswer = (answerId: string) => {
    if(hasAnswered) return;
    setAnsweredId(answerId);
    mutate({
      questionId: question.id,
      answerId
    }, {
      onSuccess: (res) => {
        setNextData({
          attempt: res.data.attempt,
          totalAnswered: res.data.totalAnswered,
          totalQuesitons: res.data.totalQuesitons,
          totalCorrectAnswers: res.data.totalCorrectAnswers
        });
        setCorrectAnswers(res.data.correctAnswerIds);
        setHasFinishedAnswering(true);
      },
      onError: () => {
        setAnsweredId('');
      }
    });
  }

  const onAnimatedOut = () => {
    onFinished(nextData!);
  }

  const isCorrect = (answerId: string, ids?: string[]) => !!((ids || correctAnswers).find(ca => ca === answerId));

  return (
    <AnimatePresence onExitComplete={onAnimatedOut}>
      { !animateOut && (
        <motion.div 
          className='flex flex-col items-center w-full p-4'
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{type: 'spring', stiffness: 150, damping: 17}}
          exit={{ x:'-100%', transition: { ease: 'easeIn', duration: 0.2 } }}
        >
          <div className='max-w-[700px]'>
            <p className="text-2xl text-center">{ question.content[i18n.language as 'sv'|'fi'] }</p>
              { answers.length > 0 && (
                <motion.div
                  className={cn(
                    'flex flex-col justify-start space-y-4',
                    { "overflow-hidden": !hasAnswered }
                  )}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto',
                    transition: { ease: 'easeOut', delay: 2 }
                  }}
                >
                  <div className='relative flex justify-center items-center'>
                    <hr className='block w-full border-0 bg-gray-200 my-8 h-[2px] shrink-0' />
                  </div>
                  { answers.map(answer => (
                    <button
                      key={answer.id}
                      disabled={isAnswering || hasAnswered}
                      className={cn(
                        "relative flex justify-center items-center w-full px-4 py-2 rounded transition-all border",
                        { "border-gray-400 hover:bg-gray-100": !hasAnswered },
                        { "border-gray-300 text-gray-500 animate-pulse": isAnswering},
                        { "after:border-4 after:border-gray-400 after:absolute after:inset-[-2px]": (isAnswering && answer.id === answeredId) },
                        { "after:border-4 after:border-green-500 after:border-dashed after:absolute after:inset-[-2px]": (hasAnswered && answer.id !== answeredId && isCorrect(answer.id)) },
                        { "after:border-4 after:border-red-500 after:absolute after:inset-[-2px] bg-red-100": (hasAnswered && answer.id === answeredId && correctAnswers.length > 0 && !isCorrect(answer.id)) },
                        { "after:border-4 after:border-green-500 after:absolute after:inset-[-2px] bg-green-100": (hasAnswered && answer.id === answeredId && isCorrect(answer.id)) },
                      )}
                      onClick={() => onAnswer(answer.id)}
                    >
                      { answer.content[i18n.language as 'sv'|'fi'] }
                    </button>
                  )) }
                </motion.div>
              ) }
          </div>
        </motion.div>
      ) }
    </AnimatePresence>
  );
}

/*

                  <motion.hr key={1} className='block w-full border-0 bg-gray-200 my-8 overflow-hidden' 
                    variants={lineVariants}
                  />
                  */

export default QuizQuestionView;
