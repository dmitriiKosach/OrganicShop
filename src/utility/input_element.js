import React from "react";

export function getInputElementSmall(classNameInput, htmlFor, label, type, name, id, handler, placeholder, value) {
    return <div>
        <label className="input-title" htmlFor={htmlFor} >{label}</label>
        <div className="input-wrapper input-wrapper_selection">
            <input required className={classNameInput}  type={type} name={name} id={id} onChange={handler} placeholder={placeholder} value={value}/>
        </div>

    </div>
}

export function getInputElementBig(classNameInput, htmlFor, label, type, name, id, handler, placeholder, pattern, value) {
    return <div>
        <label className="input-title" htmlFor={htmlFor} >{label}</label>
        <div className="input-wrapper input-wrapper_element">
            <input required className={classNameInput}  type={type} name={name} id={id} onChange={handler} placeholder={placeholder} pattern={pattern} value={value}/>
        </div>

    </div>
}

export function getInputElement(classNameInput, htmlFor, label, type, name, id, handler, placeholder, value) {
    return <div>
        <label className="input-title" htmlFor={htmlFor} >{label}</label>
        <div className="input-wrapper input-wrapper_login">
            <input required className={classNameInput}  type={type} name={name} id={id} onChange={handler} placeholder={placeholder} value={value}/>
        </div>

    </div>
}

export function getInputElementRadio(classNameInput, label, type, name, handler, value) {
    return <>
        <input required className={classNameInput}  type={type} name={name} onChange={handler} value={value}/>
        <label className="form-group-header">{label}</label>
    </>
}

export function getOptions(options) {
    return options.map(option =>{
        return <option key={option} value={option}>{option}</option>
    })
}

export function getSelection(classNameInput, htmlFor, label, handler, name, id, options) {
    return <div>
        <label className="input-title" htmlFor={htmlFor}>{label}</label>
        <div className="input-wrapper input-wrapper_selection">
            <select required className={classNameInput} onChange={handler} name={name}>
                {getOptions(options)}
            </select>
        </div>
    </div>
}

export function getInputElementDate(classNameInput, htmlFor, type, name, id, handler, placeholder) {
    return <div>
        <input required className={classNameInput}  type={type} name={name} id={id} onChange={handler} placeholder={placeholder}/>
    </div>
}

export function getErrorMessage(className, error) {
    return <span className={className}>{error}</span>;
}

