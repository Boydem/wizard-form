export interface Question {
    id: string;
    title: string;
    description: string;
    validationRule: ValidationRule;
    skipConditions?: SkipCondition[];
    initialValue: string;
    type: 'text' | 'number';
}

export type ValidationRule = (
    value: any, // value of field
    values?: Record<string, any>, // all values of form
    path?: string // path of field, for example user.email or cart.0.price
  ) => string | null;

export type SkipCondition = (answers: Record<string, any>) => boolean;