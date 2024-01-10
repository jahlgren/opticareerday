import React from 'react';
import cn from 'classnames';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  className,
  autoComplete='off',
  ...rest
}, ref) => {
  return (
    <div className={cn('w-full flex flex-col-reverse', className)}>
      <input 
        ref={ref} 
        className="transition-all w-full rounded border border-black/20 outline-none py-[calc(0.6875rem-2px)] px-4 ring-0 ring-primary/20 focus:border-primary focus:ring-2 disabled:text-typography-black/30"
        autoComplete={autoComplete}
        { ...rest } 
      />
      { label && (
        <label
          className='text-base select-none text-typography-black/70'
        >{ label }</label>
      )}
    </div>
  );
});

// This is needed for esling to not generate an error
// because the component uses forward ref
Input.displayName = "Input";

export default Input;