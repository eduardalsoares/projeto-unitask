const form = document.getElementById('form-tarefa');// formulario de cadastro
const listaTarefas = document.getElementById('lista-tarefas');//onde as tarefas são exibidas, pegando o elemento do HTML para manipular depois

// Mapeamento visual dos status para bater com o formato do HTML
const statusTexto = {//exibir o status, const para mapear o status para o texto exibido
    'afazer': 'A FAZER',
    'andamento': 'EM ANDAMENTO',
    'feito': 'FEITO'
};

// Elementos do Pop-up (Modal) de Edição
const modalEditar = document.getElementById('modal-editar');//modal para edição das tarefas
const editarId = document.getElementById('editar-id');
const editarTitulo = document.getElementById('editar-titulo');
const editarDescricao = document.getElementById('editar-descricao');
const editarStatus = document.getElementById('editar-status');
const btnSalvarEdicao = document.getElementById('btn-salvar-edicao');
const btnFecharModal = document.getElementById('btn-fechar-modal');//botão para fechar o modal de edição


// FUNÇÃO PARA CARREGAR DO LOCALSTORAGE E EXIBIR
function carregarTarefas() {//função para carregar as tarefas do localStorage e exibir na tela
    listaTarefas.innerHTML = ''; // Limpa a lista para não duplicar

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];//lê as tarefas do localStorage, se não houver, inicia com um array vazio, Json.parse converte de volta para objeto JavaScript

    tarefas.forEach(tarefa => { //para cada tarefa, cria um elemento li para exibir na tela
        const novaTarefa = document.createElement('li');//cria um elemento li para cada tarefa
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

        listaTarefas.appendChild(novaTarefa);//adiciona a nova tarefa à lista exibida na tela
    });
}

// FORMULÁRIO DE CADASTRO (Criação de novas tarefas)

form.addEventListener('submit', function(evento) {//formulário de cadastro, ao submeter, executa a função para criar uma nova tarefa
    evento.preventDefault(); // Evita o comportamento padrão de recarregar a página, permitindo que a tarefa seja salva e exibida sem perder os dados já existentes

    const titulo = document.getElementById('titulo').value;//pega o valor do título da tarefa a partir do input do formulário
    const descricao = document.getElementById('descricao').value;
    const prazo = document.getElementById('prazo').value;
    const prioridade = document.getElementById('prioridade').value;
    const status = document.getElementById('status').value;
 
    const tarefa = {//cria um objeto tarefa com os dados do formulário
        id: Date.now(),//data atual e o now para gerar um Id unico
        titulo,
        descricao,
        prazo,
        prioridade,
        status
    };

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];//let para permitir reatribuição, lê as tarefas do localStorage, se não houver, inicia com um array vazio
    tarefas.push(tarefa);//push para adicionar a nova tarefa ao array de tarefas
    localStorage.setItem("tarefas", JSON.stringify(tarefas));//salva o array atualizado de tarefas no localStorage, Json.stringify converte o array para uma string para armazenamento

    carregarTarefas();//chama a função recarregar a lista de tarefas
    form.reset(); // Limpa o formulário após o cadastro
});


// LÓGICA DO POP-UP DE EDIÇÃO


// Abre o Pop-up e preenche com os dados armazenados
window.abrirPopUpEdicao = function(id) {//função para abrir o pop-up de edição, recebe o id da tarefa a ser editada
    id = Number(id); // Garante que o ID seja um número para comparação

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const tarefaEncontrada = tarefas.find(t => t.id === id);//procura a tarefa correspondente ao id

    if (tarefaEncontrada) {//se a tarefa for encontrada
        editarId.value = tarefaEncontrada.id;//preenche o campo id de edição
        editarTitulo.value = tarefaEncontrada.titulo;
        editarDescricao.value = tarefaEncontrada.descricao;
        editarStatus.value = tarefaEncontrada.status;

        modalEditar.style.display = 'flex'; // Exibe o modal centralizado
    }
}

// Salva as alterações feitas no Pop-up
btnSalvarEdicao.addEventListener('click', () => {//botao de salvar e addEventListener para salvar as alterações feitas no pop-up de edição
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];//lê as tarefas do localStorage, se não houver, inicia com um array vazio
    const idParaEditar = Number(editarId.value);//pega o id da tarefa a ser editada a partir do campo de edição

    tarefas = tarefas.map(tarefa => {//map para criar um novo array de tarefas, atualizando apenas a tarefa que foi editada
        if (tarefa.id === idParaEditar) {//se o id da tarefa for igual ao id para editar, atualiza os dados da tarefa com os valores do pop-up de edição
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