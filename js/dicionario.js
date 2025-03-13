function bloquearEntrada(event) {
    const tecla = event.key;
    const regex = /^[a-zA-ZáéíóúãõâêôçÁÉÍÓÚÃÕÂÊÔÇ]$/;

    const teclasPermitidas = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

    if (!regex.test(tecla) && !teclasPermitidas.includes(tecla)) {
        event.preventDefault();
    }
}
function carregarPalavras() {
    const palavras = JSON.parse(localStorage.getItem("palavras")) || [];
    const tabela = document.getElementById("word-list-body");

    tabela.innerHTML = "";

    palavras.forEach((palavra, index) => {
        const novaLinha = document.createElement("tr");
        const novaCelula = document.createElement("td");
        const novoDeletar = document.createElement("td");

        novaCelula.textContent = palavra;
        novoDeletar.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
        novoDeletar.className = "delete-icon";

        novoDeletar.onclick = function() {
            deletarPalavra(index);
        };

        novaLinha.appendChild(novaCelula);
        novaLinha.appendChild(novoDeletar);
        tabela.appendChild(novaLinha);
    });
}

function adicionarPalavra() {
    const inputElement = document.getElementById("word-input");
    const palavra = inputElement.value.trim().toLowerCase();
    const alerta = document.getElementById("alerta");

    if (palavra !== "") {
        let palavras = JSON.parse(localStorage.getItem("palavras")) || [];

        if (palavras.includes(palavra)) {
            alerta.textContent = "Esta palavra já foi adicionada!";
            return;
        }

        if (palavra.length > 10) {
            alerta.textContent = "A palavra não pode ter mais de 10 caracteres.";
        return;
        }

        if (palavra.length < 3) {
            alerta.textContent = "A palavra não pode ter menos de 3 caracteres.";
        return;
        }

        palavras.push(palavra);
        alerta.textContent = "ㅤ";
        localStorage.setItem("palavras", JSON.stringify(palavras));

        carregarPalavras();

        inputElement.value = "";
    } else {
        alerta.textContent = "Por favor, digite uma palavra.";
    }
}

function deletarPalavra(index) {
    const palavras = JSON.parse(localStorage.getItem("palavras")) || [];
    const alerta = document.getElementById("alerta");
    if(palavras.length > 1) {
        palavras.splice(index, 1);

        localStorage.setItem("palavras", JSON.stringify(palavras));

        carregarPalavras();
    } else {
        alerta.textContent = "É necessário mais de uma palavra para a exclusão.";
    }
}

window.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionarPalavra();
    }
});

window.onload = carregarPalavras;