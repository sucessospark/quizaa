import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Mudamos de 'root' para um ID único para não conflitar com temas WP
const rootId = 'app-auxilio-acidente';
const rootElement = document.getElementById(rootId);

if (!rootElement) {
  console.error(`Elemento com id '${rootId}' não encontrado. Verifique se o shortcode foi inserido.`);
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}