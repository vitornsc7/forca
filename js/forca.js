let heartCount = 5;

function createHearts() {
    const elements = document.getElementById("hearts");
    elements.innerHTML = '';

    for (let i = 0; i <= heartCount; i++) {
        const heart = document.createElement('span');
        heart.classList.add('material-symbols-outlined');
        heart.id = 'heart';
        heart.textContent = 'favorite';
        elements.appendChild(heart);
    }
}

function tremerTodasLetras() {
    const divs = document.querySelectorAll('#word .letter');
    console.log(heartCount)
    divs.forEach(div => {
        div.classList.add('tremer');
        
        setTimeout(() => {
            div.classList.remove('tremer');
        }, 200);
    });
}

const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function acertoLetra(char) {
    verificarVitoria();
    const normalizedChar = normalizeString(char.toLowerCase());

    const letras = document.querySelectorAll(`[data-letter]`);
    letras.forEach(div => {
        const dataLetter = normalizeString(div.getAttribute('data-letter').toLowerCase());

        if (dataLetter === normalizedChar) {
            div.classList.add('acertar');
            setTimeout(() => {
                div.classList.remove('acertar');
            }, 200);
        }
    });
}

const keyboardLayout = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM"
];
const keyboardContainer = document.getElementById("keyboard");

function getRandomWordArray() {
    const palavras = JSON.parse(localStorage.getItem("palavras"));
    
    if (!palavras || palavras.length === 0) {
        console.log("Não há palavras no localStorage.");
        window.location.href = "menu.html";
        return;
    }

    const randomWord = palavras[Math.floor(Math.random() * palavras.length)];
    return randomWord.split('');
}

const palavra = getRandomWordArray();
console.log("Palavra aleatória convertida em array:", palavra);

keyboardLayout.forEach(row => {
    const rowDiv = document.createElement("div");
    
    row.split("").forEach(char => {
        const keyDiv = document.createElement("div");
        keyDiv.classList.add("char");
        keyDiv.id = char.toLowerCase();
        keyDiv.innerHTML = `<p>${char}</p>`;
        keyDiv.setAttribute("onclick", `handleKeyClick('${char}')`);
        rowDiv.appendChild(keyDiv); 
    });

    keyboardContainer.appendChild(rowDiv);
    createHearts();
});

function addLetters() {
    const wordDiv = document.getElementById("word");
    
    for (let i = 0; i < palavra.length; i++) {
        const letterDiv = document.createElement("div");
        letterDiv.classList.add("letter");
        letterDiv.setAttribute("data-letter", palavra[i].toLowerCase());
        wordDiv.appendChild(letterDiv);
    }
}

addLetters();

function handleKeyClick(char) {
    const clickedKey = document.getElementById(char.toLowerCase());
    let found = false
    if (!clickedKey.classList.contains('clicked')) {
        console.log(`${char} foi clicado!`);

        const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedChar = normalizeString(char.toLowerCase());
        const elements = document.querySelectorAll(`[data-letter]`);

        elements.forEach(element => {
            const dataLetter = normalizeString(element.getAttribute('data-letter').toLowerCase());

            if (dataLetter === normalizedChar) {
                const p = document.createElement('p');
                p.textContent = element.getAttribute('data-letter');
                element.appendChild(p);
                found = true;
                acertoLetra(char);
            }
        });

        if (!found) {
            tremerTodasLetras(); 
            heartCount--;
            if(heartCount == -1) {
                document.getElementById('palavra-final').textContent = palavra.join('').replace(/,/g, '');
                exibirGameOver();
            }
            createHearts();
        }
    }
    clickedKey.classList.add('clicked');
}

function isValidLetter(tecla) {
    const letrasValidas = /^[A-Za-záàâãäéèêíïóôõöúüçÁÀÂÃÉÈÊÍÓÔÕÚÜÇ]$/;
    return letrasValidas.test(tecla);
}
  
document.addEventListener('keydown', function(event) {
    const gameOverOverlay = document.getElementById("game-over-overlay");
    const victoryOverlay = document.getElementById("victory-overlay");

    const gameOverVisivel = window.getComputedStyle(gameOverOverlay).display !== "none";
    const victoryVisivel = window.getComputedStyle(victoryOverlay).display !== "none";

    if (!gameOverVisivel && !victoryVisivel) {
        const tecla = event.key;
        if (isValidLetter(tecla)) {
            handleKeyClick(tecla);
        }
    }
});

function verificarVitoria() {
    const letras = document.querySelectorAll("#word .letter");
    let todasAsLetrasAparecem = true;

    letras.forEach(letra => {
        if (letra.childElementCount === 0) {
            todasAsLetrasAparecem = false;
        }
    });

    if (todasAsLetrasAparecem) {
        exibirVitoria();
    }
}

window.addEventListener('keydown', function(event) {
    const gameOverOverlay = document.getElementById("game-over-overlay");
    const victoryOverlay = document.getElementById("victory-overlay");

    if ((gameOverOverlay.style.display === "flex" || victoryOverlay.style.display === "flex") && event.key === "Enter") {
        reiniciar();
    }
});

function exibirVitoria() {
    document.getElementById('palavra-vitoria').textContent = palavra.join('').replace(/,/g, '');
    const overlay = document.getElementById('victory-overlay');
    overlay.style.display = 'flex';
}

document.getElementsByClassName("button-char")[0].onclick = function() {
    window.location.href = "forca.html";
};

function exibirGameOver() {
    const overlay = document.getElementById('game-over-overlay');
    overlay.style.display = 'flex';
}

function reiniciar() {
    window.location.href = "forca.html";
}