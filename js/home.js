// Função para retornar o nome do usuário logado

const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

document.getElementById('nomeUsuario').textContent = usuario.nome;
document.getElementById('homeData').textContent = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
});

document.getElementById('btnSair').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado'); // apaga só a sessão
    window.location.href = './index.html';    // dadosCadastro continua salvo
});

// Navegação entre páginas

document.getElementById('btnTarefas').addEventListener('click', () => {
    window.location.href = './tarefas.html';
})

document.getElementById('btnNovaTarefa').addEventListener('click', () => {
    window.location.href = './tarefas.html';
})

document.getElementById('btnCalendario').addEventListener('click', () => {
    window.location.href = './calendario.html';
})

document.getElementById('btnDashboard').addEventListener('click', () => {
    window.location.href = './dashboard.html';
})

// Lê as tarefas salvas no localStorage
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Filtra só as tarefas de hoje
const hoje = new Date().toISOString().split('T')[0]; // formato: "2025-06-05"
const tarefasHoje = tarefas.filter(t => t.prazo === hoje);

// Contagens para os cards
document.getElementById('qtdTarefas').textContent = tarefasHoje.length;
document.getElementById('qtdConcluidas').textContent = tarefasHoje.filter(t => t.status === 'feito').length;
document.getElementById('qtdPendentes').textContent = tarefasHoje.filter(t => t.status === 'afazer').length;