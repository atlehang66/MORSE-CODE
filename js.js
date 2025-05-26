const morseMap = {
        'A': '.-',    'B': '-...',  'C': '-.-.', 'D': '-..',  'E': '.',    'F': '..-.',
        'G': '--.',   'H': '....',  'I': '..',   'J': '.---', 'K': '-.-',  'L': '.-..',
        'M': '--',    'N': '-.',    'O': '---',  'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...',   'T': '-',     'U': '..-',  'V': '...-', 'W': '.--',  'X': '-..-',
        'Y': '-.--',  'Z': '--..',
        '0': '-----', '1': '.----', '2': '..---','3': '...--','4': '....-','5': '.....',
        '6': '-....', '7': '--...', '8': '---..','9': '----.',
        '.': '.-.-.-',',': '--..--','?': '..--..','/': '-..-.','@': '.--.-.',' ': '/'
    };
    const textMap = Object.fromEntries(Object.entries(morseMap).map(([k,v])=>[v,k]));

    function isMorse(input) {
        return /^[.\-/\s]+$/.test(input.trim());
    }

    function textToMorse(text) {
        return text.toUpperCase().split('').map(ch => morseMap[ch] || '').join(' ');
    }

    function morseToText(morse) {
        return morse.trim().split(' ').map(code => textMap[code] || '').join('');
    }

    document.getElementById('morseInput').addEventListener('input', function() {
        const val = this.value.trim();
        let output = '';
        if (!val) {
            output = '';
        } else if (isMorse(val)) {
            output = morseToText(val);
        } else {
            output = textToMorse(val);
        }
        document.getElementById('result').textContent = output;
    });

    // MATRIX BACKGROUND EFFECT
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Binary characters
const binary = "01";
const fontSize = 16;
const columns = canvas.width / fontSize;

// Create drops for each column
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    // Black background with slight opacity for trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Green text
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    // Draw characters
    for (let i = 0; i < drops.length; i++) {
        const text = binary[Math.floor(Math.random() * binary.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Optional: Adjust canvas on resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
