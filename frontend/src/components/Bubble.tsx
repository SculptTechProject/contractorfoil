import React, { useState } from 'react';
import '../CSS/Bubble.css';

// Definicja typów dla prop-ów komponentu Bubble
interface BubbleProps {
    x: string; // Pozycja `x` jako string
    y: string; // Pozycja `y` jako string
    color: string; // Kolor bąbelka
    size: string; // Rozmiar bąbelka
    onPop: () => void; // Funkcja wywoływana po kliknięciu bąbelka
}

const Bubble: React.FC<BubbleProps> = ({ x, y, color, size, onPop }) => {
    const [isPopped, setIsPopped] = useState(false);

    const handlePop = () => {
        setIsPopped(true);
        setTimeout(onPop, 300); // Usuń bąbelek po zakończeniu animacji
    };

    return (
        <div
            className={`bubble ${isPopped ? 'bubble-pop' : ''}`}
            style={{
                left: x,
                top: y,
                backgroundColor: color,
                width: size,
                height: size,
            }}
            onClick={handlePop}
        ></div>
    );
};

export default Bubble;
