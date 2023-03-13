import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BookClub } from './components/BookClub';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <BookClub />
    </BrowserRouter>
)


