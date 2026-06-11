import React from 'react'

function Button({
    children,
    type = 'button',
    textColor = 'text-white',
    bgColor = 'bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 font-medium shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20',
    className = '',
    ...props
})

{

  return (
    <button type={type} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button