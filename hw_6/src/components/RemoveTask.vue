<template>
  <div class="remove-task">
    <button @click="removeTask" :disabled="!selectedTask">Удалить задачу</button>
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true
    },
    selectedTask: {
      type: Object,
      default: null
    }
  },
  methods: {
    removeTask() {
      this.$emit('task-removed', this.selectedTask);
    }
  }
}
</script>

<style scoped>
.remove-task {
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #00008B;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #00008B;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
