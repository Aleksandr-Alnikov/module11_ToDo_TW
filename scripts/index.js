import {addTask, createTask, deleteTask, editTask} from "./render.js";


(() => {
    const data = JSON.parse(localStorage.getItem('task') || '[]');
    const taskList = document.querySelector('.task__List');
    const form = document.querySelector('.form');
    const text = document.querySelector('.text');


    text.textContent = `Задач в списке: ${data.length}`;


    data.forEach(task => {
        taskList.append(createTask(task));
    });


    const observer = new MutationObserver(() => {
        const count = data.length;

            text.textContent = `
                ${count > 0 ? `Задач в списке: ${count}` : 'Список задач пуст'}
            `;


        deleteTask(data);
        editTask(form, data);
    });

    const config = {
        childList: true,
    };
    observer.observe(taskList, config);


    addTask(form, data, taskList);
    deleteTask(data);
    editTask(form, data);
})();