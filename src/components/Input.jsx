import React, { useId } from 'react'

// forwardRef is used to pass the ref to the parent component
// ref is a special prop that is passed to the parent component
// you don't need to use '' forwardRef '' anymore it is Deprecated in React-19, 
// in this update, now you can treat "ref" directly as a prop, 
// So it is not mandatory to use forwardRef anymore.


function Input({
    label,
    type="text",
    className="",
    ref,
    ...props
})

{
    const id = useId()
    return (
        <div className='w-full text-left'>
            {label && <label 
            className='inline-block mb-1.5 pl-1 text-[var(--text)] font-medium text-sm' 
            htmlFor={id}> 
                {label}
            </label>}

            <input 
            type={type}
            className={`px-3 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-h)] placeholder-[var(--text-muted)] outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 duration-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}

            />
        </div>
    )
}

export default Input