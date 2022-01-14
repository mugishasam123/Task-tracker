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
    <div class = "goesto">
    <input
                  type="checkbox"
                  name=""
                  id=""
      
                />
              <p  contenteditable="false" class="shared-property editpara">
                &nbsp;${value.description}
              </p>
              </div>
              <i class="hover-delete fa fa-ellipsis-v"></i>
              <i class="delete-icon fa fa-trash-alt"></i>
            `;

    const listnode = document.createElement('li');
    listnode.classList.add('list-item');
    listnode.classList.add('task');
    listnode.innerHTML = data;
    taskt.appendChild(listnode);
  });
  const editable = document.querySelectorAll('.task');
  const paraedit = document.querySelectorAll('.editpara');

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

  const updatetask = (newdescription, atindex) => {
    tasks[atindex].description = newdescription;
    localStorage.setItem('taskdata', JSON.stringify(tasks));
    cleardom();
    rerender(tasks);
  };

  hoverdelete.forEach((dete, indexdate) => {
    dete.addEventListener('click', (e) => {
      e.target.style.display = 'none';
      deletebtn.forEach((deleti, indexdata) => {
        if (indexdate === indexdata) {
          deletebtn[indexdata].style.display = 'flex';
        }
      });
      editable.forEach((editem, editindex) => {
        if (editindex === indexdate) {
          editable[editindex].style.background = '#FFF0CF';

          paraedit.forEach((paratem, parindex) => {
            paratem.addEventListener('keyup', (e) => {
              if (parindex === editindex) {
                paratem.setAttribute('contenteditable', 'true');
                if (e.keyCode === 13) {
                  paratem.setAttribute('contenteditable', 'false');
                  editable[editindex].style.background = 'white';

                  updatetask(paratem.textContent, parindex);
                }
              }
            });

            if (parindex === editindex) {
              paraedit[parindex].setAttribute('contenteditable', 'true');
            }
          });
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
