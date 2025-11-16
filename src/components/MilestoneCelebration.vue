<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    persistent
    maximized
  >
    <div class="milestone-celebration">
      <!-- Arka Plan Konfeti -->
      <div class="background-confetti">
        <div v-for="i in 150" :key="i" class="bg-confetti" :style="getBgConfettiStyle(i)"></div>
      </div>

      <!-- Ana İçerik -->
      <div class="celebration-content">
        <!-- Büyük Tebrik Başlığı -->
        <div class="celebration-header">
          <div class="mega-icon">🏆</div>
          <h1 class="mega-title">
            <span class="title-line">MUHTEŞEM</span>
            <span class="title-line gradient-text">17 HİKAYE USTASI!</span>
          </h1>
        </div>

        <!-- İstatistikler -->
        <div class="stats-showcase">
          <div class="stat-item">
            <div class="stat-icon">📚</div>
            <div class="stat-number">17</div>
            <div class="stat-label">Hikaye Paylaştınız</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">🏆</div>
            <div class="stat-number">{{ totalAchievements }}</div>
            <div class="stat-label">Toplam Rozet</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">⭐</div>
            <div class="stat-number">Efsane</div>
            <div class="stat-label">Seviye</div>
          </div>
        </div>

        <!-- Başarı Mesajı -->
        <div class="achievement-message">
          <p class="message-text">
            🎉 Harika bir yolculuk! 🎉
          </p>
          <p class="message-text">
            Paylaştığınız her hikaye, empatinin gücünü gösteriyor.
          </p>
          <p class="message-text">
            Siz gerçek bir <strong>Hikaye Ustası</strong>sınız!
          </p>
          <p class="message-text gold-text">
            ✨ Bu başarı unutulmayacak! ✨
          </p>
        </div>

        <!-- Buton -->
        <q-btn
          label="🎊 Teşekkürler! 🎊"
          size="xl"
          class="mega-btn"
          @click="$emit('update:modelValue', false)"
        />

        <!-- Parti Efektleri -->
        <div class="party-emojis">
          <div class="floating-emoji" v-for="emoji in partyEmojis" :key="emoji.id" :style="emoji.style">
            {{ emoji.icon }}
          </div>
        </div>
      </div>

      <!-- Işık Efektleri -->
      <div class="light-beams">
        <div class="beam beam-1"></div>
        <div class="beam beam-2"></div>
        <div class="beam beam-3"></div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  modelValue: Boolean,
  totalAchievements: {
    type: Number,
    default: 17
  }
})

defineEmits(['update:modelValue'])

const partyEmojis = computed(() => {
  const emojis = ['🎉', '🎊', '🏆', '⭐', '✨', '🌟', '💫', '🎯', '🔥', '💪', '👏', '🙌']
  return emojis.map((icon, index) => ({
    id: index,
    icon,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      fontSize: `${30 + Math.random() * 40}px`
    }
  }))
})

function getBgConfettiStyle() {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739']
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
    backgroundColor: colors[Math.floor(Math.random() * colors.length)]
  }
}
</script>

<style scoped>
.milestone-celebration {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.background-confetti {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.bg-confetti {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  opacity: 0.9;
  animation: confettiFall linear infinite;
  top: -20px;
}

@keyframes confettiFall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.celebration-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 40px;
  max-width: 900px;
}

.celebration-header {
  margin-bottom: 50px;
}

.mega-icon {
  font-size: 150px;
  animation: iconBounce 2s infinite;
  filter: drop-shadow(0 10px 30px rgba(255, 215, 0, 0.5));
}

@keyframes iconBounce {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-30px) scale(1.1); }
}

.mega-title {
  margin: 20px 0;
  font-weight: 900;
}

.title-line {
  display: block;
  font-size: 60px;
  color: white;
  text-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  animation: titlePulse 2s infinite;
}

.gradient-text {
  background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s linear infinite;
}

@keyframes titlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes gradientShift {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.stats-showcase {
  display: flex;
  gap: 40px;
  justify-content: center;
  margin: 50px 0;
  flex-wrap: wrap;
}

.stat-item {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 30px 40px;
  min-width: 200px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: statFloat 3s ease-in-out infinite;
}

.stat-item:nth-child(2) {
  animation-delay: 0.5s;
}

.stat-item:nth-child(3) {
  animation-delay: 1s;
}

@keyframes statFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.stat-icon {
  font-size: 50px;
  margin-bottom: 10px;
}

.stat-number {
  font-size: 48px;
  font-weight: 900;
  color: #FFD700;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

.stat-label {
  font-size: 18px;
  color: white;
  font-weight: 600;
  margin-top: 10px;
}

.achievement-message {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 40px;
  margin: 40px auto;
  max-width: 700px;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.message-text {
  font-size: 24px;
  color: white;
  margin: 15px 0;
  line-height: 1.6;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.gold-text {
  color: #FFD700;
  font-size: 28px;
  font-weight: 800;
  margin-top: 25px;
}

.mega-btn {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #1a1a1a;
  font-size: 28px;
  font-weight: 900;
  padding: 25px 60px;
  border-radius: 50px;
  margin-top: 40px;
  box-shadow: 0 10px 40px rgba(255, 215, 0, 0.5);
  transition: all 0.3s;
}

.mega-btn:hover {
  transform: scale(1.1) translateY(-5px);
  box-shadow: 0 15px 50px rgba(255, 215, 0, 0.7);
}

.party-emojis {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-emoji {
  position: absolute;
  animation: floatEmoji 4s ease-in-out infinite;
  opacity: 0.8;
}

@keyframes floatEmoji {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-30px) rotate(10deg); }
  75% { transform: translateY(30px) rotate(-10deg); }
}

.light-beams {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.beam {
  position: absolute;
  width: 200px;
  height: 200%;
  background: linear-gradient(to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  top: -50%;
  animation: rotateBeam 10s linear infinite;
  transform-origin: center bottom;
}

.beam-1 {
  left: 20%;
  animation-delay: 0s;
}

.beam-2 {
  left: 50%;
  animation-delay: 3s;
}

.beam-3 {
  left: 80%;
  animation-delay: 6s;
}

@keyframes rotateBeam {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .mega-icon {
    font-size: 100px;
  }

  .title-line {
    font-size: 36px;
  }

  .stat-number {
    font-size: 32px;
  }

  .message-text {
    font-size: 18px;
  }

  .mega-btn {
    font-size: 20px;
    padding: 20px 40px;
  }
}
</style>
