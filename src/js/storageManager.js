export default class Manager {
  constructor() {
    this.tasks = this.getstorage();
  }

  getstorage = () => {
    const saveddata = localStorage.getItem('taskdata') || [];
    const array = JSON.parse(saveddata) || [];
    return array;
  };
}
