import React from 'react';
import cn from 'classnames';

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean,
}

const variants = {
  default: 'flex justify-center items-center w-12 h-12 rounded-full shrink-0 outline-0',
  primary: 'fill-typography-black hover:bg-black/5 ring-0 ring-black/50 kb-focus:ring-2',
  loading: 'bg-gray-200 text-black/0 fill-black/0 pointer-events-none'
};

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
  children,
  className,
  loading,
  disabled,
  ...rest
}, ref) => {
  return (
    <button 
      ref={ref}
      disabled={loading || disabled}
      className={cn(
        variants.default,
        { [variants.primary]: !loading },
        { [variants.loading]: loading },
        className
      )}
      { ...rest }
    >
      { loading && (
        <span className='absolute block rounded-full border-4 w-7 h-7 border-black/20 border-t-black/60 animate-spin'></span>
      ) }
      { children }
    </button>
  );
});

// This is needed for esling to not generate an error
// because the component uses forward ref
IconButton.displayName = "IconButton";

export default IconButton;
