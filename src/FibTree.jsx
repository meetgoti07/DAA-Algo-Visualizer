import React, { useState } from "react";


function fibTree(n) {
    const fib = (n) => {
        let result = n < 2 ? n : fib(n - 1).value + fib(n - 2).value;
        let tree = {value: result, index: n, children: []};
        if (n < 2) return tree;
        tree.children.push(fib(n - 1));
        tree.children.push(fib(n - 2));
        return tree;
    };
    return fib(n);
}

const TreeNode = ({ node, x, y, parentX, parentY, visible, stepDelay, level }) => {
    const nodeRadius = 30;
    const verticalGap = 100;


    const horizontalGap = 400 - level * 160;

    const calculateChildX = (index, totalChildren) => {

        const offset = (totalChildren - 1) * (horizontalGap / 2);
        return x - offset + index * horizontalGap;
    };

    return (
        <>
            {parentX !== null && parentY !== null && (
                <line
                    x1={parentX}
                    y1={parentY+30}
                    x2={x}
                    y2={y-30}
                    stroke="black"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    style={{
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.5s ease-in ${stepDelay}ms`,
                    }}
                />
            )}

            <circle
                cx={x}
                cy={y}
                r={nodeRadius}
                fill={visible ? "#61dafb" : "#fff"}
                stroke="black"
                strokeWidth="3"
                style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.5s ease-in ${stepDelay}ms`,
                }}
            />

            <text
                x={x}
                y={y - 10}
                fontSize="14"
                textAnchor="middle"
                fill="#000"
                style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.5s ease-in ${stepDelay}ms`,
                }}
            >
                {`N:${node.index}`}
            </text>

            <text
                x={x}
                y={y + 10}
                fontSize="14"
                textAnchor="middle"
                fill="#000"
                style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.5s ease-in ${stepDelay}ms`,
                }}
            >
                {`R:${node.value}`}
            </text>

            {node.children.length > 0 &&
                node.children.map((child, index) => (
                    <TreeNode
                        key={index}
                        node={child}
                        x={calculateChildX(index, node.children.length)}
                        y={y + verticalGap}
                        parentX={x}
                        parentY={y}
                        visible={visible}
                        stepDelay={stepDelay + (index + 1) * 300}
                        level={level + 1}
                    />
                ))}
        </>
    );
};

function FibTree() {
    const [fibNumber, setFibNumber] = useState(5);
    const [treeData, setTreeData] = useState(null);
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [visibleNodes, setVisibleNodes] = useState(0);
    const viewportWidth = window.innerWidth;


    const visualizeTree = async (node, delay = 1000) => {
        setVisibleNodes((prev) => prev + 1); // Show the next node
        await new Promise((resolve) => setTimeout(resolve, delay));
        for (let child of node.children) {
            await visualizeTree(child, delay);
        }
    };

    const handleVisualize = () => {
        setIsVisualizing(true);
        setVisibleNodes(0);
        const tree = fibTree(fibNumber);
        setTreeData(tree);
        setTimeout(() => visualizeTree(tree),500);
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 0 && value <= 20) setFibNumber(value);
    };

    return (
        <div className="">
            <h1>Fibonacci Recursion Tree Visualizer</h1>
            <div className="controls">
                <label htmlFor="fibNumber">Fibonacci Number (0-20):</label>
                <input
                    type="number"
                    id="fibNumber"
                    value={fibNumber}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    disabled={isVisualizing}
                />
                <button onClick={handleVisualize}>
                    Visualize
                </button>
            </div>

            <div className="container">
                <svg width={viewportWidth - 100} height="1000" viewBox="0 0 1200 1000">
                    <defs>
                        <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="5"
                            refY="3.5"
                            orient="auto"
                        >
                            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                        </marker>
                    </defs>
                    {treeData && (
                        <TreeNode
                            node={treeData}
                            x={(viewportWidth-100)/2}
                            y={50}
                            parentX={null}
                            parentY={null}
                            visible={visibleNodes > 0}
                            stepDelay={0}
                            level={0}
                        />
                    )}
                </svg>
            </div>
        </div>
    );
}

export default FibTree;
