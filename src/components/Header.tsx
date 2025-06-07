import React from 'react';
import { Code2, Github, Star } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-2 rounded-lg">
              <Code2 size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Programming Challenges</h1>
              <p className="text-sm text-slate-400">Master Algorithm Problems</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 text-sm text-slate-300">
              <div className="flex items-center space-x-1">
                <Star size={16} className="text-amber-400" />
                <span>5 Problems + Bonus</span>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Github size={16} />
              <span className="hidden sm:inline">View Code</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;