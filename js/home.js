document.addEventListener('DOMContentLoaded', () => {
    // leitura das tarefas salvas no localStorage
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // contagem de cada categoria 

    const qtdTotal = tarefas.length;
    const qtdConcluidas = tarefas.filter(t => t.status === 'feito').length;
    const qtdPendentes = tarefas.filter(t => t.status === 'afazer').length;
    const qtdAndamento = tarefas.filter(t => t.status === 'andamento').length;

    // usa o id dos elementos para adicionar aos cards

    document.getElementById('qtdTotal').textContent = qtdTotal;
    document.getElementById('qtdConcluidas').textContent = qtdConcluidas;
    document.getElementById('qtdPendentes').textContent = qtdPendentes;
    document.getElementById('qtdAndamento').textContent = qtdAndamento;

});

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
});

document.getElementById('btnNovaTarefa').addEventListener('click', () => {
    window.location.href = './tarefas.html';
});

document.getElementById('btnCalendario').addEventListener('click', () => {
    window.location.href = './calendario.html';
});

document.getElementById('btnDashboard').addEventListener('click', () => {
    window.location.href = './dashboard.html';
});
