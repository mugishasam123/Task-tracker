import '../css/index.css';

const taskt = document.querySelector('.tasks');

const tasks = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'wash the dishes',
    completed: false,
    index: 2,
  },
  {
    description: 'wash the dishes',
    completed: false,
    index: 3,
  },
];

tasks.forEach((value) => {
  const data = `
            <p class="shared-property task">
              <input
                type="checkbox"
                name=""
                id=""
    
              />&nbsp;${value.description}
            </p>
            <i class="fa fa-ellipsis-v"></i>
            <i class="delete-icon fa fa-trash-alt"></i>
          `;

  const listnode = document.createElement('li');
  listnode.classList.add('list-item');
  listnode.classList.add('task');
  listnode.innerHTML = data;
  taskt.appendChild(listnode);
});
