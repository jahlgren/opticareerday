import cn from 'classnames';

export type SpinnerProps = {
  size?: 'sm'|'md'|'lg'
}

const sizeLookup = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-4',
  lg: 'w-12 h-12 border-[6px]'
}

export default function Spinner({size='md'}: SpinnerProps) {
  return (
    <span className="relative flex-shrink-0 flex-grow-0 inline-flex justify-center items-center">
      <span className={cn("animate-spinner-linear inline-block rounded-full border-black/10 border-t-gray-700", sizeLookup[size])} />
      <span className={cn("absolute animate-spinner-ease inline-block rounded-full border-black/0 border-t-gray-700", sizeLookup[size])} />
    </span>
  );
}
