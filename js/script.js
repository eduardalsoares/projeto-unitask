// Formuário de login e cadastro

// Muda da aba "Entrar" para "Cadastrar" e vice-versa
const tabs = document.querySelectorAll('.tab');

// 1. Troca a classe visual das abas ao clicar
tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    tabs.forEach(t => t.classList.remove('ativo')); // remove de todos
    this.classList.add('ativo');                     // adiciona só no clicado
  });
});

// Muda o conteúdo dos formularios de acordo com a aba selecionada

function mostrarAba(aba) {
  // troca o formulário visível
  document.getElementById('form-login').classList.toggle('escondido', aba !== 'entrar');
  document.getElementById('form-cadastro').classList.toggle('escondido', aba !== 'cadastrar');

  // troca a classe ativo nos botões
  const tabs = document.querySelectorAll('.tab');
  tabs[0].classList.toggle('ativo', aba === 'entrar');
  tabs[1].classList.toggle('ativo', aba === 'cadastrar');
};

// Redirecionar para a página home após o login ou cadastro

const formLogin = document.getElementById('form-login');
const formCadastro = document.getElementById('form-cadastro');

// No login 
// 3. Ao submeter o login → salva email e redireciona
formLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    const usuario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value
    };

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    window.location.href = './home.html';
});

// No cadastro
// 4. Ao submeter o cadastro → salva nome/curso/email e redireciona
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    const usuario = {
        nome: document.getElementById('nome-cadastro').value,
        curso: document.getElementById('curso-cadastro').value,
        email: document.getElementById('email-cadastro').value
    };

    localStorage.setItem('dadosCadastro', JSON.stringify(usuario)); // Salva os dados para reutilização
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario)); // Salva os dados para exibição na tela inicial
    window.location.href = './home.html';
});