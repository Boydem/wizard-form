export const validationRules = {
    // required
    required: (value: string) => (value.length < 1 ? 'This field is required' : null),
    // min length
    minLength: (min: number) => (value: string) => (value.length < min ? `Must be at least ${min} characters` : null),
    // max length
    maxLength: (max: number) => (value: string) => (value.length > max ? `Must be at most ${max} characters` : null),
}