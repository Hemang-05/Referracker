import { FormSchema } from './types';

export const SUPP_QUIZ_SCHEMA: FormSchema = {
  questions: [
    {
      id: "q1",
      text: "What does 'Cap' mean in Gen Z slang?",
      type: "single",
      options: [
        { value: "wrong", label: "Nothing", isCorrect: false },
        { value: "correct", label: "Lie", isCorrect: true },
        { value: "wrong", label: "Honesty", isCorrect: false },
        { value: "wrong", label: "Cover", isCorrect: false }
      ],
      required: true,
      order: 1
    },
    {
      id: "q2", 
      text: "What does 'Drip' mean in Gen Z slang?",
      type: "single",
      options: [
        { value: "wrong", label: "Information", isCorrect: false },
        { value: "correct", label: "Fashionable Clothing", isCorrect: true },
        { value: "wrong", label: "Truthfulness", isCorrect: false },
        { value: "wrong", label: "Nothing", isCorrect: false }
      ],
      required: true,
      order: 2
    },
    {
      id: "q3",
      text: "What does 'Tea' mean in Gen Z slang?",
      type: "single", 
      options: [
        { value: "correct", label: "Gossip", isCorrect: true },
        { value: "wrong", label: "Drink", isCorrect: false },
        { value: "wrong", label: "Nothing", isCorrect: false },
        { value: "wrong", label: "Skills", isCorrect: false }
      ],
      required: true,
      order: 3
    },
    {
      id: "personal_info",
      text: "Tell us about yourself",
      type: "text",
      required: true,
      order: 13
    }
  ],
  settings: {
    requireReferral: false,
    passingScore: 6,
    showResults: true
  }
};
