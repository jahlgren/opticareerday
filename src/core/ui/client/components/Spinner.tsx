import cn from 'classnames';

export type SpinnerProps = {
  size?: 'sm'|'lg'
}

const sizes = {
  sm: 'w-7 h-7 border-4',
  lg: 'w-14 h-14 border-8'
}

const Spinner = ({ size = 'sm' }: SpinnerProps) => (
  <span className={cn(
    'mx-auto block rounded-full border-black/20 border-t-black/60 animate-spin',
    sizes[size]
  )}></span>
);

export default Spinner;
