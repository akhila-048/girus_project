import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Problem } from '../types/Problem';
import { runTestCase } from '../utils/testRunner';

interface TestRunnerProps {
  problem: Problem;
}

interface TestResult {
  passed: boolean;
  output: any;
  expected: any;
  executionTime: number;
  error?: string;
}

const TestRunner: React.FC<TestRunnerProps> = ({ problem }) => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);

  const runAllTests = async () => {
    setRunning(true);
    const testResults: TestResult[] = [];

    for (const testCase of problem.testCases) {
      try {
        const startTime = performance.now();
        const result = await runTestCase(problem.functionName, problem.solution, testCase.input);
        const endTime = performance.now();
        
        testResults.push({
          passed: JSON.stringify(result) === JSON.stringify(testCase.expected),
          output: result,
          expected: testCase.expected,
          executionTime: endTime - startTime,
        });
      } catch (error) {
        testResults.push({
          passed: false,
          output: null,
          expected: testCase.expected,
          executionTime: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    setResults(testResults);
    setRunning(false);
  };

  const passedTests = results.filter(r => r.passed).length;
  const totalTests = problem.testCases.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Test Cases</h3>
        <button
          onClick={runAllTests}
          disabled={running}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Play size={16} />
          <span>{running ? 'Running...' : 'Run Tests'}</span>
        </button>
      </div>

      {results.length > 0 && (
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-medium">
              Test Results: {passedTests}/{totalTests} passed
            </span>
            <div className="flex items-center space-x-2 text-sm text-slate-300">
              <Clock size={16} />
              <span>
                Avg: {(results.reduce((sum, r) => sum + r.executionTime, 0) / results.length).toFixed(2)}ms
              </span>
            </div>
          </div>
          
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                passedTests === totalTests ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${(passedTests / totalTests) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {problem.testCases.map((testCase, index) => (
          <div
            key={index}
            className={`
              bg-slate-900/50 rounded-lg p-4 border transition-colors
              ${
                results[index]
                  ? results[index].passed
                    ? 'border-emerald-500/50'
                    : 'border-red-500/50'
                  : 'border-slate-600'
              }
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">Test Case {index + 1}</h4>
              {results[index] && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">
                    {results[index].executionTime.toFixed(2)}ms
                  </span>
                  {results[index].passed ? (
                    <CheckCircle2 size={20} className="text-emerald-400" />
                  ) : (
                    <XCircle size={20} className="text-red-400" />
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h5 className="text-slate-300 font-medium mb-2">Input:</h5>
                <pre className="bg-slate-800 rounded p-2 text-slate-200 overflow-x-auto">
                  {JSON.stringify(testCase.input, null, 2)}
                </pre>
              </div>
              
              <div>
                <h5 className="text-slate-300 font-medium mb-2">Expected:</h5>
                <pre className="bg-slate-800 rounded p-2 text-slate-200 overflow-x-auto">
                  {JSON.stringify(testCase.expected, null, 2)}
                </pre>
              </div>

              {results[index] && (
                <div>
                  <h5 className="text-slate-300 font-medium mb-2">
                    {results[index].error ? 'Error:' : 'Output:'}
                  </h5>
                  <pre className={`
                    bg-slate-800 rounded p-2 overflow-x-auto
                    ${results[index].error ? 'text-red-300' : 'text-slate-200'}
                  `}>
                    {results[index].error || JSON.stringify(results[index].output, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestRunner;