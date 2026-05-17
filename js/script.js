// Formuário de login e cadastro

// Muda da aba "Entrar" para "Cadastrar" e vice-versa
const tabs = document.querySelectorAll('.tab');

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

formLogin.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o envio do formulário vazio

    const emailDigitado = document.getElementById('email').value;

    const dadosLogin = {
        email: emailDigitado,
    };

    localStorage.setItem('dadosLogin', JSON.stringify(dadosLogin)); // Armazena os dados de login no localStorage

    window.location.href = './home.html'; // Redireciona para a página home
});

formCadastro.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o envio do formulário vazio

    const nomeCadastrado = document.getElementById('nome-cadastro').value;
    const cursoCadastrado = document.getElementById('curso-cadastro').value;
    const emailCadastrado = document.getElementById('email-cadastro').value;
    
    const dadosCadastro = {
        nome: nomeCadastrado,
        curso: cursoCadastrado,
        email: emailCadastrado
    };

    localStorage.setItem('dadosCadastro', JSON.stringify(dadosCadastro)); // Armazena os dados de cadastro no localStorage

    window.location.href = './home.html'; // Redireciona para a página home
});