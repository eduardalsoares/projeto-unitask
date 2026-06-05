document.addEventListener('DOMContentLoaded', () => {
    // leitura das tarefas salvas no localStorage
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // contagem de cada categoria 

    const qtdTotal = tarefas.length;
    const qtdConcluidas = tarefas.filter(t => t.status === 'feito').length;
    const qtdPendentes = tarefas.filter(t => t.status === 'afazer').length;
    const qtdAndamento = tarefas.filter(t => t.status === 'andamento').length;

    const qtdAlta = tarefas.filter(t => t.prioridade === 'alta').length;
    const qtdMedia = tarefas.filter(t => t.prioridade === 'media').length;
    const qtdBaixa = tarefas.filter(t => t.prioridade === 'baixa').length;

    // usa o id dos elementos para adicionar aos cards

    document.getElementById('qtdTotal').textContent = qtdTotal;
    document.getElementById('qtdConcluidas').textContent = qtdConcluidas;
    document.getElementById('qtdPendentes').textContent = qtdPendentes;
    document.getElementById('qtdAndamento').textContent = qtdAndamento;

    // Converte para o formato do gráfico de pizza
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

    // Converte para o formato do gráfico de barras
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
});


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

