import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Quiz from "../../modules/quiz/client/components/Quiz";

const QuizPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Quiz />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common']))
    }
  }
}

export default QuizPage;
