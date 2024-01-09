import { forwardRef, InputHTMLAttributes } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  label?: string,
  fullWidth?: boolean,
  helpText?: string,
  error?: boolean
}

const inputVariantLookup = {
  regular: 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 disabled:ring-gray-200 sm:text-sm sm:leading-6',

  error: 'block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 disabled:ring-gray-200 sm:text-sm sm:leading-6'
}

const helpTextVariantLookup = {
  regular: 'mt-2 text-sm text-gray-500',
  error: 'mt-2 text-sm text-red-600'
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  autoComplete='off',
  fullWidth=false,
  label,
  helpText,
  error,
  disabled,
  ...props
}: InputProps, ref) =>{
  
  const variant = error ? 'error' : 'regular';

  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          ref={ref}
          autoComplete={autoComplete}
          className={inputVariantLookup[variant]}
          disabled={disabled}
          {...props}
          aria-invalid={error}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {!!helpText && (
        <p className={helpTextVariantLookup[variant]}>
          {helpText}
        </p>
      )}
    </div>
 )});

 export default Input;
