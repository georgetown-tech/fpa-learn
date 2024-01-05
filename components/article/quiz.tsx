"use client";

import React, { useState } from "react";
import Confetti from "react-confetti"; // Assuming a confetti library is used
import { Check, X } from "lucide-react";

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  options: Option[];
}

interface QuizProps {
  questions: Question[];
}

const QuizComponent: React.FC<QuizProps> = ({ questions }) => {
  const [userAnswers, setUserAnswers] = useState<string[]>(
    new Array(questions.length).fill(""),
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState<boolean[]>(
    new Array(questions.length).fill(false),
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (selectedOption: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedAnswers);
    checkAnswer(currentQuestion, selectedOption);
  };

  const checkAnswer = (questionIndex: number, selectedOption: string) => {
    const isCorrect =
      questions[questionIndex].options[parseInt(selectedOption)].isCorrect;
    const updatedResults = [...results];
    updatedResults[questionIndex] = isCorrect;
    setResults(updatedResults);
    setShowConfetti(isCorrect);
  };

  return (
    <div className="relative w-full rounded-lg border bg-white p-4 shadow-lg">
      {showConfetti && <Confetti className="w-full h-full" recycle={false} />}
      {/* Show confetti for correct answers */}
      {questions.map((question, index) => (
        <div
          key={index}
          className={`${index !== currentQuestion ? "hidden" : "block"}`}
        >
          <div className="mb-4 flex flex-row items-center justify-between">
            <h2 className="text-2xl font-bold">{question.questionText}</h2>
            <div className="text-gray-600">
              {currentQuestion + 1} / {questions.length}
            </div>
          </div>
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question_${index}`}
                    value={optionIndex.toString()}
                    checked={userAnswers[index] === optionIndex.toString()}
                    onChange={() => handleAnswer(optionIndex.toString())}
                  />
                  <span>{option.text}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="space-between mt-8 flex flex-row">
        <div className="flex w-full flex-row items-center gap-1">
          {results.map((result, index) =>
            result ? (
              <div
                key={index}
                className="flex aspect-square items-center justify-center rounded-full bg-green-500 px-1 text-black"
              >
                <Check className="w-4" />
              </div>
            ) : (
              <div
                key={index}
                className="flex aspect-square items-center justify-center rounded-full bg-red-500 px-1 text-black"
              >
                <X className="m-0 w-4 p-0" />
              </div>
            ),
          )}
        </div>
        <div>
          <button
            className="ml-4 w-max rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            disabled={currentQuestion === questions.length - 1}
          >
            Check Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
