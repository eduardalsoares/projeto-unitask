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