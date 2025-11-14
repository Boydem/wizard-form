import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Wizard } from './Wizard';
import type { Question } from '../../types/question.type';
import { userEvent, render, screen, waitFor } from '@/../test-utils';

describe('Wizard', () => {
  const mockQuestions: Question[] = [
    {
      id: 'name',
      title: 'What is your name?',
      description: 'Please enter your full name',
      validationRule: (value) => (!value ? 'Name is required' : null),
      initialValue: '',
      type: 'text',
    },
    {
      id: 'age',
      title: 'What is your age?',
      description: 'Please enter your age',
      validationRule: (value) => (!value ? 'Age is required' : null),
      initialValue: '',
      type: 'number',
    },
    {
      id: 'email',
      title: 'What is your email?',
      description: 'Please enter your email',
      validationRule: null,
      initialValue: '',
      type: 'email',
    },
  ];

  let mockOnSubmit: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnSubmit = vi.fn();
  });

  describe('Rendering', () => {
    it('renders the first question initially', () => {
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      expect(screen.getByText('What is your name?')).toBeInTheDocument();
      expect(screen.getByText('Please enter your full name')).toBeInTheDocument();
    });

    it('renders within a form element', () => {
      const { container } = render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);
      
      expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('renders "No questions available" when questions array is empty', () => {
      render(<Wizard questions={[]} onSubmit={mockOnSubmit} />);

      expect(screen.getByText('No questions available')).toBeInTheDocument();
    });

    it('renders within a Paper component with proper styling', () => {
      const { container } = render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);
      
      const paper = container.querySelector('.mantine-Paper-root');
      expect(paper).toBeInTheDocument();
    });
  });

  describe('Navigation Buttons', () => {
    it('disables Previous button on first question', () => {
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      const previousButton = screen.getByRole('button', { name: /previous/i });
      expect(previousButton).toBeDisabled();
    });

    it('shows Next button on first question', () => {
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeInTheDocument();
      expect(nextButton).not.toBeDisabled();
    });

    it('shows Submit button on last question', async () => {
      const user = userEvent.setup();
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      // Navigate to last question
      const input = screen.getByRole('textbox');
      await user.type(input, 'John Doe');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByText('What is your age?')).toBeInTheDocument();
      });

      const ageInput = screen.getByRole('textbox');
      await user.clear(ageInput);
      await user.type(ageInput, '25');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
      });
    });

    it('enables Previous button after navigating forward', async () => {
      const user = userEvent.setup();
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'John Doe');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        const previousButton = screen.getByRole('button', { name: /previous/i });
        expect(previousButton).not.toBeDisabled();
      });
    });
  });

  describe('Form Navigation', () => {
    it('navigates to next question when Next is clicked with valid input', async () => {
      const user = userEvent.setup();
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'John Doe');

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText('What is your age?')).toBeInTheDocument();
      });
    });

    it('does not navigate when validation fails', async () => {
      const user = userEvent.setup();
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      // Should still be on first question
      expect(screen.getByText('What is your name?')).toBeInTheDocument();
      expect(screen.queryByText('What is your age?')).not.toBeInTheDocument();
    });

    it('shows validation error when trying to proceed with invalid input', async () => {
      const user = userEvent.setup();
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
    });

    it('navigates back to previous question when Previous is clicked', async () => {
      const user = userEvent.setup();
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      // Fill first question and go to second
      const input = screen.getByRole('textbox');
      await user.type(input, 'John Doe');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByText('What is your age?')).toBeInTheDocument();
      });

      // Go back
      const previousButton = screen.getByRole('button', { name: /previous/i });
      await user.click(previousButton);

      await waitFor(() => {
        expect(screen.getByText('What is your name?')).toBeInTheDocument();
      });
    });

    it('retains form values when navigating back and forth', async () => {
      const user = userEvent.setup();
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      // Fill first question
      const input = screen.getByRole('textbox');
      await user.type(input, 'John Doe');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByText('What is your age?')).toBeInTheDocument();
      });

      // Go back
      await user.click(screen.getByRole('button', { name: /previous/i }));

      await waitFor(() => {
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('John Doe');
      });
    });
  });

  describe('Form Submission', () => {
    it('calls onSubmit with form values when Submit is clicked', async () => {
      const user = userEvent.setup();
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      // Fill first question
      let input = screen.getByRole('textbox');
      await user.type(input, 'John Doe');
      await user.click(screen.getByRole('button', { name: /next/i }));

      // Fill second question
      await waitFor(() => {
        expect(screen.getByText('What is your age?')).toBeInTheDocument();
      });
      input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, '25');
      await user.click(screen.getByRole('button', { name: /next/i }));

      // Fill third question
      await waitFor(() => {
        expect(screen.getByText('What is your email?')).toBeInTheDocument();
      });
      input = screen.getByRole('textbox');
      await user.type(input, 'john@example.com');
      await user.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'John Doe',
          age: 25,
          email: 'john@example.com',
        });
      });
    });

    it('does not submit when last question validation fails', async () => {
      const questionsWithRequiredEmail: Question[] = [
        ...mockQuestions.slice(0, 2),
        {
          ...mockQuestions[2],
          validationRule: (value) => (!value ? 'Email is required' : null),
        },
      ];

      const user = userEvent.setup();
      render(<Wizard questions={questionsWithRequiredEmail} onSubmit={mockOnSubmit} />);

      // Navigate to last question
      let input = screen.getByRole('textbox');
      await user.type(input, 'John Doe');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByText('What is your age?')).toBeInTheDocument();
      });

      input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, '25');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByText('What is your email?')).toBeInTheDocument();
      });

      // Try to submit without filling email
      await user.click(screen.getByRole('button', { name: /submit/i }));

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('submits form when Enter key is pressed with valid input', async () => {
      const user = userEvent.setup();
      const singleQuestion: Question[] = [mockQuestions[0]];
      render(<Wizard questions={singleQuestion} onSubmit={mockOnSubmit} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'John Doe');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'John Doe',
        });
      });
    });
  });

  describe('Skip Conditions', () => {
    it('skips questions based on skip conditions', async () => {
      const questionsWithSkip: Question[] = [
        {
          id: 'hasCompany',
          title: 'Do you have a company?',
          description: 'Type yes or no',
          validationRule: null,
          initialValue: '',
          type: 'text',
        },
        {
          id: 'companyName',
          title: 'What is your company name?',
          description: 'Enter company name',
          validationRule: null,
          initialValue: '',
          type: 'text',
          skipConditions: [(values) => values.hasCompany !== 'yes'],
        },
        {
          id: 'final',
          title: 'Final question',
          description: 'Final',
          validationRule: null,
          initialValue: '',
          type: 'text',
        },
      ];

      const user = userEvent.setup();
      render(<Wizard questions={questionsWithSkip} onSubmit={mockOnSubmit} />);

      // Answer no to first question
      const input = screen.getByRole('textbox');
      await user.type(input, 'no');
      await user.click(screen.getByRole('button', { name: /next/i }));

      // Should skip to final question
      await waitFor(() => {
        expect(screen.getByText('Final question')).toBeInTheDocument();
        expect(screen.queryByText('What is your company name?')).not.toBeInTheDocument();
      });
    });

    it('includes skipped question when condition changes', async () => {
      const questionsWithSkip: Question[] = [
        {
          id: 'hasCompany',
          title: 'Do you have a company?',
          description: 'Type yes or no',
          validationRule: null,
          initialValue: '',
          type: 'text',
        },
        {
          id: 'companyName',
          title: 'What is your company name?',
          description: 'Enter company name',
          validationRule: null,
          initialValue: '',
          type: 'text',
          skipConditions: [(values) => values.hasCompany !== 'yes'],
        },
      ];

      const user = userEvent.setup();
      render(<Wizard questions={questionsWithSkip} onSubmit={mockOnSubmit} />);

      // Answer yes to first question
      const input = screen.getByRole('textbox');
      await user.type(input, 'yes');
      await user.click(screen.getByRole('button', { name: /next/i }));

      // Should show company name question
      await waitFor(() => {
        expect(screen.getByText('What is your company name?')).toBeInTheDocument();
      });
    });
  });

  describe('Question Types', () => {
    it('renders text input for text type questions', () => {
      render(<Wizard questions={[mockQuestions[0]]} onSubmit={mockOnSubmit} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders number input for number type questions', async () => {
      const user = userEvent.setup();
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      // Navigate to number question
      const input = screen.getByRole('textbox');
      await user.type(input, 'John Doe');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByText('What is your age?')).toBeInTheDocument();
      });

      // NumberInput uses textbox role
      const numberInput = screen.getByRole('textbox');
      expect(numberInput).toBeInTheDocument();
    });

    it('renders email input for email type questions', async () => {
      const user = userEvent.setup();
      render(<Wizard questions={mockQuestions} onSubmit={mockOnSubmit} />);

      // Navigate through to email question
      let input = screen.getByRole('textbox');
      await user.type(input, 'John Doe');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByText('What is your age?')).toBeInTheDocument();
      });

      input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, '25');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByText('What is your email?')).toBeInTheDocument();
      });

      const emailInput = screen.getByRole('textbox');
      expect(emailInput).toBeInTheDocument();
    });
  });
});