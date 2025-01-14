import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from "next/link";
import Logo from "../core/ui/client/components/Logo";
import DoubleArrowDownIcon from "../core/ui/client/components/icons/DoubleArrowDownIcon";
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

const companyLogos = [
  { src: "logos/alfen-elkamo-oy-ab.png", name: "Alfen Elkamo Oy Ab" },
  { src: "logos/alholmen-industrial-park.jpg", name: "Alholmen Industrial Park" },
  { src: "logos/amada-automation-europe.svg", name: "AMADA Automation Europe" },
  { src: "logos/b-portin-ab-oy.png", name: "B. Portin Ab Oy" },
  { src: "logos/baltic-yachts.svg", name: "Baltic Yachts" },
  { src: "logos/bs-metall-ab-oy.svg", name: "BS-Metall Ab Oy" },
  { src: "logos/caverion-suomi-oy.jpg", name: "Caverion Suomi Oy" },
  { src: "logos/dobrafinland-oy-ab.jpg", name: "Dobrafinland Oy Ab" },
  { src: "logos/ekeri-oy.jpg", name: "Ekeri Oy" },
  { src: "logos/eur-mark-oy-ab.jpg", name: "Eur-Mark Oy Ab" },
  { src: "logos/fluid-bag-oy-ab.jpg", name: "Fluid-Bag Oy Ab" },
  { src: "logos/fresh-servant.jpg", name: "Fresh Servant" },
  { src: "logos/handelslaget-kpo.png", name: "Handelslaget KPO" },
  { src: "logos/herrfors-oy-ab.jpg", name: "Herrfors Oy Ab" },
  { src: "logos/herrmans-bike-components.svg", name: "Herrmans Bike Components" },
  { src: "logos/ingves--svanback-ab-oy.svg", name: "Ingves & Svanbäck Ab Oy" },
  { src: "logos/kongsberg-maritime-finland-oy.png", name: "Kongsberg Maritime Finland OY" },
  { src: "logos/kpedu-keski-pohjanmaan-koulutusyhtyma.png", name: "Kpedu, Keski-Pohjanmaan koulutusyhtymä" },
  { src: "logos/kronos-machinery-oy-ab.png", name: "Kronos Machinery Oy Ab" },
  { src: "logos/mirka.svg", name: "Mirka" },
  { src: "logos/nautor-oy-ab.svg", name: "Nautor Oy Ab" },
  { src: "logos/nordic-lights-ltd.svg", name: "Nordic Lights Ltd." },
  { src: "logos/ostp-finland-oy-ab.jpg", name: "OSTP Finland Oy Ab" },
  { src: "logos/pavis-oy-ab.png", name: "Pavis Oy Ab" },
  { src: "logos/prevex-oy-ab.jpg", name: "Prevex Oy Ab" },
  { src: "logos/projekt-integration-works-staden-jakobstadintegrationsenheten.jpeg", name: "Projekt Integration Works, (Staden Jakobstad/Integrationsenheten)" },
  { src: "logos/rani-plast-ab-oy.jpg", name: "Rani Plast Ab Oy" },
  { src: "logos/snellmans-kottforadling.svg", name: "Snellmans Köttförädling" },
  { src: "logos/solving-ab-oy.jpg", name: "Solving Ab Oy" },
  { src: "logos/sundstrom-ab-oy.jpg", name: "Sundström Ab Oy" },
  { src: "logos/sweco-finland-oy.zip", name: "Sweco Finland Oy" },
  { src: "logos/tetrix.svg", name: "TETRIX" },
  { src: "logos/tyllis-oy-ab.png", name: "Tyllis Oy Ab" },
  { src: "logos/varax-products-oy-ab.png", name: "Varax-Products Oy Ab" },
  { src: "logos/yrkeshogskolan-novia.svg", name: "Yrkeshögskolan Novia" },
  { src: "logos/osterbottens-valfardsomrade--pohjanmaan-hyvinvointialue.jpg", name: "Österbottens välfärdsområde / Pohjanmaan hyvinvointialue" }
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
