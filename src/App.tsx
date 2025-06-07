import React, { useState } from 'react';
import { Code2, Menu, X } from 'lucide-react';
import Header from './components/Header';
import ProblemsList from './components/ProblemsList';
import ProblemDetail from './components/ProblemDetail';
import { problems } from './data/problems';

function App() {
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProblemSelect = (id: number) => {
    setSelectedProblem(id);
    setMobileMenuOpen(false);
  };

  const handleBackToList = () => {
    setSelectedProblem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden fixed top-20 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Sidebar */}
          <div className={`
            lg:w-1/3 xl:w-1/4 
            ${mobileMenuOpen ? 'block' : 'hidden lg:block'}
            lg:relative fixed inset-0 top-16 bg-slate-900/95 lg:bg-transparent z-40
            lg:z-auto p-4 lg:p-0
          `}>
            <div className="lg:sticky lg:top-8">
              <ProblemsList
                problems={problems}
                selectedProblem={selectedProblem}
                onProblemSelect={handleProblemSelect}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:w-2/3 xl:w-3/4">
            {selectedProblem !== null ? (
              <ProblemDetail
                problem={problems.find(p => p.id === selectedProblem)!}
                onBack={handleBackToList}
              />
            ) : (
              <div className="text-center py-16">
                <Code2 size={64} className="text-blue-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Welcome to Programming Challenges
                </h2>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                  Select a problem from the sidebar to view the challenge description,
                  see the solution implementation, and run test cases.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;