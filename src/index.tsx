import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/_components/App';
import './index.scss';

createRoot(document.getElementById('root')).render(<App />);

module.hot.accept();
