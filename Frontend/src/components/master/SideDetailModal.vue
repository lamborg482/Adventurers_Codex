<template>
  <transition name="slide-right">
    <div v-if="creature" class="side-modal-overlay" @click.self="$emit('close')">
      <div class="side-modal-content">
        <button class="side-modal-close" @click="$emit('close')">
          <span class="button-line-top"></span>
          <span class="button-line-bottom"></span>
          ✖
        </button>
        <h2>{{ creature.name }}</h2>
        <img v-if="creature.img" :src="creature.img" class="side-modal-image" alt="">
        <p><strong>Тип:</strong> {{ creature.type === 'monster' ? 'Монстр' : 'NPC' }}</p>
        <p><strong>AC:</strong> {{ creature.ac }} | <strong>HP:</strong> {{ creature.hp }} | <strong>CR:</strong> {{ creature.cr }}</p>
        <p><strong>Скорость:</strong> {{ creature.speed }}</p>
        <div><strong>Характеристики:</strong>
          <ul>
            <li v-for="(val, key) in creature.stats" :key="key">{{ key.toUpperCase() }}: {{ val }}</li>
          </ul>
        </div>
        <div v-if="creature.actions"><strong>Действия:</strong> {{ creature.actions }}</div>
        <div v-if="creature.description" v-html="creature.description"></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  creature: { type: Object, required: true }
})
defineEmits(['close'])
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.4s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
.side-modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
}
.side-modal-content {
  background-color: rgb(163 136 93);
  width: 400px;
  max-width: 90%;
  height: 100%;
  overflow-y: auto;
  padding: 2rem 1.5rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  color: black;
  background-color: rgb(255 225 175);
  border-left: 2px solid #310000;
  position: relative;
  font-size: 1.2vw;
}
.side-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #2c2c2c;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
  overflow: hidden;
  line-height: 1;
}
.side-modal-close:hover {
  transform: scale(1.1);
  color: #790202;
}
.side-modal-close .button-line-top,
.side-modal-close .button-line-bottom {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  transition: transform 0.8s ease, background-color 0.3s ease;
  transform-origin: center;
}
.side-modal-close .button-line-top {
  top: 0;
}
.side-modal-close .button-line-bottom {
  bottom: 0;
}
.side-modal-close:hover .button-line-top,
.side-modal-close:hover .button-line-bottom {
  transform: scaleX(0.2);
  background-color: black;
}
.side-modal-image {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 4px;
}
.side-modal-content ul {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-left: 0;
}
.side-modal-content li {
  font-size: 1.1vw;
  display: flex;
  align-items: center;
}
.side-modal-content li::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('@/views/style/img/button-img.png') no-repeat center;
  background-size: contain;
  margin-right: 8px;
  vertical-align: middle;
}
.side-modal-content h2 {
  font-size: 1.8vw;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #790202;
  border-bottom: 2px solid black;
  padding-bottom: 0.3rem;
}
.side-modal-content p {
  margin: 0.5rem 0;
  font-size: 1.2vw;
}
.side-modal-content strong {
  color: #790202;
}
</style>