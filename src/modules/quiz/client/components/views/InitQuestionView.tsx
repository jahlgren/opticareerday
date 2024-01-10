import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Question from '../../../../../core/mikro-orm/shared/entities/Question';
import Button from '../../../../../core/ui/client/components/Button';
import useQuestionByIdQuery from '../../queries/useQuestionByIdQuery';

export type InitQuestionViewProps = {
  questionId: string,
  totalQuesitons: number,
  totalAnswered: number,
  onInitialized: (question: Question) => void,
  onFailedTryAgain: () => void
}

const InitQuestionView = ({
  questionId,
  totalQuesitons,
  totalAnswered,
  onInitialized,
  onFailedTryAgain
}: InitQuestionViewProps) => {

  const {t} = useTranslation();
  const [ mountedAt ] = useState(new Date());
  const [ animationCompleted, setAnimationCompleted ] = useState(false);
  const [ initFailed, setInitFailed ] = useState(false);
  const [ finished, setFinished] = useState(false);
  const { data, isLoading } = useQuestionByIdQuery(questionId);

  useEffect(() => {
    if(isLoading || !animationCompleted) return;
    if(data && data.question) {
      const now = new Date();
      const elapsed = now.getTime() - mountedAt.getTime();
      const delay = 1500 - elapsed;
      setTimeout(() => setFinished(true), delay > 0 ? delay : 0);
    } 
    else if(!isLoading) {
      setInitFailed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationCompleted, isLoading]);

  const onExitAnimationComplete = () => {
    if(!data?.question) return onFailedTryAgain();
    onInitialized(data.question);
  }
  
  return (
    <AnimatePresence onExitComplete={onExitAnimationComplete}>
      { !finished && (
        <motion.div
          className='w-full flex justify-center'
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{type: 'spring', stiffness: 150, damping: 17}}
          exit={{ x:'-100%', transition: { ease: 'easeIn', duration: 0.2 } }}
          onAnimationComplete={() => setAnimationCompleted(true)}
        >
          { !initFailed && <span className='font-light text-3xl'>{t("quiz-question")} {totalAnswered + 1} / {totalQuesitons}</span> }
          { initFailed && <div className='flex flex-col items-center space-y-4'>
            <span className='font-light text-3xl'>{t("quiz-error-something-went-wrong")}</span>
            <Button onClick={onFailedTryAgain}>{t("quiz-error-try-again")}</Button>
          </div>}
        </motion.div>
      ) }
    </AnimatePresence>  
  );
}

export default InitQuestionView;
