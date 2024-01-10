import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from "next/link";
import Logo from "../core/ui/client/components/Logo";
import DoubleArrowDownIcon from "../core/ui/client/components/icons/DoubleArrowDownIcon";
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

const companyLogos = [
  { src: "/logos/abilita-logo.png", name: "Abilita" },
  { src: "/logos/baltic-logo.jpg", name: "Baltic" },
  { src: "/logos/beamex-logo.png", name: "Beamex" },
  { src: "/logos/billerud-logo.jpg", name: "Billerud" },
  { src: "/logos/dobra-logo.png", name: "Dobra" },
  { src: "/logos/nautor-logo.png", name: "Nautor Svan" },
  { src: "/logos/ekeri-logo.jpg", name: "Ekero" },
  { src: "/logos/fresh-logo.png", name: "Fresh" },
  { src: "/logos/fluidbag-logo.jpg", name: "Fluidbag" },
  { src: "/logos/herrmans-logo.png", name: "Herrmans" },
  { src: "/logos/kaiser-logo.jpg", name: "Kaiser" },
  { src: "/logos/kpedu-logo.png", name: "kpedu" },
  { src: "/logos/kpo-logo.png", name: "KPO" },
  { src: "/logos/upm-logo.png", name: "UPM" },
  { src: "/logos/kronos-logo.jpg", name: "Kronos" },
  { src: "/logos/amada-logo.png", name: "Amada" },
  { src: "/logos/elho-logo.png", name: "Elho" },
  { src: "/logos/lofs-logo.jpg", name: "Löfs" },
  { src: "/logos/mirka-logo.jpg", name: "Mirka" },
  { src: "/logos/mkm-logo.png", name: "MKM Solutions" },
  { src: "/logos/nordiclights-logo.jpg", name: "Nordic lights" },
  { src: "/logos/ostp-logo.jpg", name: "OSTP" },
  { src: "/logos/ostromap-logo.png", name: "Ostromap" },
  { src: "/logos/ovph-logo.jpg", name: "Österbottens välfärdsområde" },
  { src: "/logos/rani-logo.jpg", name: "Rani" },
  { src: "/logos/solving-logo.jpg", name: "Solving" },
  { src: "/logos/sundstrom-logo.jpg", name: "Sundström" },
  { src: "/logos/nooga-logo.jpg", name: "Nooga" },
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
