import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from "next/link";
import Logo from "../core/ui/client/components/Logo";
import DoubleArrowDownIcon from "../core/ui/client/components/icons/DoubleArrowDownIcon";
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

const companyLogos = [
  { src: "logos/oy-eur-mark-ab.jpg", name: "Oy Eur-Mark Ab" },
  { src: "logos/franks-maleri.png", name: "Franks Måleri" },
  { src: "logos/bs-metall-ab-oy.png", name: "BS-Metall Ab Oy" },
  { src: "logos/beamex-oy-ab.png", name: "Beamex Oy Ab" },
  { src: "logos/billerud-finland-oy.jpg", name: "Billerud Finland Oy" },
  { src: "logos/snellmans-kottforadling-ab.png", name: "Snellmans Köttförädling Ab" },
  { src: "logos/baltic-yachts.jpg", name: "Baltic Yachts" },
  { src: "logos/mirka-oy.jpg", name: "Mirka Oy" },
  { src: "logos/lissn-consulting-ab.jpg", name: "Lissn Consulting Ab" },
  { src: "logos/amada-automation-europe.png", name: "AMADA Automation Europe" },
  { src: "logos/ostp-finland-oy-ab.jpg", name: "OSTP Finland Oy Ab" },
  { src: "logos/tyllis-oy-ab.png", name: "Tyllis Oy Ab" },
  { src: "logos/nordic-lights.png", name: "Nordic Lights" },
  { src: "logos/ab-rani-plast-oy.jpg", name: "Ab Rani Plast Oy" },
  { src: "logos/oy-fluid-bag-ab.png", name: "Oy Fluid-Bag Ab" },
  { src: "logos/caverion-suomi-oy.svg", name: "Caverion Suomi Oy" },
  { src: "logos/jnt.jpg", name: "JNT" },
  { src: "logos/optimaplus-ab.png", name: "OptimaPlus Ab" },
  { src: "logos/oy-varax-products-ab.png", name: "Oy Varax-Products Ab" },
  { src: "logos/ab-solving-oy.jpg", name: "Ab Solving Oy" },
  { src: "logos/kongsberg-maritime-oy-kokkola.png", name: "Kongsberg Maritime Oy Kokkola" },
  { src: "logos/oy-nautor-ab.png", name: "Oy Nautor Ab" },
  { src: "logos/handelslaget-kpo.png", name: "Handelslaget KPO" },
  { src: "logos/attendo-oy.svg", name: "Attendo OY" },
  { src: "logos/sundstrom-ab-oy.jpg", name: "Sundström Ab Oy" },
  { src: "logos/osterbottens-valfardsomrade--pohjanmaan-hyvinvointialue.jpg", name: "Österbottens välfärdsområde / Pohjanmaan hyvinvointialue" },
  { src: "logos/ab-b-portin-oy.png", name: "Ab B: Portin Oy" },
  { src: "logos/lofs-ab-oy.jpg", name: "Löfs Ab Oy" },
  { src: "logos/ab-tetrix-oy.jpg", name: "Ab TETRIX Oy" }
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
