import { describe, it, expect, vi } from 'vitest';
import { WizardQuestion } from './WizardQuestion';
import type { Question } from '../../types/question.type';
import { userEvent, render, screen } from '@/../test-utils';

describe('WizardQuestion', () => {
  const mockTextQuestion: Question = {
    id: 'name',
    title: 'What is your name?',
    description: 'Please enter your full name',
    validationRule: null,
    initialValue: '',
    type: 'text',
  };

  const mockNumberQuestion: Question = {
    id: 'age',
    title: 'What is your age?',
    description: 'Please enter your age',
    validationRule: null,
    initialValue: '',
    type: 'number',
  };

  const mockEmailQuestion: Question = {
    id: 'email',
    title: 'What is your email?',
    description: 'Please enter your email address',
    validationRule: null,
    initialValue: '',
    type: 'email',
  };

  const mockRequiredQuestion: Question = {
    ...mockTextQuestion,
    validationRule: (value) => (!value ? 'This field is required' : null),
  };

  it('renders question title and description', () => {
    render(
      <WizardQuestion
        inputKey="test-key"
        question={mockTextQuestion}
        value=""
        onChange={vi.fn()}
      />
    );

    expect(screen.getByText('What is your name?')).toBeInTheDocument();
    expect(screen.getByText('Please enter your full name')).toBeInTheDocument();
  });

  it('renders TextInput for text type questions', () => {
    render(
      <WizardQuestion
        inputKey="test-key"
        question={mockTextQuestion}
        value=""
        onChange={vi.fn()}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders NumberInput for number type questions', () => {
    const { container } = render(
      <WizardQuestion
        inputKey="test-key"
        question={mockNumberQuestion}
        value={0}
        onChange={vi.fn()}
      />
    );
  
    // NumberInput has specific controls/buttons that TextInput doesn't
    const numberInput = container.querySelector('.mantine-NumberInput-root');
    expect(numberInput).toBeInTheDocument();
    
    // Or check for increment/decrement controls
    const controls = container.querySelector('.mantine-NumberInput-controls');
    expect(controls).toBeInTheDocument();
  });

  it('renders email input for email type questions', () => {
    render(
      <WizardQuestion
        inputKey="test-key"
        question={mockEmailQuestion}
        value=""
        onChange={vi.fn()}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('shows asterisk for required fields', () => {
    const { container } = render(
      <WizardQuestion
        inputKey="test-key"
        question={mockRequiredQuestion}
        value=""
        onChange={vi.fn()}
      />
    );

    // Mantine adds withAsterisk class or attribute
    const asterisk = container.querySelector('.mantine-InputWrapper-required');
    expect(asterisk).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();

    render(
      <WizardQuestion
        inputKey="test-key"
        question={mockTextQuestion}
        value=""
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'John Doe');

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('displays error message when provided', () => {
    render(
      <WizardQuestion
        inputKey="test-key"
        question={mockTextQuestion}
        value=""
        onChange={vi.fn()}
        error="This field is required"
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(
      <WizardQuestion
        inputKey="test-key"
        question={mockTextQuestion}
        value="John Doe"
        onChange={vi.fn()}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('John Doe');
  });
});