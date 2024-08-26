export const createTask = ({task, id}) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('mb-8','flex', 'p-4', 'border-teal-500', 'border-solid', 'border-b', 'list__item');
    taskItem.id = id;


    taskItem.innerHTML = `
         <p class="task__text">${task}</p>
         <div class="ml-auto flex gap-8">
             <button data-type="edit" class="edit__btn btn">
                 <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="mdi-circle-edit-outline" width="32" height="32"
                     viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12H20A8,8 0 0,1
                     12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4V2M18.78,3C18.61,3 18.43,3.07 18.3,3.2L17.08,4.41L19.58,6.91L20.8,5.7C21.06,5.44 21.06,5
                     20.8,4.75L19.25,3.2C19.12,3.07 18.95,3 18.78,3M16.37,5.12L9,12.5V15H11.5L18.87,7.62L16.37,5.12Z" />
                     </svg>
             </button>
             <button data-type="delete" class="delete__btn btn">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                   width="32px" height="32px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">
                   <path d="M26,42h12V26H26V42z M33,28h2v12h-2V28z M29,28h2v12h-2V28z M32,0C14.327,0,0,14.327,0,32s14.327,32,32,32
                   c17.674,0,32-14.327,32-32S49.674,0,32,0z M42,26h-2v16c0,1.104-0.896,2-2,2H26c-1.104,0-2-0.896-2-2V26h-2v-2h5v-2
                   c0-1.104,0.896-2,2-2h6c1.104,0,2,0.896,2,2v2h5V26z M35,22h-6v2h6V22z"/>
                </svg>
             </button>
         </div>
    `;
    return taskItem;
};


export const addTask = (form, data, taskList) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const newTask = Object.fromEntries(formData);
        newTask.id = Date.now();

        data.push(newTask)
        localStorage.setItem('task', JSON.stringify(data));

        taskList.append(createTask(newTask));

        form.reset();
    });
};


export const deleteTask = (data) => {
    const deleteBtn = document.querySelectorAll('.delete__btn');


    deleteBtn.forEach(btn => {
        btn.addEventListener('click', ({target}) => {

            if (target.closest('.delete__btn')) {
                const taskIndex = data.findIndex(itemIndex => (itemIndex.id === parseInt(target.closest('.list__item').id)));

                data.splice(taskIndex, 1);

                localStorage.removeItem('task');

                target.closest('.list__item').remove();

                localStorage.setItem('task', JSON.stringify(data));

            }
        });
    });
};


export const editTask = (form, data) => {
    const editBtn = document.querySelectorAll('.edit__btn');
    const replaceBtn = document.querySelector('.replace__btn');
    const taskText = document.querySelector('.task__text');


    editBtn.forEach(btn => {
        btn.addEventListener('click', ({target}) => {

            if (target.closest('.edit__btn')) {
                data.forEach(task => {
                    if (task.id === parseInt(target.closest('.list__item').id)) {
                        form.task.value = task.task;

                        replaceBtn.disabled = false;
                        replaceBtn.classList.remove('bg-cyan-950');
                        replaceBtn.classList.add('hover:bg-teal-700', 'hover:border-teal-700', 'bg-teal-500');

                        form.btn.disabled = true;
                        form.btn.classList.add('bg-cyan-950');
                        form.btn.classList.remove('hover:bg-teal-700', 'hover:border-teal-700', 'bg-teal-500');

                        replaceBtn.addEventListener('click', () => {
                            task.task = form.task.value;
                            taskText.textContent = form.task.value;

                            localStorage.setItem('task', JSON.stringify(data));

                            form.reset();

                            location.reload();
                        });
                    }
                });
            }
        });
    });
};