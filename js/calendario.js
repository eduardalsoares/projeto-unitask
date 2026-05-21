document.addEventListener('DOMContentLoaded', function () {

    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'dayGridMonth',

        locale: 'pt-br',

        events: [
            {
                title: 'Prova de Cálculo',
                date: '2026-05-20'
            },

            {
                title: 'Entrega Front-End',
                date: '2026-05-25'
            },

            {
                title: 'Seminário',
                date: '2026-05-28'
            }
        ]
    });

    calendar.render();
});