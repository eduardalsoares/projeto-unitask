document.addEventListener('DOMContentLoaded', function () {

    const calendarEl = document.getElementById('calendar');

    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    const eventos = tarefas.map(tarefa => {

    let cor = '#10b981'; // baixa

    if (tarefa.prioridade === 'media') {
        cor = '#f59e0b';
    }

    if (tarefa.prioridade === 'alta') {
        cor = '#ef4444';
    }

    return {
        title: tarefa.titulo,
        date: tarefa.prazo,
        backgroundColor: cor,
        borderColor: cor
    };
});

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        events: eventos
    });

    calendar.render();

});