import React, {useId} from 'react'

function Select({
    options,
    label,
    className="",
    ref,
    ...props
}) {
    const id = useId()
  return (
    <div className='w-full text-left'>
        {label && <label htmlFor={id} className='inline-block mb-1.5 pl-1 text-[var(--text)] font-medium text-sm'>{label}</label>}
        <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-h)] outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 duration-200 w-full ${className}`}
        >
        {options?.map((option) => (
            <option key={option} value={option} className="bg-[var(--card-bg)] text-[var(--text-h)]">
                {option}
            </option>
        ))}
           

        </select>

    </div>
  )
}

export default Select