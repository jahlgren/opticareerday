import React from 'react';
import cn from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean,
  variant?: 'primary'|'primary-outlined'
}

const variants = {
  default: 'flex justify-center items-center px-6 py-3 text-base font-medium rounded ring-0 ring-offset-2 kb-focus:ring-2 outline-none select-none',
  primary: 'bg-primary text-on-primary hover:bg-primary-light ring-primary disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed',
  "primary-outlined": "border border-primary text-primary-dark hover:bg-primary/10 ring-primary disabled:bg-gray-200/50 disabled:text-gray-300 disabled:cursor-not-allowed disabled:border-0",
  loading: 'bg-gray-200 text-black/0 pointer-events-none'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className,
  loading,
  disabled,
  variant='primary',
  ...rest
}, ref) => {
  return (
    <button 
      ref={ref}
      disabled={loading || disabled}
      className={cn(
        variants.default,
        { [variants[variant]]: !loading },
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
Button.displayName = "Button";

export default Button;