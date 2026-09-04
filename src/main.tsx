import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { LanguageProvider } from './context/LanguageContext';
import { DemoProvider } from './context/DemoContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <DemoProvider>
          <App />
        </DemoProvider>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);
