import React from "react";
import {Link} from "react-router-dom";
import "./App.css";

export const Home = () => {
    return (
        <div className="container">
            <h1>Visualizers</h1>
            <div className="card-container">
                <div className="card">
                    <Link to="/fibonacci-tree" className="card-link">
                        <h2>Fibonacci Tree Visualizer</h2>
                        <p>Visualize the Fibonacci sequence as a tree.</p>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/quick-sort" className="card-link">
                        <h2>Quick Sort Visualizer</h2>
                        <p>Visualize the Quick Sort algorithm.</p>
                    </Link>
                </div>
            </div>

        </div>

    );
}


