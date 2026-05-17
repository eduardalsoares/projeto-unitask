const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    tabs.forEach(t => t.classList.remove('ativo')); // remove de todos
    this.classList.add('ativo');                     // adiciona só no clicado
  });
});

function mostrarAba(aba) {
  // troca o formulário visível
  document.getElementById('form-login').classList.toggle('escondido', aba !== 'entrar');
  document.getElementById('form-cadastro').classList.toggle('escondido', aba !== 'cadastrar');

  // troca a classe ativo nos botões
  const tabs = document.querySelectorAll('.tab');
  tabs[0].classList.toggle('ativo', aba === 'entrar');
  tabs[1].classList.toggle('ativo', aba === 'cadastrar');
}