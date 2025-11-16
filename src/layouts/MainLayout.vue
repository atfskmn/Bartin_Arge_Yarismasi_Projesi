<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>

    <q-header elevated class="glass-header">
      <q-toolbar class="q-px-lg">
        <q-icon name="favorite" class="pulse-icon" size="40px">
          <q-tooltip>Dijital Empati Köprüleri</q-tooltip>
        </q-icon>
        <q-toolbar-title class="animated-title">
          <span class="gradient-text">Dijital Empati Köprüleri</span>
        </q-toolbar-title>
        <div class="row items-center q-gutter-md">
          <q-btn flat label="Empati" to="/empathy" class="nav-btn" icon="psychology" />
          <q-btn v-if="!user" flat label="Giriş / Kayıt" to="/login" class="nav-btn" icon="login" />
          <div v-if="user" class="row items-center q-gutter-sm user-section">
            <q-btn
              flat
              @click="goToMyStories"
              class="profile-btn"
              no-caps
            >
              <q-avatar size="44px" class="avatar-glow clickable-avatar">
                <div class="avatar-text">{{ initials }}</div>
                <q-badge v-if="achievementCount > 0" color="amber" floating class="badge-pulse">
                  {{ achievementCount }}
                </q-badge>
              </q-avatar>
              <div class="user-info q-ml-sm">
                <div class="text-caption text-weight-bold user-name">{{ user.displayName || user.email }}</div>
                <div v-if="achievementCount > 0" class="text-caption achievement-badge">
                  🏆 {{ achievementCount }} Rozet - Tıkla!
                </div>
                <div v-else class="text-caption achievement-badge">
                  📚 Profilim
                </div>
              </div>
            </q-btn>
            <q-btn dense flat round icon="logout" @click="logout" class="logout-btn">
              <q-tooltip>Çıkış Yap</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
      <NetworkStatus />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="glass-footer">
      <div class="q-pa-lg text-center footer-content">
        <div class="text-h6 text-weight-bold footer-title q-mb-sm">BARÜ AR-GE Proje Pazarı 2025</div>
        <div class="text-body2 footer-text q-mb-xs">Dijital Empati Köprüleri: Kültürel Dayanışma İçin Etkileşimli Hikaye Platformu</div>
        <div class="text-caption footer-caption">Bartın Üniversitesi • Araştırma ve Geliştirme Projesi</div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import NetworkStatus from 'components/NetworkStatus.vue'

const router = useRouter()
const user = ref(null)
const achievementCount = ref(0)

function updateUser() {
  user.value = window.$user || null
  if (user.value) {
    loadAchievementCount(user.value.uid)
  } else {
    achievementCount.value = 0
  }
}

async function loadAchievementCount(userId) {
  try {
    const db = window.$firebase?.db
    if (!db || !userId) return

    const achievementsRef = doc(db, 'userAchievements', userId)
    const achievementsDoc = await getDoc(achievementsRef)

    if (achievementsDoc.exists()) {
      const achievements = achievementsDoc.data().achievements || []
      achievementCount.value = achievements.length
    } else {
      achievementCount.value = 0
    }
  } catch (error) {
    // Sessizce hata yönet, kullanıcıyı rahatsız etme
    if (error.code !== 'permission-denied') {
      console.error('Error loading achievement count:', error)
    }
    achievementCount.value = 0
  }
}

onMounted(() => {
  updateUser()
  const timer = setInterval(updateUser, 2000) // Her 2 saniyede kontrol
  onUnmounted(() => clearInterval(timer))
})

const initials = computed(() => {
  if (!user.value) return ''
  const name = user.value.displayName || user.value.email || ''
  return name.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase()
})

function goToMyStories() {
  router.push('/my-stories')
}

async function logout() {
  try {
    const auth = window.$firebase?.auth
    if (auth) await signOut(auth)
    window.location.href = '/#/'
  } catch (err) {
    console.error('Logout error', err)
  }
}
</script>

<style scoped>
.main-layout {
  position: relative;
}

.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #f093fb 0%, #f5576c 100%);
  top: -250px;
  left: -250px;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #4facfe 0%, #00f2fe 100%);
  bottom: -200px;
  right: -200px;
  animation-delay: 7s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #43e97b 0%, #38f9d7 100%);
  top: 50%;
  left: 50%;
  animation-delay: 14s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(50px, -50px) scale(1.1); }
  66% { transform: translate(-50px, 50px) scale(0.9); }
}

.glass-header {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.pulse-icon {
  color: #f093fb;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.animated-title {
  font-size: 1.5rem;
  font-weight: 800;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.nav-btn {
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.2);
}

.user-section {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.profile-btn {
  color: white;
  transition: all 0.3s ease;
}

.profile-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.user-name {
  color: white;
  font-size: 13px;
}

.avatar-glow {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: glow 2s infinite alternate;
  border: 3px solid rgba(255, 255, 255, 0.5);
}

.clickable-avatar {
  cursor: pointer;
  transition: all 0.3s ease;
}

.clickable-avatar:hover {
  transform: scale(1.15);
  box-shadow: 0 0 30px #f093fb, 0 0 40px #764ba2;
}

.badge-pulse {
  animation: badgePulse 2s infinite;
}

@keyframes badgePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes glow {
  from { box-shadow: 0 0 10px #667eea; }
  to { box-shadow: 0 0 20px #f093fb, 0 0 30px #764ba2; }
}

.avatar-text {
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.user-info {
  color: white;
  text-align: left;
}

.achievement-badge {
  font-size: 11px;
  opacity: 1;
  animation: shimmer 2s infinite;
  font-weight: 700;
  color: #FFD700;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.8);
}@keyframes shimmer {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 1; }
}

.logout-btn {
  color: white;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(180deg);
}

.glass-footer {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-content {
  color: white;
}

.footer-title {
  color: #000000;
  font-weight: 800;
}

.footer-text {
  color: #000000;
  font-weight: 600;
}

.footer-caption {
  color: #333333;
  font-weight: 500;
}
</style>
