const form = document.getElementById('form-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');

// Mapeamento visual dos status para bater com o formato do HTML
const statusTexto = {
    'afazer': 'A FAZER',
    'andamento': 'EM ANDAMENTO',
    'feito': 'FEITO'
};

// Elementos do Pop-up (Modal) de Edição
const modalEditar = document.getElementById('modal-editar');
const editarId = document.getElementById('editar-id');
const editarTitulo = document.getElementById('editar-titulo');
const editarDescricao = document.getElementById('editar-descricao');
const editarStatus = document.getElementById('editar-status');
const btnSalvarEdicao = document.getElementById('btn-salvar-edicao');
const btnFecharModal = document.getElementById('btn-fechar-modal');


// FUNÇÃO PARA CARREGAR DO LOCALSTORAGE E EXIBIR
function carregarTarefas() {
    listaTarefas.innerHTML = ''; // Limpa a lista para não duplicar

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.forEach(tarefa => {
        const novaTarefa = document.createElement('li');
        novaTarefa.classList.add('task-item'); // Mantém a classe CSS do projeto

        // Regra de cores de borda por prioridade
        if (tarefa.prioridade === 'alta') novaTarefa.style.borderLeftColor = '#ef4444';
        if (tarefa.prioridade === 'media') novaTarefa.style.borderLeftColor = '#f59e0b';
        if (tarefa.prioridade === 'baixa') novaTarefa.style.borderLeftColor = '#10b981';

        // HTML interno com o botão de lápis (✏️) para abrir a edição
        novaTarefa.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 4px; flex-grow: 1;">
                <strong style="color: #063A5D;">${tarefa.titulo}</strong>
                <small style="color: #4a7a8a;">${tarefa.descricao}</small>
                <span style="font-size: 0.8rem; color: #4a7a8a;">📅 Prazo: ${tarefa.prazo}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
                <span class="badge" style="padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; background: #A8DBDE; color: #063A5D;">
                    ${statusTexto[tarefa.status] || tarefa.status.toUpperCase()}
                </span>
                <button onclick="abrirPopUpEdicao(${tarefa.id})" style="background: none; border: none; cursor: pointer; font-size: 1.1rem; padding: 0;" title="Editar tarefa">✏️</button>
            </div>
        `;

        listaTarefas.appendChild(novaTarefa);
    });
}

// FORMULÁRIO DE CADASTRO (Criação de novas tarefas)

form.addEventListener('submit', function(evento) {
    evento.preventDefault(); 

    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const prazo = document.getElementById('prazo').value;
    const prioridade = document.getElementById('prioridade').value;
    const status = document.getElementById('status').value;
 
    const tarefa = {
        id: Date.now(),
        titulo,
        descricao,
        prazo,
        prioridade,
        status
    };

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    carregarTarefas();
    form.reset(); 
});


// LÓGICA DO POP-UP DE EDIÇÃO


// Abre o Pop-up e preenche com os dados armazenados
window.abrirPopUpEdicao = function(id) {
    id = Number(id); // Garante que o ID seja um número para comparação

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const tarefaEncontrada = tarefas.find(t => t.id === id);

    if (tarefaEncontrada) {
        editarId.value = tarefaEncontrada.id;
        editarTitulo.value = tarefaEncontrada.titulo;
        editarDescricao.value = tarefaEncontrada.descricao;
        editarStatus.value = tarefaEncontrada.status;

        modalEditar.style.display = 'flex'; // Exibe o modal centralizado
    }
}

// Salva as alterações feitas no Pop-up
btnSalvarEdicao.addEventListener('click', () => {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const idParaEditar = Number(editarId.value);

    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === idParaEditar) {
            tarefa.titulo = editarTitulo.value;
            tarefa.descricao = editarDescricao.value;
            tarefa.status = editarStatus.value;
        }
        return tarefa;
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    carregarTarefas();
    modalEditar.style.display = 'none'; // Esconde o modal
});

// Fecha o Pop-up ao clicar em Cancelar
btnFecharModal.addEventListener('click', () => {
    modalEditar.style.display = 'none';
});

// Inicializa a lista assim que a página abre
document.addEventListener('DOMContentLoaded', carregarTarefas);

// Navegação entre páginas

document.getElementById('btnHoje').addEventListener('click', () => {
    window.location.href = './home.html';
});

document.getElementById('btnCalendario').addEventListener('click', () => {
    window.location.href = './calendario.html';
});

document.getElementById('btnDashboard').addEventListener('click', () => {
    window.location.href = './dashboard.html';
});

document.getElementById('btnPerfil').addEventListener('click', () => {
    window.location.href = './perfil.html';
})

document.getElementById('btnSair').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado'); // apaga só a sessão
    window.location.href = './index.html';    // dadosCadastro continua salvo
});