import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        {copied ? (
          <Check size={16} className="text-emerald-400" />
        ) : (
          <Copy size={16} className="text-slate-300" />
        )}
      </button>
      
      <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto border border-slate-600">
        <code className={`text-sm text-slate-200 language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;