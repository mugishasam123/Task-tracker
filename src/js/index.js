/* eslint-disable no-unused-vars */
import '../css/index.css';

const taskt = document.querySelector('.main-div');
const taskadd = document.querySelector('#task-add');

const getstorage = () => {
  const saveddata = localStorage.getItem('taskdata');
  const array = JSON.parse(saveddata) || [];
  return array;
};

const tasks = getstorage();

const save = () => {
  localStorage.setItem('taskdata', JSON.stringify(tasks));
};
const cleardom = () => {
  taskt.innerHTML = '';
};
const rerender = (tasks) => {
  tasks.forEach((value) => {
    const data = `
              <p class="shared-property task">
                <input
                  type="checkbox"
                  name=""
                  id=""
      
                />&nbsp;${value.description}
              </p>
              <i class="hover-delete fa fa-ellipsis-v"></i>
              <i class="delete-icon fa fa-trash-alt"></i>
            `;

    const listnode = document.createElement('li');
    listnode.classList.add('list-item');
    listnode.classList.add('task');
    listnode.innerHTML = data;
    taskt.appendChild(listnode);
  });

  const deletetask = (indexer) => {
    tasks.splice(indexer, 1);
    tasks.forEach((updatedtask, updatedindex) => {
      updatedtask.index = updatedindex + 1;
    });

    localStorage.setItem('taskdata', JSON.stringify(tasks));
    cleardom();
    rerender(tasks);
  };
  const clearall = document.querySelector('.clear-all');

  const hoverdelete = document.querySelectorAll('.hover-delete');
  const deletebtn = document.querySelectorAll('.delete-icon');

  hoverdelete.forEach((dete, indexdate) => {
    dete.addEventListener('click', (e) => {
      e.target.style.display = 'none';
      deletebtn.forEach((deleti, indexdata) => {
        if (indexdate === indexdata) {
          deletebtn[indexdata].style.display = 'flex';
        }
      });
    });
  });

  deletebtn.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      deletetask(index);
    });
  });
};
const add = (objectdata) => {
  tasks.push(objectdata);
  save(tasks);
};

taskadd.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    const objectdata = {
      description: e.target.value,
      completed: false,
      index: tasks.length + 1,
    };
    add(objectdata);
    cleardom();
    rerender(tasks);
  }
});

window.addEventListener('load', () => rerender(tasks));
