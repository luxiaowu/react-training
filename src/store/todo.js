export default {
  state: {
    dataSource: []
  },
  effects: {
    async refresh() {
      this.dataSource = await new Promise((resolve) =>
        setTimeout(() => {
          resolve([
            {
              name: 'react'
              // done: false
            },
            {
              name: 'vue',
              done: true
            },
            {
              name: 'angular'
              // done: false
            }
          ]);
        }, 1000)
      );
    }
  },
  reducers: {
    add(todo) {
      this.dataSource.unshift(todo);
    },
    remove(index) {
      this.dataSource.splice(index, 1);
    },
    toggle(index) {
      this.dataSource[index].done = !this.dataSource[index].done;
    }
  }
};
