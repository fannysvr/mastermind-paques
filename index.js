import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const COLORS = ["🟡", "🔵", "🔴", "🟢", "🟣", "⚫"];
const SECRET_COMBINATION = Array.from({ length: 4 }, () => COLORS[Math.floor(Math.random() * COLORS.length)]);

const MastermindPaques = () => {
  const [attempts, setAttempts] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");

  const checkCombination = () => {
    let correctPosition = 0;
    let correctColor = 0;

    currentAttempt.forEach((color, index) => {
      if (color === SECRET_COMBINATION[index]) {
        correctPosition++;
      } else if (SECRET_COMBINATION.includes(color)) {
        correctColor++;
      }
    });

    setAttempts([...attempts, { attempt: currentAttempt, correctPosition, correctColor }]);
    setCurrentAttempt(["", "", "", ""]);
    if (correctPosition === 4) {
      setMessage("Bravo ! Vous avez trouvé la combinaison ! 🎉");
    } else {
      setMessage(`🎯 ${correctPosition} bien placés, 🎨 ${correctColor} mal placés`);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-xl font-bold">🐣 Mastermind de Pâques 🐣</h1>
      <p>Devinez la combinaison secrète d'œufs en 4 couleurs !</p>
      <div className="flex space-x-2 my-4">
        {currentAttempt.map((color, index) => (
          <select
            key={index}
            value={color}
            onChange={(e) => {
              const newAttempt = [...currentAttempt];
              newAttempt[index] = e.target.value;
              setCurrentAttempt(newAttempt);
            }}
            className="border p-2"
          >
            <option value="">🎨</option>
            {COLORS.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        ))}
      </div>
      <Button onClick={checkCombination} className="mt-2">Valider</Button>
      {message && <p className="mt-4 font-bold">{message}</p>}
      <Card className="mt-6 w-full max-w-md">
        <CardContent>
          <h2 className="text-lg font-bold">Historique des tentatives :</h2>
          {attempts.map((att, i) => (
            <div key={i} className="flex justify-between border-b p-2">
              <span>{att.attempt.join(" ")}</span>
              <span>🎯 {att.correctPosition} | 🎨 {att.correctColor}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MastermindPaques;
