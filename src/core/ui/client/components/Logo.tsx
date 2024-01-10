export type LogoProps = {
  title?: string
}

const Logo = ({title}: LogoProps) => {
  return (
    <div className="relative inline-flex flex-col select-none grow-0">
      <span 
        className="text-4xl font-logo font-bold leading-none"
      >OptiCareer Day</span>
      { title && <span
        className="absolute text-base font-bold leading-none text-red-500 right-5 -bottom-3"
      >{ title }</span> }
    </div>
  );
}

export default Logo;
