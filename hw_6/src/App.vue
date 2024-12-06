<template>
  <div id="app">
    <h1>Список дел</h1>
    <AddTask @task-added="addTask" />
    <ul>
      <li 
        v-for="(task, index) in tasks" 
        :key="index" 
        :class="{ completed: task.completed, selected: selectedTask === task }"
        @click="selectTask(task)"
      >
        {{ task.text }}
      </li>
    </ul>
    <div class="remove-task-container">
      <RemoveTask 
        :tasks="tasks" 
        :selectedTask="selectedTask" 
        @task-removed="removeTask" 
      />
    </div>
  </div>
</template>

<script>
import AddTask from './components/AddTask.vue';
import RemoveTask from './components/RemoveTask.vue';

export default {
  components: {
    AddTask,
    RemoveTask
  },
  data() {
    return {
      tasks: [],
      selectedTask: null
    };
  },
  methods: {
    addTask(taskText) {
      this.tasks.push({ text: taskText, completed: false });
    },
    selectTask(task) {
      this.selectedTask = task;
      this.tasks.forEach(t => t.selected = false); 
      task.selected = true; 
    },
    removeTask(task) {
      this.tasks = this.tasks.filter(t => t !== task);
      this.selectedTask = null; 
    }
  }
}
</script>

<style>
#app {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding: 10px;
  background-color: #e6e6ff; 
  border-radius: 8px;
  font-size: 16px;
}

h1 {
  text-align: center;
  color: #4b0082; 
  font-size: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  margin: 5px 0;
  background-color: #ffffff; 
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

li.completed {
  background-color: #d1e7ff; 
  text-decoration: line-through;
}

li:hover {
  background-color: #cfe2ff; 
}

li.selected {
  background-color: #d1ecf1;
}

.remove-task-container {
  display: flex;
  justify-content: center; 
  margin-top: 20px;
}
</style>
