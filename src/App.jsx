// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FibTree from "./FibTree.jsx";
import {QuickSortVisualizer} from "./QuickSort.jsx";
import {Home} from "./Home.jsx";
import {BubbleSort} from "./BubbleSort.jsx";
import FactorialTree from "./FactorialTree.jsx";

function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/fibonacci-tree" element={<FibTree />} />
                    <Route path="/quick-sort" element={<QuickSortVisualizer />} />
                    <Route path="/bubble-sort" element={<BubbleSort />} />
                    <Route path="/factorial-tree" element={<FactorialTree />} />
                </Routes>
        </Router>
    );
}

export default App;
