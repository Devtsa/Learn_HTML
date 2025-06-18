// controls.js
import {
    handleNumber,
    handleOperator,
    clearDisplay,
    backspace,
    handleEquals
} from './app.js';

// Ajouter ceci pour s'assurer que le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            
            if (value === 'C') clearDisplay();
            else if (value === '←') backspace();
            else if (value === '=') handleEquals();
            else if ('+-*/'.includes(value)) handleOperator(value);
            else handleNumber(value);
        });
    });
});