<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    persistent
  >
    <q-card class="achievement-card">
      <q-card-section class="text-center q-pa-xl achievement-content">
        <!-- Animasyonlu Rozet İkonu -->
        <div class="achievement-icon-wrapper">
          <div class="achievement-glow"></div>
          <div class="achievement-icon">
            {{ achievement.icon }}
          </div>
        </div>

        <!-- Rozet Bilgileri -->
        <div class="text-h4 text-weight-bold q-mt-lg achievement-title">
          🎉 Tebrikler! 🎉
        </div>

        <div class="text-h5 text-weight-bold q-mt-md" :style="{ color: rarityColor }">
          {{ achievement.name }}
        </div>

        <div class="text-body1 q-mt-sm text-grey-7">
          {{ achievement.description }}
        </div>

        <!-- Nadirlik Badge -->
        <q-badge
          :color="rarityColor"
          class="q-mt-md q-pa-sm text-subtitle2"
        >
          {{ rarityLabel }} Rozet
        </q-badge>

        <!-- Konfeti Animasyonu -->
        <div class="confetti-container">
          <div v-for="i in 20" :key="i" class="confetti" :style="getConfettiStyle(i)"></div>
        </div>
      </q-card-section>

      <q-card-actions align="center" class="q-pb-lg">
        <q-btn
          label="Harika!"
          color="purple"
          size="lg"
          class="gradient-btn"
          @click="$emit('update:modelValue', false)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { RARITY_COLORS, RARITY_LABELS } from 'src/utils/achievements'

const props = defineProps({
  modelValue: Boolean,
  achievement: {
    type: Object,
    required: true
  }
})

defineEmits(['update:modelValue'])

const rarityColor = computed(() => {
  return RARITY_COLORS[props.achievement.rarity] || '#95a5a6'
})

const rarityLabel = computed(() => {
  return RARITY_LABELS[props.achievement.rarity] || 'Yaygın'
})

function getConfettiStyle(index) {
  const colors = ['#f093fb', '#667eea', '#43e97b', '#4facfe', '#f5576c']
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 0.5}s`,
    backgroundColor: colors[index % colors.length],
    animationDuration: `${2 + Math.random() * 2}s`
  }
}
</script>

<style scoped>
.achievement-card {
  min-width: 400px;
  max-width: 500px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
}

.achievement-content {
  background: white;
  position: relative;
  z-index: 1;
}

.achievement-icon-wrapper {
  position: relative;
  display: inline-block;
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.achievement-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.6) 0%, transparent 70%);
  animation: pulse 2s infinite;
  border-radius: 50%;
}

.achievement-icon {
  font-size: 120px;
  position: relative;
  z-index: 2;
  animation: rotate 2s ease-in-out infinite;
}

.achievement-title {
  animation: slideInDown 0.6s ease;
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.3;
  }
}

@keyframes rotate {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}

@keyframes slideInDown {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.gradient-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
  min-width: 150px;
}

.gradient-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
}

/* Konfeti Animasyonu */
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  top: -10px;
  animation: confettiFall linear forwards;
}

@keyframes confettiFall {
  to {
    transform: translateY(600px) rotate(360deg);
    opacity: 0;
  }
}

@media (max-width: 600px) {
  .achievement-card {
    min-width: 90vw;
  }
}
</style>
