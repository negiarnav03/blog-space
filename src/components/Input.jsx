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
    ...props,
    ref
    
})

{
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block m-1 pl-1' 
            htmlFor={id}> 
                {label}
            </label>}

            <input 
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
            ref={ref}
            {...props}
            id={id}

            />
        </div>
    )
}

export default Input