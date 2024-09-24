document.addEventListener('DOMContentLoaded', () => {
    const morseCodeMap = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
        'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
        'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
        '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
    };

    const MorseMapeo = Object.fromEntries(
        Object.entries(morseCodeMap).map(([key, value]) => [value, key])
    );

    const validateInputForMorse = (text) => {
        // Validar que el texto no contenga caracteres especiales para convertir a Morse
        const regex = /^[A-Za-z0-9\s]+$/; // Solo letras, números y espacios
        return regex.test(text);
    };

    const convertirMorse = (text) => {
        return text.toUpperCase().split('').map(char => {
            if (char === ' ') {
                return '';  // No agregar barras, simplemente deja un espacio entre palabras.
            }
            return morseCodeMap[char] || ''; // Convertir caracteres que no están en el mapa a vacío.
        }).join(' ').replace(/  +/g, '   '); // Reemplaza dobles espacios con triples para separar palabras.
    };

    const convertirTexto = (morse) => {
        return morse.split('   ').map(
            word => word.split(' ').map(
                code => MorseMapeo[code] || '' // Ignorar códigos que no están en el mapa
            ).join('')
        ).join(' ');
    };

    document.getElementById('morseBtn').addEventListener('click', () => {
        const inputText = document.getElementById('textInput').value;
        if (!validateInputForMorse(inputText)) {
            document.getElementById('output').innerText = 'Por favor, no ingrese caracteres especiales para convertir a Morse.';
            return; // Salir si hay caracteres especiales
        }
        const morse = convertirMorse(inputText);
        document.getElementById('output').innerText = morse;
    });

    document.getElementById('textoBtnMorse').addEventListener('click', () => {
        const inputText = document.getElementById('textInput').value;
        const text = convertirTexto(inputText);
        document.getElementById('output').innerText = text;
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        document.getElementById('textInput').value = '';
        document.getElementById('output').innerText = '';
    });
});
