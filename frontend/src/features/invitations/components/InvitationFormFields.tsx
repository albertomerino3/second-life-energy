import type { Role } from '../../roles/services/roleService.js'

export interface InvitationFormValues {
    email: string
    roleId: string
}

interface InvitationFormFieldsProps {
    values: InvitationFormValues
    roles: Role[]
    onChange: (field: keyof InvitationFormValues, value: string) => void
    disabled?: boolean
}

function updateValidationMessage(input: HTMLInputElement) {
    input.setCustomValidity('')
    const { validity } = input
    let message = ''

    if (validity.valueMissing) {
        message = 'Enter the email address.'
    } else if (validity.typeMismatch) {
        message = 'Enter a valid email address.'
    } else if (validity.tooLong) {
        message = 'Enter no more than 255 characters.'
    }

    input.setCustomValidity(message)
}

function InvitationFormFields({ values, roles, onChange, disabled }: InvitationFormFieldsProps) {
    const inputClass = 'mt-1 w-full rounded border border-gray-300 p-2'

    return (
        <fieldset disabled={disabled} className="space-y-4 disabled:opacity-60"
            onInvalid={(event) => {
                if (event.target instanceof HTMLInputElement) updateValidationMessage(event.target)
            }}
            onInput={(event) => {
                if (event.target instanceof HTMLInputElement) updateValidationMessage(event.target)
            }}>
            <label className="block">
                Email
                <input autoFocus name="email" type="email" required maxLength={255}
                    className={inputClass} value={values.email}
                    onChange={(event) => onChange('email', event.target.value)} />
            </label>
            <label className="block">
                Role
                <select name="roleId" required
                    className={inputClass} value={values.roleId}
                    onChange={(event) => onChange('roleId', event.target.value)}>
                    <option value="">Select a role</option>
                    {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                </select>
            </label>
        </fieldset>
    )
}

export default InvitationFormFields
