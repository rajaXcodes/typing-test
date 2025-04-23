"use client";

import React, { useEffect, useState } from "react";
import { getRandomParagraph } from "../(lib)/para";
import { Repeat } from "lucide-react";
import Confetti from "./confetti";

const TypingBox = () => {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setwpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [wordColors, setWordColors] = useState<string[]>([]);
  const [maxWpm, setMaxWpm] = useState(() => {
    const storedMax = localStorage.getItem("maxWpm");
    return storedMax ? parseInt(storedMax) : 0;
  });
  const [showNewMax, setShowNewMax] = useState(false);

  useEffect(() => {
    const newText = getRandomParagraph();
    setText(newText);
    const newWords = newText.split(" ");
    setWords(newWords);
    setWordColors(new Array(newWords.length).fill("text-gray-400"));
    setCurrentWordIndex(0);
    setUserInput("");
    setStartTime(null);
    setwpm(null);
    setAccuracy(null);
  }, []);

  const calculateResults = (endTime: number) => {
    if (!startTime) return;
    const durationInMinutes = (endTime - startTime) / 60000;
    const totalWordsTyped = currentWordIndex;

    // Count correct words
    const correctWords = wordColors.filter(
      (color) => color === "text-green-600"
    ).length;
    const acc = (correctWords / currentWordIndex) * 100 || 0;

    const calculatedWpm = Math.round(totalWordsTyped / durationInMinutes);
    setwpm(calculatedWpm);
    if (calculatedWpm > maxWpm) {
      setMaxWpm(calculatedWpm);
      localStorage.setItem("maxWpm", calculatedWpm.toString());
      setShowNewMax(true);
      setTimeout(() => setShowNewMax(false), 5000); 
    }
    setAccuracy(Math.round(acc));
  };

  const setColor = (typedWord: string) => {
    const newWordColors = [...wordColors];
    if (typedWord === words[currentWordIndex]) {
      newWordColors[currentWordIndex] = "text-white";
    } else {
      newWordColors[currentWordIndex] = "text-red-500";
    }
    setWordColors(newWordColors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());
    setUserInput(value);

    if (value.endsWith(" ")) {
      const typedWord = value.trim();
      setColor(typedWord);
      setUserInput("");
      setCurrentWordIndex(currentWordIndex + 1);

      if (currentWordIndex + 1 >= words.length) {
        const endTime = Date.now();
        calculateResults(endTime);
      }
    }
  };

  const handleClick = () => {
    const newText = getRandomParagraph();
    setText(newText);
    const newWords = newText.split(" ");
    setWords(newWords);
    setWordColors(new Array(newWords.length).fill("text-gray-400"));
    setCurrentWordIndex(0);
    setUserInput("");
    setStartTime(null);
    setwpm(null);
    setAccuracy(null);
  };

  const getWordColor = (wordIndex: number) => {
    if (wordIndex === currentWordIndex) {
      return "text-gray-600 font-bold bg-gray-100 rounded px-1 transition-all duration-300 ease-in-out"; // Currently typing this word
    }
    return wordColors[wordIndex] || "text-gray-400";
  };

  return (
    <div className="w-full max-h-1/2 ">
      <h2 className="text-lg mb-4">Type this: <span className="text-amber-400">{currentWordIndex}/50</span></h2>
      {showNewMax && (
        <div>
            <p className="text-white text-2xl">NEW MAX</p>
            <Confetti/>
        </div>
      )}
      <p className="bg-gray-500 p-4 rounded mb-6 text-left text-2xl">
        {words.map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            <span className={getWordColor(wordIndex)}>{word}</span>
            <span> </span>
          </React.Fragment>
        ))}
      </p>

      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="w-full border p-2 rounded outline-none"
        placeholder={startTime! > 0 ? "" : "Start Typing here..."}
        disabled={wpm !== null}
      />
      {wpm !== null && accuracy !== null && (
        <div className="mt-6 text-center">
          <p>
            WPM: <strong>{wpm}</strong>
          </p>
          <p>
            Accuracy: <strong>{accuracy}%</strong>
          </p>
          <p className="text-amber-500 text-lg">Max WPM : {maxWpm} </p>
          <button
            className="text-gray-400 mt-6 relative group inline-block hover:text-white transition duration-200 shadow-white cursor-pointer"
            onClick={handleClick}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Repeat
            </span>
            <Repeat size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TypingBox;
