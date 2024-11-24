import React from 'react'
import { FormInputProps } from "../types"

const FormInput = ({ formData, inputValue, setFormData, loading, fieldKey, type, placeholder }: FormInputProps) => {
    return (
        <div className="input-focus-effect">

            <input
                value={inputValue}
                type={type}
                className="input-style"
                placeholder={placeholder}
                disabled={loading}
                required
                onChange={(e) => { setFormData({ ...formData, [fieldKey]: e.target.value }) }}
            />
        </div>
    )
}

export default FormInput