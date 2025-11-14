export const validationRules = {
    // required
    required: (message?: string) => (value: any) => 
        !value || value.length < 1 ? message || 'This field is required' : null,
    
    // min length
    minLength: (min: number, message?: string) => (value: any) => 
        value?.length < min ? message || `Must be at least ${min} characters` : null,
    
    // max length
    maxLength: (max: number, message?: string) => (value: any) => 
        value?.length > max ? message || `Must be at most ${max} characters` : null,

    // Must be a number
    requiredNumber: (message?: string) => (value: any) => {
        if (!value || value.length < 1) {
            return 'This field is required';
        }
        return isNaN(Number(value)) 
            ? message || 'Must be a number' 
            : null;
    },

    // Must be a valid email
    validEmail: (message?: string) => (value: any) => {
        if (!value || value.length < 1) {
            return 'This field is required';
        }
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? message || 'Must be a valid email'
            : null;
    },
}