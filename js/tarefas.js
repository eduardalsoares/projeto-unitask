// 1. Pegar os elementos do HTML que vamos precisar mexer
const form = document.getElementById('form-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');

// 2. Ouvir quando o usuário clicar no botão de enviar (Submit)
form.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Impede a página de recarregar e sumir com os dados

    // 3. Capturar os valores que o usuário digitou nos inputs
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const prazo = document.getElementById('prazo').value;
    const prioridade = document.getElementById('prioridade').value;
    const status = document.getElementById('status').value;
 
    // 4. Salvar as tarefas no navegador
    const tarefa = {
        titulo,
        descricao,
        prazo,
        prioridade,
        status
    };

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.push(tarefa);

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    // 4. Criar o elemento de lista (LI) que vai entrar na tela
    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add('task-item'); // Adiciona a classe do CSS

    // Cor da bordinha lateral baseado na prioridade (estilo ClickUp!)
    if (prioridade === 'alta') novaTarefa.style.borderLeftColor = '#ef4444'; // Vermelho
    if (prioridade === 'media') novaTarefa.style.borderLeftColor = '#f59e0b'; // Amarelo
    if (prioridade === 'baixa') novaTarefa.style.borderLeftColor = '#10b981'; // Verde

    // 5. Montar o HTML interno da nossa tarefa
    novaTarefa.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 4px;">
            <strong style="color: #063A5D;">${titulo}</strong>
            <small style="color: #4a7a8a;">${descricao}</small>
            <span style="font-size: 0.8rem; color: #4a7a8a;">📅 Prazo: ${prazo}</span>
        </div>
        <span class="badge" style="padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; background: #A8DBDE; color: #063A5D;">
            ${status.toUpperCase()}
        </span>
    `;

    // 6. Colocar a nova tarefa dentro da nossa lista (UL)
    listaTarefas.appendChild(novaTarefa);

    // 7. Limpar o formulário para o usuário poder digitar a próxima
    form.reset();
});

document.getElementById('btnHoje').addEventListener('click', () => {
    window.location.href = './home.html';
});

document.getElementById('btnCalendario').addEventListener('click', () => {
    window.location.href = './calendario.html';
})