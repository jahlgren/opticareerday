import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from "next/link";
import Logo from "../core/ui/client/components/Logo";
import DoubleArrowDownIcon from "../core/ui/client/components/icons/DoubleArrowDownIcon";
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

const companyLogos = [
  { src: "/logos/temp.png", name: "..." },
];

const IndexPage = () => {
  const {t, i18n} = useTranslation();

  const changeLangLocale = {
    sv: 'fi',
    fi: 'sv'
  }

  return (
    <div className="flex flex-col items-center h-full p-4">
     <div className="flex flex-col justify-center items-center min-h-[70vh]">
        <Logo />
        <Link 
          className="hover:opacity-90 hover:text-primary mt-4 font-medium text-primary-dark" href="/"
          locale={changeLangLocale[i18n.language as 'sv'|'fi']}
        >{t("change-lang")}</Link>

        <h1 className="text-2xl md:text-3xl font-light mb-10 mt-10 sm:mt-20">{t("welcome-heading")}</h1>

        <p className="w-full max-w-[700px] text-lg text-center">{t("welcome-message")}</p>

        <Link href="/quiz" className="relative flex justify-center items-center mt-12 px-14 py-5 rounded-full bg-primary text-on-primary font-medium select-none outline-0 hover:bg-primary-light disabled:bg-gray-300">{t("open-quiz")}</Link>
     </div>

     <div className="flex flex-col items-center md:mt-6 w-full max-w-[1280px]">
        <h3 className="font-medium w-full text-center py-4">{t("participating-companies")}</h3>
        <div className="fill-typography-black mb-8">
          <DoubleArrowDownIcon size={40} />
        </div>
        <div className="flex flex-wrap justify-center gap-20 w-full max-w-[1000px]">
          {companyLogos.map(logo => (
            <div key={logo.src} className="flex items-center justify-center w-[250px]">
              <img src={logo.src} alt={logo.name} className="object-contain" />
            </div>
          ))}
        </div>
     </div>
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

export default IndexPage;
