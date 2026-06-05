// Navegação entre páginas

document.getElementById('btnHoje').addEventListener('click', () => {
    window.location.href = './home.html';
});

document.getElementById('btnTarefas').addEventListener('click', () => {
    window.location.href = './tarefas.html';
})

document.getElementById('btnNovaTarefa').addEventListener('click', () => {
    window.location.href = './tarefas.html';
})

document.getElementById('btnCalendario').addEventListener('click', () => {
    window.location.href = './calendario.html';
})

document.getElementById('btnSair').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado'); // apaga só a sessão
    window.location.href = './index.html';    // dadosCadastro continua salvo
});

// Gráfico de pizza — Tarefas por Status
const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
new Chart(ctxPizza, {
    type: 'doughnut',
    data: {
        labels: ['A Fazer', 'Em Andamento', 'Concluídas'],
        datasets: [{
            data: [qtdPendentes, qtdAndamento, qtdConcluidas], // suas variáveis
            backgroundColor: ['#A8DBDE', '#f59e0b', '#10b981'],
            borderWidth: 0
        }]
    }
});

// Gráfico de barras — Tarefas por Prioridade
const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
new Chart(ctxBarras, {
    type: 'bar',
    data: {
        labels: ['Alta', 'Média', 'Baixa'],
        datasets: [{
            data: [qtdAlta, qtdMedia, qtdBaixa], // suas variáveis
            backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
            borderRadius: 6,
            borderWidth: 0
        }]
    },
    options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
    }
});