import React, { useState, useEffect } from 'react';
import './QuickSortVisualizer.css';

export const QuickSortVisualizer = () => {
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

    const quickSort = (arr) => {
        const animationsArray = [];
        const copyArr = [...arr];

        function quick(arr, low, high) {
            if (low < high) {
                const pi = partition(arr, low, high, animationsArray);
                quick(arr, low, pi - 1);
                quick(arr, pi + 1, high);
                animationsArray.push(['sorted', low, high]);
            }
        }

        function partition(arr, low, high, animationsArray) {
            const pivot = arr[high];
            let i = low - 1;
            animationsArray.push(['pivot', high]);

            for (let j = low; j <= high - 1; j++) {
                animationsArray.push(['leftPointer', j]);
                animationsArray.push(['compare', j, high]);
                if (arr[j] < pivot) {
                    i++;
                    if (i !== j) {
                        animationsArray.push(['swap', i, j]);
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                    }
                }
                animationsArray.push(['removeLeftPointer', j]);
            }
            animationsArray.push(['swap', i + 1, high]);
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            return i + 1;
        }

        quick(copyArr, 0, copyArr.length - 1);
        return animationsArray;
    };


    const startQuickSort = () => {
        setSorting(true);
        const animations = quickSort(array);
        setAnimations(animations);
        runAnimations(animations);
    };


    const runAnimations = (animations) => {
        const arrayBars = document.getElementsByClassName('array-bar');

        animations.forEach((animation, index) => {
            const [action, barOneIdx, barTwoIdx] = animation;
            setTimeout(() => {
                if (action === 'pivot') {
                    arrayBars[barTwoIdx].style.backgroundColor = 'red';
                } else if (action === 'leftPointer') {
                    arrayBars[barOneIdx].style.backgroundColor = 'blue';
                } else if (action === 'compare') {
                    arrayBars[barOneIdx].style.backgroundColor = 'blue';
                    arrayBars[barTwoIdx].style.backgroundColor = 'red';
                } else if (action === 'swap') {
                    const barOneHeight = arrayBars[barOneIdx].style.height;
                    const barTwoHeight = arrayBars[barTwoIdx].style.height;
                    arrayBars[barOneIdx].style.height = barTwoHeight;
                    arrayBars[barTwoIdx].style.height = barOneHeight;
                    arrayBars[barOneIdx].style.backgroundColor = 'yellow';
                    arrayBars[barTwoIdx].style.backgroundColor = 'yellow';

                    setTimeout(() => {
                        arrayBars[barOneIdx].style.backgroundColor = 'gray';
                        arrayBars[barTwoIdx].style.backgroundColor = 'gray';
                    }, speed);
                } else if (action === 'removeLeftPointer') {
                    arrayBars[barOneIdx].style.backgroundColor = 'gray';
                } else if (action === 'sorted') {
                    setTimeout(() => {
                        for (let i = barOneIdx; i <= barTwoIdx; i++) {
                            arrayBars[i].style.transition = 'background-color 0.5s ease-in-out';
                            arrayBars[i].style.backgroundColor = 'green';
                        }
                    }, index * speed);
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
        <div className="quick-sort-visualizer">
            <h1>Quick Sort Visualizer</h1>
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
                <button onClick={startQuickSort} disabled={sorting}>
                    Visualize Quick Sort
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

