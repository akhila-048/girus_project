export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isBonus?: boolean;
  examples: Example[];
  constraints: string[];
  solution: string;
  functionName: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  testCases: TestCase[];
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: any;
  expected: any;
}