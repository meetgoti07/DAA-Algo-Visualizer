import React, { useState, useEffect } from 'react';
import './QuickSortVisualizer.css';

export const BubbleSort = () => {
    const [array, setArray] = useState([]);
    const [sorting, setSorting] = useState(false);
    const [numElements, setNumElements] = useState(10);
    const [animations, setAnimations] = useState([]);
    const [speed, setSpeed] = useState(200); // Default speed (in ms)

    const generateArray = (size) => {
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 500) + 10);
        setArray(arr);
        setAnimations([]);
    };

    const bubbleSort = (arr) => {
        const animationsArray = [];
        const copyArr = [...arr];
        let n = copyArr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                animationsArray.push(['compare', j, j + 1]);
                if (copyArr[j] > copyArr[j + 1]) {
                    animationsArray.push(['swap', j, j + 1]);
                    [copyArr[j], copyArr[j + 1]] = [copyArr[j + 1], copyArr[j]];
                }
                animationsArray.push(['removeCompare', j, j + 1]);
            }
            animationsArray.push(['sorted', n - i - 1]);
        }
        animationsArray.push(['sorted', 0]); // Ensure the last element is sorted
        return animationsArray;
    };

    const startBubbleSort = () => {
        setSorting(true);
        const animations = bubbleSort(array);
        setAnimations(animations);
        runAnimations(animations);
    };

    const runAnimations = (animations) => {
        const arrayBars = document.getElementsByClassName('array-bar');

        animations.forEach((animation, index) => {
            const [action, barOneIdx, barTwoIdx] = animation;
            setTimeout(() => {
                if (action === 'compare') {
                    arrayBars[barOneIdx].style.backgroundColor = 'blue';
                    arrayBars[barTwoIdx].style.backgroundColor = 'blue';
                } else if (action === 'swap') {
                    const barOneHeight = arrayBars[barOneIdx].style.height;
                    const barTwoHeight = arrayBars[barTwoIdx].style.height;
                    arrayBars[barOneIdx].style.height = barTwoHeight;
                    arrayBars[barTwoIdx].style.height = barOneHeight;
                    arrayBars[barOneIdx].style.backgroundColor = 'yellow';
                    arrayBars[barTwoIdx].style.backgroundColor = 'yellow';
                } else if (action === 'removeCompare') {
                    arrayBars[barOneIdx].style.backgroundColor = 'gray';
                    arrayBars[barTwoIdx].style.backgroundColor = 'gray';
                } else if (action === 'sorted') {
                    arrayBars[barOneIdx].style.backgroundColor = 'green';
                }
            }, index * speed);
        });

        setTimeout(() => {
            setSorting(false);
        }, animations.length * speed);
    };

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value >= 5 && value <= 100) {
            setNumElements(value);
        }
    };

    useEffect(() => {
        generateArray(numElements);
    }, []);

    return (
        <div className="bubble-sort-visualizer">
            <h1>Bubble Sort Visualizer</h1>
            <div>
                <label>Number of elements: </label>
                <input
                    type="number"
                    value={numElements}
                    min="5"
                    max="100"
                    onChange={handleInputChange}
                    disabled={sorting}
                />
                <button onClick={() => generateArray(numElements)} disabled={sorting}>
                    Generate New Array
                </button>
                <button onClick={startBubbleSort} disabled={sorting}>
                    Visualize Bubble Sort
                </button>
            </div>

            <div>
                <label>Animation Speed (ms): {speed} ms</label>
                <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    disabled={sorting}
                />
            </div>

            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            height: `${value}px`,
                            backgroundColor: 'gray',
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};
