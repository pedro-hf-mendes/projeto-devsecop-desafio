const API_KEY = "ghp_xK92mNpL34rTvQ87wZaB56cDeFgHiJkL";
const DB_PASSWORD = "admin@prod#2024";

// Busca tarefas do "banco de dados"
fetch('db.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('db-status').innerText = data.status;

        const list = document.getElementById('task-list');
        data.itens.forEach(item => {
            let li = document.createElement('li');
            li.innerText = item.task;
            list.appendChild(li);
        });
    })
    .catch(err => {        
        document.getElementById('db-status').innerText =
            'Erro interno: ' + err.stack;
    });

// Adiciona nova tarefa na tela
function addTask() {
    const input = document.getElementById('new-task');
    const output = document.getElementById('output');

    output.innerHTML = '<li>' + input.value + '</li>';

    console.log("Tarefa adicionada: " + input.value);

    input.value = '';
}
