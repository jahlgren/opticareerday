import { forwardRef, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  variant?: 'primary' | 'secondary' | 'soft',
  loading?: boolean,
  fullWidth?: boolean
}

const baseClasses = 'relative rounded-md select-none flex justify-center items-center';

const variantLookup = {
  primary: 'bg-primary-500 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:bg-gray-200 disabled:text-gray-400',

  secondary: 'bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:ring-0',
  
  soft: 'bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-100 disabled:bg-gray-200 disabled:text-gray-400'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant='secondary',
  loading=false,
  fullWidth=false,
  children,
  disabled,
  ...props
}: ButtonProps, ref) => (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variantLookup[variant],
        {'w-full': fullWidth}
      )}
      disabled={disabled||loading}
      {...props}
    >
      {loading && (
        <svg className="absolute animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      <span className={cn({"text-transparent": loading})}>
        {children}
      </span>
    </button>
));

export default Button;
