<template>
  <div class="add-task">
    <input
      v-model="taskText"
      @keyup.enter="addTask"
      placeholder="Введите новую задачу"
    />
    <button @click="addTask">Добавить</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskText: ''
    };
  },
  methods: {
    addTask() {
      if (this.taskText.trim()) {
        this.$emit('task-added', this.taskText);
        this.taskText = '';
      }
    }
  }
}
</script>

<style scoped>
.add-task {
  display: flex;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  margin-left: 10px;
  background-color: #4682B4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #00008B;
}
</style>
