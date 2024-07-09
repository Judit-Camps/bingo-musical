// src/BingoCard.tsx
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import songs from './songs.json';
import './App.css';

function shuffleArray(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
};

function generateBingoCard(): string[] {
    const shuffledSongs = shuffleArray([...songs]);
    return shuffledSongs.slice(0, 25);
};

const BingoCard: React.FC = () => {
    const [numCards, setNumCards] = useState<number>(1);
    const [bingoCards, setBingoCards] = useState<string[][]>([]);

    const handleGenerateCards = () => {
        const newBingoCards = [];
        for (let i = 0; i < numCards; i++) {
            newBingoCards.push(generateBingoCard());
        }
        setBingoCards(newBingoCards);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        bingoCards.forEach((card, index) => {
            if (index !== 0) {
                doc.addPage();
            }
            doc.text(`Bingo Card ${index + 1}`, 10, 10);
            card.forEach((song, i) => {
                const x = 10 + (i % 5) * 40;
                const y = 20 + Math.floor(i / 5) * 20;
                doc.text(song, x, y);
            });
        });
        doc.save('bingo_cards.pdf');
    };

    return (
        <div className="bingo-container">
            <div className="input-container">
                <label htmlFor="numCards">Number of Bingo Cards:</label>
                <input
                    type="number"
                    id="numCards"
                    value={numCards}
                    onChange={(e) => setNumCards(parseInt(e.target.value))}
                    min="1"
                />
                <button onClick={handleGenerateCards}>Generate Cards</button>
            </div>
            <div className="bingo-cards">
                {bingoCards.map((card, cardIndex) => (
                    <div key={cardIndex} className="bingo-card">
                        {card.map((song, index) => (
                            <div key={index} className="bingo-cell">
                                {song}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {bingoCards.length > 0 && (
                <button onClick={handleDownloadPDF}>Download PDF</button>
            )}
        </div>
    );
};

export default BingoCard;
