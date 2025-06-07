import React from 'react';
import { CheckCircle2, Circle, Star } from 'lucide-react';
import { Problem } from '../types/Problem';

interface ProblemsListProps {
  problems: Problem[];
  selectedProblem: number | null;
  onProblemSelect: (id: number) => void;
}

const difficultyColors = {
  Easy: 'text-emerald-400 bg-emerald-400/10',
  Medium: 'text-amber-400 bg-amber-400/10',
  Hard: 'text-red-400 bg-red-400/10',
};

const ProblemsList: React.FC<ProblemsListProps> = ({
  problems,
  selectedProblem,
  onProblemSelect,
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center">
        <Circle size={20} className="text-blue-400 mr-2" />
        Challenges
      </h2>
      
      <div className="space-y-3">
        {problems.map((problem) => (
          <button
            key={problem.id}
            onClick={() => onProblemSelect(problem.id)}
            className={`
              w-full text-left p-4 rounded-lg border transition-all duration-200
              hover:scale-[1.02] hover:shadow-lg
              ${
                selectedProblem === problem.id
                  ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'bg-slate-700/30 border-slate-600 hover:bg-slate-600/40 hover:border-slate-500'
              }
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-white text-sm leading-tight">
                {problem.title}
              </h3>
              {problem.isBonus && (
                <Star size={16} className="text-amber-400 flex-shrink-0 ml-2" />
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span
                className={`
                  text-xs px-2 py-1 rounded-full font-medium
                  ${difficultyColors[problem.difficulty]}
                `}
              >
                {problem.difficulty}
              </span>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">#{problem.id}</span>
                {selectedProblem === problem.id ? (
                  <CheckCircle2 size={16} className="text-emerald-400" />
                ) : (
                  <Circle size={16} className="text-slate-500" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-600">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Progress</span>
          <span className="text-white font-medium">
            {problems.length} Problems
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
          <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsList;