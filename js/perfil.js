// Elementos do DOM
const fotoPerfil = document.getElementById("fotoPerfil");
const inputFoto = document.getElementById("inputFoto");
const btnTrocarFoto = document.getElementById("btnTrocarFoto");
const formPerfil = document.getElementById("formPerfil");
const btnEnviar = document.getElementById("btnEnviar");

// Evento para trocar foto
btnTrocarFoto.addEventListener("click", () => {
    inputFoto.click();
});

// Evento para processar a foto selecionada
inputFoto.addEventListener("change", function() {
    const arquivo = this.files[0];

    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = function(event) {
        const fotoData = event.target.result;
        fotoPerfil.src = fotoData;

        // Salva a foto no localStorage
        localStorage.setItem("fotoPerfil", fotoData);
    };

    leitor.readAsDataURL(arquivo);
});

// Carregar dados ao entrar na página
window.addEventListener("DOMContentLoaded", () => {
    // Carrega a foto salva
    const fotoSalva = localStorage.getItem("fotoPerfil");
    if (fotoSalva) {
        fotoPerfil.src = fotoSalva;
    }

    // Carrega os dados do perfil
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {
        document.getElementById("nome").value = usuarioLogado.nome || "";
        document.getElementById("email").value = usuarioLogado.email || "";
        document.getElementById("curso").value = usuarioLogado.curso || "";
        document.getElementById("instituicao").value = usuarioLogado.instituicao || "";
        document.getElementById("telefone").value = usuarioLogado.telefone || "";
    }
});

// Salvar alterações do perfil
formPerfil.addEventListener("submit", (e) => {
    e.preventDefault();

    // Pega os dados atualizados
    const perfilAtualizado = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        curso: document.getElementById("curso").value,
        instituicao: document.getElementById("instituicao").value,
        telefone: document.getElementById("telefone").value
    };

    // Atualiza simultaneamente o usuarioLogado (que é exibido na home)
    // e mantém os dados iniciais do cadastro
    localStorage.setItem("usuarioLogado", JSON.stringify(perfilAtualizado));
    localStorage.setItem("dadosCadastro", JSON.stringify(perfilAtualizado));

    alert("Perfil atualizado com sucesso!");
});

// Enviar mensagem
btnEnviar.addEventListener("click", () => {
    const mensagem = document.getElementById("mensagem").value;

    if (mensagem.trim() === "") {
        alert("Por favor, digite uma mensagem!");
        return;
    }

    alert("Mensagem enviada com sucesso! Obrigado pelo contato.");
    document.getElementById("mensagem").value = "";
});

// Navegação entre páginas

document.getElementById('btnHoje').addEventListener('click', () => {
    window.location.href = './home.html';
});

document.getElementById('btnTarefas').addEventListener('click', () => {
    window.location.href = './tarefas.html';
});

document.getElementById('btnCalendario').addEventListener('click', () => {
    window.location.href = './calendario.html';
});

document.getElementById('btnDashboard').addEventListener('click', () => {
    window.location.href = './dashboard.html';
});

document.getElementById('btnPerfil').addEventListener('click', () => {
    window.location.href = './perfil.html';
});

document.getElementById('btnSair').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado'); // Remove apenas a sessão
    window.location.href = '../index.html'; // Redireciona para login
});