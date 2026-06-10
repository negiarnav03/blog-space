// container accepts children and a className and other props and renders them
// it is used to display the content in a centered and responsive manner # to show the styling as it is


function Container({children}){
    return (
        <div className={`w-full max-w-7xl mx-auto px-4 `}>
            {children}
        </div>
    )
}

export default Container