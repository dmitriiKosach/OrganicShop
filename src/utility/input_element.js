import React from "react";

export function getInputElementSmall(classNameInput, htmlFor, label, type, name, id, handler, placeholder, value) {
    return <React.Fragment>
        <label className="input__title" htmlFor={htmlFor} >{label}</label>
        <div className="input__wrapper input__wrapper-selection">
            <input required className={classNameInput}  type={type} name={name} id={id} onChange={handler} placeholder={placeholder} value={value}/>
        </div>
    </React.Fragment>
}

export function getInputElementBig(classNameInput, htmlFor, label, type, name, id, handler, placeholder, pattern, value) {
    return <React.Fragment>
        <label className="input__title" htmlFor={htmlFor} >{label}</label>
        <div className="input__wrapper input__wrapper-element">
            <input required className={classNameInput}  type={type} name={name} id={id} onChange={handler} placeholder={placeholder} pattern={pattern} value={value}/>
        </div>
    </React.Fragment>
}

export function getInputElement(classNameInput, htmlFor, label, type, name, id, handler, placeholder, value) {
    return <React.Fragment>
        <label className="input__title" htmlFor={htmlFor} >{label}</label>
        <div className="input__wrapper input__wrapper-login">
            <input required className={classNameInput}  type={type} name={name} id={id} onChange={handler} placeholder={placeholder} value={value}/>
        </div>
    </React.Fragment>
}

export function getInputElementRadio(classNameInput, label, type, name, handler, value) {
    return <React.Fragment>
        <input required className={classNameInput}  type={type} name={name} onChange={handler} value={value}/>
        <label className="form__group-header">{label}</label>
    </React.Fragment>
}

export function getOptions(options) {
    return options.map(option =>{
        return <option key={option} value={option}>{option}</option>
    })
}

export function getSelection(classNameInput, htmlFor, label, handler, name, id, options) {
    return <React.Fragment>
        <label className="input__title" htmlFor={htmlFor}>{label}</label>
        <div className="input__wrapper input__wrapper-selection">
            <select required className={classNameInput} onChange={handler} name={name}>
                {getOptions(options)}
            </select>
        </div>
    </React.Fragment>


}

export function getInputElementDate(classNameInput, htmlFor, type, name, id, handler, placeholder) {
    return <React.Fragment>
        <input required className={classNameInput}  type={type} name={name} id={id} onChange={handler} placeholder={placeholder}/>
    </React.Fragment>
}

export function getErrorMessage(className, error) {
    return <span className={className}>{error}</span>;
}

