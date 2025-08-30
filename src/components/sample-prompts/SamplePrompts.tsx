import React from 'react';
import './SamplePrompts.scss';

interface SamplePromptsProps {
  onPromptClick: (prompt: string) => void;
}

const prompts = [
  {
    title: "AI & Autonomy",
    question: "Should AI systems be allowed to make life-or-death decisions in healthcare without human oversight?",
    icon: "🤖"
  },
  {
    title: "Digital Privacy",
    question: "Is it ethical for social media companies to use our personal data to predict our behavior, even if we've agreed to the terms of service?",
    icon: "🔐"
  },
  {
    title: "Environmental Ethics",
    question: "Do we have a moral obligation to future generations to limit our carbon footprint, even if it means personal sacrifice today?",
    icon: "🌍"
  },
  {
    title: "Truth & Honesty",
    question: "Is it ever morally justified to lie to protect someone's feelings? What would Kant say versus a utilitarian approach?",
    icon: "💭"
  }
];

const SamplePrompts: React.FC<SamplePromptsProps> = ({ onPromptClick }) => {
  return (
    <div className="sample-prompts-container">
      <h3 className="prompts-title">Start an Ethical Inquiry</h3>
      <div className="prompts-grid">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            className="prompt-card"
            onClick={() => onPromptClick(prompt.question)}
          >
            <span className="prompt-icon">{prompt.icon}</span>
            <span className="prompt-title">{prompt.title}</span>
            <span className="prompt-question">{prompt.question}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SamplePrompts;
