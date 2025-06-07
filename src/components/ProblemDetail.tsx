import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle2, AlertCircle, Star } from 'lucide-react';
import { Problem } from '../types/Problem';
import CodeBlock from './CodeBlock';
import TestRunner from './TestRunner';

interface ProblemDetailProps {
  problem: Problem;
  onBack: () => void;
}

const difficultyColors = {
  Easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Hard: 'text-red-400 bg-red-400/10 border-red-400/20',
};

const ProblemDetail: React.FC<ProblemDetailProps> = ({ problem, onBack }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'solution' | 'tests'>('description');

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Problems</span>
          </button>
          
          <div className="flex items-center space-x-3">
            {problem.isBonus && (
              <div className="flex items-center space-x-1 text-amber-400">
                <Star size={16} />
                <span className="text-sm font-medium">Bonus</span>
              </div>
            )}
            <span
              className={`
                text-sm px-3 py-1 rounded-full font-medium border
                ${difficultyColors[problem.difficulty]}
              `}
            >
              {problem.difficulty}
            </span>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2">{problem.title}</h1>
        <p className="text-slate-300">{problem.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        {[
          { id: 'description', label: 'Problem' },
          { id: 'solution', label: 'Solution' },
          { id: 'tests', label: 'Test Cases' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              px-6 py-3 text-sm font-medium border-b-2 transition-colors
              ${
                activeTab === tab.id
                  ? 'text-blue-400 border-blue-400'
                  : 'text-slate-400 border-transparent hover:text-white'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'description' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
              <div className="space-y-4">
                {problem.examples.map((example, index) => (
                  <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-2">Input:</h4>
                        <CodeBlock code={example.input} language="text" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-2">Output:</h4>
                        <CodeBlock code={example.output} language="text" />
                      </div>
                    </div>
                    {example.explanation && (
                      <div className="mt-3 pt-3 border-t border-slate-600">
                        <h4 className="text-sm font-medium text-slate-300 mb-1">Explanation:</h4>
                        <p className="text-sm text-slate-400">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {problem.constraints.map((constraint, index) => (
                  <li key={index} className="text-sm">{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'solution' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Algorithm Implementation</h3>
              <CodeBlock code={problem.solution} language="typescript" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Approach</h3>
              <p className="text-slate-300 leading-relaxed">{problem.approach}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Complexity Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                  <h4 className="text-sm font-medium text-emerald-400 mb-2">Time Complexity</h4>
                  <code className="text-white font-mono text-sm">{problem.timeComplexity}</code>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                  <h4 className="text-sm font-medium text-blue-400 mb-2">Space Complexity</h4>
                  <code className="text-white font-mono text-sm">{problem.spaceComplexity}</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tests' && (
          <TestRunner problem={problem} />
        )}
      </div>
    </div>
  );
};

export default ProblemDetail;