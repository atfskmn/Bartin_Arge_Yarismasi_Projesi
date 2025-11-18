<template>
  <q-page class="flex flex-center animated-background">
    <div class="page-container">
      <div class="welcome-section text-center">
        <div class="text-h2 text-weight-bold q-mb-md animated-title">
          Arge Proje Pazarı 2025
        </div>
        <div class="text-h5 animated-subtitle q-mb-xl">
          Uygulama Web Sitesi
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { initUserPresence, setUserOffline } from 'src/utils/presence'

const user = ref(null)
let presenceInterval = null

onMounted(() => {
  updateUser()
  const timer = setInterval(updateUser, 2000)

  onUnmounted(() => {
    clearInterval(timer)
    if (presenceInterval) clearInterval(presenceInterval)
    if (user.value) {
      setUserOffline(user.value)
    }
  })
})

async function updateUser() {
  const currentUser = window.$user
  if (currentUser && !user.value) {
    user.value = currentUser
    initPresence()
  } else if (!currentUser && user.value) {
    user.value = null
  }
}

async function initPresence() {
  if (user.value && !presenceInterval) {
    presenceInterval = await initUserPresence(user.value)
  }
}
</script>

<style scoped>
.animated-background {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
  min-height: 100vh;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.page-container {
  width: 100%;
  max-width: 1200px;
  padding: 20px;
}

.welcome-section {
  margin-bottom: 40px;
  animation: fadeInUp 1.2s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-title {
  color: white !important;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.1);
  animation: titlePulse 3s ease-in-out infinite, float 4s ease-in-out infinite;
  letter-spacing: 2px;
  font-size: 3rem;
}

@keyframes titlePulse {

  0%,
  100% {
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.1);
  }

  50% {
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.4), 0 0 60px rgba(255, 255, 255, 0.3);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animated-subtitle {
  color: rgba(255, 255, 255, 0.95) !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: subtitleFade 1.5s ease-out 0.3s both;
  letter-spacing: 1px;
}

.admin-btn {
  font-size: 1.1rem;
  padding: 16px 32px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(255, 0, 0, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 8px 20px rgba(255, 0, 0, 0.3);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 12px 30px rgba(255, 0, 0, 0.5);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes subtitleGlow {

  0%,
  100% {
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  50% {
    text-shadow: 0 2px 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.2);
  }
}

@media (max-width: 768px) {
  .animated-title {
    font-size: 2rem;
    letter-spacing: 1px;
  }

  .animated-subtitle {
    font-size: 1.2rem;
  }
}
</style>
