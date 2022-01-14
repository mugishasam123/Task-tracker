/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/extensions
import Manager from './storageManager';

export default class Interactive {
  constructor(tasks) {
    this.tasks = tasks;
  }

  statusUpdate = (status) => {
    this.tasks[status].completed = true;
    localStorage.setItem('taskdata', JSON.stringify(this.tasks));
  };

  statusRemove = (status) => {
    this.tasks[status].completed = false;
    localStorage.setItem('taskdata', JSON.stringify(this.tasks));
  };
}
