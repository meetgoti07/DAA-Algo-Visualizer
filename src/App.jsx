// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FibTree from "./FibTree.jsx";
import {QuickSortVisualizer} from "./QuickSort.jsx";
import {Home} from "./Home.jsx";

function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/fibonacci-tree" element={<FibTree />} />
                    <Route path="/quick-sort" element={<QuickSortVisualizer />} />
                </Routes>
        </Router>
    );
}

export default App;
