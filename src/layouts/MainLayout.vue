<template>
  <q-layout
    view="lHh Lpr lFf"
    class="main-layout"
  >
    <!-- KVKK ve Kullanım Şartları Dialogu -->
    <q-dialog
      v-model="showTermsDialog"
      persistent
      :maximized="$q.screen.lt.md"
    >
      <q-card
        class="terms-card"
        :class="$q.screen.lt.md ? 'mobile-terms' : ''"
      >
        <q-card-section class="terms-header bg-primary text-white">
          <div
            :class="$q.screen.lt.md ? 'text-h6' : 'text-h5'"
            class="text-weight-bold text-center"
          >
            🛡️ Kullanım Şartları ve KVKK
          </div>
          <div class="text-caption text-center q-mt-sm">
            Lütfen okuyup onaylayın
          </div>
        </q-card-section>

        <q-card-section class="terms-content">
          <q-scroll-area :style="$q.screen.lt.md ? 'height: 50vh' : 'height: 60vh'">
            <div :class="$q.screen.lt.md ? 'q-pa-sm' : 'q-pa-md'">
              <!-- KVKK Aydınlatma Metni -->
              <div class="section">
                <h6
                  :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'"
                  class="text-weight-bold text-primary"
                >📋 KVKK Aydınlatma Metni</h6>
                <p :class="$q.screen.lt.md ? 'text-body2' : 'text-body1'">
                  <strong>Bartın Üniversitesi AR-GE Proje Pazarı 2025</strong> kapsamında yürütülen
                  <strong>"Dijital Empati Köprüleri"</strong> platformu, 6698 sayılı Kişisel Verilerin Korunması Kanunu
                  ("KVKK") uyarınca kişisel verilerinizin korunmasına önem vermektedir.
                </p>
                <ul :class="$q.screen.lt.md ? 'text-caption' : 'text-body2'">
                  <li><strong>Veri Sorumlusu:</strong> Bartın Üniversitesi</li>
                  <li><strong>Toplanan Veriler:</strong> Ad, soyad, e-posta, hikayeler, konum (isteğe bağlı)</li>
                  <li><strong>Veri İşleme Amacı:</strong> Araştırma, akademik çalışma, empati analizi</li>
                  <li><strong>Veri Saklama Süresi:</strong> Proje süresi + 5 yıl</li>
                  <li><strong>Haklarınız:</strong> KVKK Madde 11 - Erişim, düzeltme, silme, itiraz hakları</li>
                </ul>
              </div>

              <q-separator class="q-my-md" />

              <!-- Kullanım Kuralları -->
              <div class="section">
                <h6
                  :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'"
                  class="text-weight-bold text-negative"
                >⚠️ Kullanım Kuralları</h6>
                <p
                  :class="$q.screen.lt.md ? 'text-body2' : 'text-body1'"
                  class="text-weight-bold text-negative"
                >
                  Aşağıdakiler kesinlikle yasaktır:
                </p>
                <ul
                  :class="$q.screen.lt.md ? 'text-caption' : 'text-body2'"
                  class="prohibition-list"
                >
                  <li>❌ <strong>+18 içerik:</strong> Müstehcen, pornografik paylaşımlar</li>
                  <li>❌ <strong>Nefret söylemi:</strong> Irkçı, ayrımcı ifadeler</li>
                  <li>❌ <strong>Şiddet:</strong> Tehdit, şiddet içeren paylaşımlar</li>
                  <li>❌ <strong>Spam:</strong> Anlamsız, tekrarlayan mesajlar</li>
                  <li>❌ <strong>Yanlış bilgi:</strong> Kasıtlı yanıltıcı bilgi</li>
                  <li>❌ <strong>Kişisel bilgi ifşası:</strong> İzinsiz bilgi paylaşma</li>
                  <li>❌ <strong>Telif ihlali:</strong> İzinsiz içerik kullanımı</li>
                  <li>❌ <strong>Dolandırıcılık:</strong> Sahte kimlik veya bilgi kullanımı</li>
                </ul>
              </div>

              <q-separator class="q-my-md" />

              <!-- Платформun Amacı -->
              <div class="section">
                <h6 class="text-h6 text-weight-bold text-positive">💚 Platformun Amacı</h6>
                <p class="text-body1">
                  Bu platform, <strong>empati kurmak, birbirimizi anlamak ve kültürel dayanışmayı güçlendirmek</strong>
                  amacıyla tasarlanmıştır. Paylaşımlarınız:
                </p>
                <ul class="text-body2">
                  <li>✅ Yapıcı, anlayışlı ve saygılı olmalıdır</li>
                  <li>✅ Kişisel deneyimlerinizi içermeli, gerçek olmalıdır</li>
                  <li>✅ Başkalarına ilham verebilmeli, empati oluşturmalıdır</li>
                  <li>✅ Toplumsal değerlere ve ahlaki normlara uygun olmalıdır</li>
                  <li>✅ Akademik araştırma amacına hizmet etmelidir</li>
                </ul>
              </div>

              <q-separator class="q-my-md" />

              <!-- Hukuki Sorumluluk -->
              <div class="section">
                <h6
                  :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'"
                  class="text-weight-bold text-warning"
                >⚖️ Hukuki Sorumluluk</h6>
                <p :class="$q.screen.lt.md ? 'text-caption' : 'text-body2'">
                  Kullanıcılar paylaştıkları içeriklerden <strong>tamamen sorumludur</strong>.
                  Yasalara aykırı paylaşımlar yetkili makamlara bildirilir.
                </p>
              </div>

              <q-separator class="q-my-md" />

              <!-- İletişim -->
              <div class="section">
                <h6
                  :class="$q.screen.lt.md ? 'text-subtitle1' : 'text-h6'"
                  class="text-weight-bold text-info"
                >📧 İletişim</h6>
                <p :class="$q.screen.lt.md ? 'text-caption' : 'text-body2'">
                  <strong>E-posta:</strong> kvkk@bartin.edu.tr<br>
                  <strong>Adres:</strong> Bartın Üniversitesi
                </p>
              </div>
            </div>
          </q-scroll-area>
        </q-card-section>

        <q-separator />

        <q-card-section class="terms-footer">
          <div class="row items-start q-mb-md">
            <q-checkbox
              v-model="acceptedTerms"
              color="primary"
              class="text-weight-bold"
            >
              <span :class="$q.screen.lt.md ? 'text-caption' : 'text-body2'">
                Yukarıdaki <strong>KVKK</strong> ve <strong>Kullanım Şartları</strong>'nı kabul ediyorum.
              </span>
            </q-checkbox>
          </div>

          <div
            class="row justify-center"
            :class="$q.screen.lt.md ? 'q-gutter-sm' : 'q-gutter-md'"
          >
            <q-btn
              :label="$q.screen.lt.md ? 'Hayır' : 'Kabul Etmiyorum'"
              color="negative"
              :size="$q.screen.lt.md ? 'sm' : 'lg'"
              icon="close"
              @click="rejectTerms"
              class="reject-btn"
              :style="$q.screen.lt.md ? 'min-width: 100px' : ''"
              unelevated
            />
            <q-btn
              :label="$q.screen.lt.md ? 'Evet' : 'Kabul Ediyorum'"
              color="positive"
              :size="$q.screen.lt.md ? 'sm' : 'lg'"
              icon="check"
              @click="acceptTerms"
              :disable="!acceptedTerms"
              class="accept-btn"
              :style="$q.screen.lt.md ? 'min-width: 100px' : ''"
              unelevated
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>

    <q-header
      elevated
      class="glass-header"
    >
      <q-toolbar :class="$q.screen.lt.md ? 'q-px-sm' : 'q-px-lg'">
        <q-icon
          name="favorite"
          class="pulse-icon"
          :size="$q.screen.lt.md ? '32px' : '40px'"
        >
          <q-tooltip v-if="!$q.screen.lt.md">Dijital Empati Köprüleri</q-tooltip>
        </q-icon>

        <q-toolbar-title
          class="animated-title"
          :class="$q.screen.lt.md ? 'mobile-title' : ''"
        >
          <span
            class="gradient-text"
            :class="$q.screen.lt.md ? 'text-caption' : ''"
          >
            {{ $q.screen.lt.md ? 'Empati Köprüleri' : 'Dijital Empati Köprüleri' }}
          </span>
        </q-toolbar-title>

        <!-- Desktop Menu -->
        <div
          v-if="!$q.screen.lt.md"
          class="row items-center q-gutter-md"
        >
          <q-btn
            flat
            label="Empati"
            to="/empathy"
            class="nav-btn"
            icon="psychology"
          />
          <q-btn
            flat
            label="Kullanıcılar"
            to="/users"
            class="nav-btn"
            icon="people"
          >
            <q-tooltip>Tüm Kullanıcılar</q-tooltip>
          </q-btn>
          <q-btn
            flat
            label="Harita"
            to="/map"
            class="nav-btn"
            icon="map"
          >
            <q-tooltip>Hikaye Haritası</q-tooltip>
          </q-btn>
          <q-btn
            v-if="user && isAdmin"
            flat
            label="Admin Panel"
            to="/admin/stories"
            class="nav-btn"
            icon="admin_panel_settings"
            color="red"
          >
            <q-tooltip>Tüm Hikayeleri Yönet</q-tooltip>
          </q-btn>
          <q-btn
            v-if="!user"
            flat
            label="Giriş / Kayıt"
            to="/login"
            class="nav-btn"
            icon="login"
          />
          <div
            v-if="user"
            class="row items-center q-gutter-sm user-section"
          >
            <q-btn
              flat
              @click="goToMyStories"
              class="profile-btn"
              no-caps
            >
              <q-avatar
                size="44px"
                class="avatar-glow clickable-avatar"
              >
                <div class="avatar-text">{{ initials }}</div>
                <q-badge
                  v-if="achievementCount > 0"
                  color="amber"
                  floating
                  class="badge-pulse"
                >
                  {{ achievementCount }}
                </q-badge>
              </q-avatar>
              <div class="user-info q-ml-sm">
                <div class="text-caption text-weight-bold user-name">{{ user.displayName || user.email }}</div>
                <div
                  v-if="achievementCount > 0"
                  class="text-caption achievement-badge"
                >
                  🏆 {{ achievementCount }} Rozet - Tıkla!
                </div>
                <div
                  v-else
                  class="text-caption achievement-badge"
                >
                  📚 Profilim
                </div>
              </div>
            </q-btn>
            <q-btn
              dense
              flat
              round
              icon="logout"
              @click="logout"
              class="logout-btn"
            >
              <q-tooltip>Çıkış Yap</q-tooltip>
            </q-btn>
          </div>
        </div>

        <!-- Mobile Menu -->
        <q-btn
          v-if="$q.screen.lt.md"
          flat
          dense
          round
          icon="menu"
          @click="mobileMenuOpen = true"
        />
      </q-toolbar>
      <NetworkStatus />
    </q-header>

    <!-- Mobile Drawer Menu -->
    <q-drawer
      v-model="mobileMenuOpen"
      overlay
      elevated
      side="right"
      v-if="$q.screen.lt.md"
    >
      <q-list class="mobile-menu-list">
        <q-item
          clickable
          v-ripple
          to="/empathy"
          @click="mobileMenuOpen = false"
        >
          <q-item-section avatar>
            <q-icon
              name="psychology"
              color="primary"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Empati</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to="/users"
          @click="mobileMenuOpen = false"
        >
          <q-item-section avatar>
            <q-icon
              name="people"
              color="primary"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Kullanıcılar</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to="/map"
          @click="mobileMenuOpen = false"
        >
          <q-item-section avatar>
            <q-icon
              name="map"
              color="primary"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Harita</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Admin Panel for Mobile -->
        <q-item
          v-if="user && isAdmin"
          clickable
          v-ripple
          to="/admin/stories"
          @click="mobileMenuOpen = false"
        >
          <q-item-section avatar>
            <q-icon
              name="admin_panel_settings"
              color="red"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-red text-weight-bold">Admin Panel</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item
          v-if="!user"
          clickable
          v-ripple
          to="/login"
          @click="mobileMenuOpen = false"
        >
          <q-item-section avatar>
            <q-icon
              name="login"
              color="positive"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Giriş / Kayıt</q-item-label>
          </q-item-section>
        </q-item>

        <template v-if="user">
          <q-item
            clickable
            v-ripple
            @click="goToMyStories(); mobileMenuOpen = false"
          >
            <q-item-section avatar>
              <q-avatar
                color="primary"
                text-color="white"
              >
                {{ initials }}
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ user.displayName || user.email }}</q-item-label>
              <q-item-label
                caption
                v-if="achievementCount > 0"
              >🏆 {{ achievementCount }} Rozet</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            @click="logout"
          >
            <q-item-section avatar>
              <q-icon
                name="logout"
                color="negative"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Çıkış Yap</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="glass-footer">
      <div class="q-pa-lg text-center footer-content">
        <div class="text-h6 text-weight-bold footer-title q-mb-sm">BARÜ AR-GE Proje Pazarı 2025</div>
        <div class="text-body2 footer-text q-mb-xs">Dijital Empati Köprüleri: Kültürel Dayanışma İçin Etkileşimli Hikaye
          Platformu</div>
        <div class="text-caption footer-caption q-mb-sm">Bartın Üniversitesi • Araştırma ve Geliştirme Projesi</div>

        <q-separator
          class="q-my-sm"
          style="max-width: 300px; margin: 0 auto;"
        />
        <div class="text-body2 text-white q-mt-sm">
          💻 Powered by <strong>Bayrak Atıf Sekmen</strong>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { useQuasar } from 'quasar'
import NetworkStatus from 'components/NetworkStatus.vue'

const router = useRouter()
const $q = useQuasar()
const user = ref(null)
const achievementCount = ref(0)
const showTermsDialog = ref(false)
const acceptedTerms = ref(false)
const mobileMenuOpen = ref(false)
const userRole = ref('user') // Admin role tracking

// LocalStorage'dan onay durumunu kontrol et
onMounted(() => {
  const termsAccepted = localStorage.getItem('termsAccepted')
  if (!termsAccepted) {
    showTermsDialog.value = true
  }

  updateUser()
  const timer = setInterval(updateUser, 2000)
  onUnmounted(() => clearInterval(timer))
})

function acceptTerms() {
  if (!acceptedTerms.value) {
    $q.notify({
      type: 'warning',
      message: 'Lütfen kullanım şartlarını kabul edin',
      icon: 'warning'
    })
    return
  }

  localStorage.setItem('termsAccepted', 'true')
  localStorage.setItem('termsAcceptedDate', new Date().toISOString())
  showTermsDialog.value = false

  $q.notify({
    type: 'positive',
    message: 'Hoş geldiniz! Platformumuzu kullanabilirsiniz.',
    icon: 'check_circle'
  })
}

function rejectTerms() {
  $q.dialog({
    title: '⚠️ Uyarı',
    message: 'Kullanım şartlarını kabul etmeden platformu kullanamazsınız. Sayfadan çıkmak istiyor musunuz?',
    cancel: {
      label: 'İptal',
      color: 'grey',
      flat: true
    },
    ok: {
      label: 'Çık',
      color: 'negative'
    },
    persistent: true
  }).onOk(() => {
    window.location.href = 'about:blank'
  })
}

function updateUser() {
  user.value = window.$user || null
  if (user.value) {
    loadAchievementCount(user.value.uid)
    loadUserRole(user.value.uid) // Load admin role
  } else {
    achievementCount.value = 0
    userRole.value = 'user'
  }
}

async function loadUserRole(userId) {
  try {
    const db = window.$firebase?.db
    if (!db || !userId) return

    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      userRole.value = userDoc.data().role || 'user'
    } else {
      userRole.value = 'user'
    }
  } catch (error) {
    console.error('Error loading user role:', error)
    userRole.value = 'user'
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
    if (error.code !== 'permission-denied') {
      console.error('Error loading achievement count:', error)
    }
    achievementCount.value = 0
  }
}

const initials = computed(() => {
  if (!user.value) return ''
  const name = user.value.displayName || user.value.email || ''
  return name.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase()
})

const isAdmin = computed(() => userRole.value === 'admin')

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

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(50px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-50px, 50px) scale(0.9);
  }
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

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
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

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
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

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }
}

@keyframes glow {
  from {
    box-shadow: 0 0 10px #667eea;
  }

  to {
    box-shadow: 0 0 20px #f093fb, 0 0 30px #764ba2;
  }
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
}

@keyframes shimmer {

  0%,
  100% {
    opacity: 0.9;
  }

  50% {
    opacity: 1;
  }
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

/* Terms Dialog Styles */
.terms-card {
  max-width: 900px;
  margin: 20px auto;
  border-radius: 16px;
}

.terms-header {
  padding: 24px;
}

.terms-content {
  padding: 0;
}

.terms-content .section {
  margin-bottom: 24px;
}

.terms-content h6 {
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid currentColor;
}

.terms-content ul {
  margin-left: 20px;
  line-height: 1.8;
}

.terms-content li {
  margin-bottom: 8px;
}

.prohibition-list li {
  color: #c10015;
  font-weight: 600;
}

.terms-footer {
  padding: 24px;
  background: #f5f5f5;
}

.accept-btn {
  min-width: 200px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.accept-btn:not(:disabled):hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
}

.reject-btn {
  min-width: 200px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.reject-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(244, 67, 54, 0.4);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .mobile-terms {
    margin: 0 !important;
    border-radius: 0 !important;
  }

  .terms-content ul {
    margin-left: 10px;
    line-height: 1.6;
  }

  .terms-content li {
    margin-bottom: 6px;
    font-size: 12px;
  }

  .terms-footer {
    padding: 12px;
  }

  .mobile-title {
    font-size: 0.85rem !important;
  }

  .glass-header .q-toolbar {
    min-height: 56px;
  }

  .pulse-icon {
    margin-right: 8px;
  }

  .footer-content {
    padding: 12px !important;
  }

  .footer-title {
    font-size: 1rem !important;
  }

  .footer-text {
    font-size: 0.75rem !important;
  }

  .footer-caption {
    font-size: 0.7rem !important;
  }

  .animated-bg .gradient-orb {
    opacity: 0.3;
  }
}

/* Mobile Menu */
.mobile-menu-list {
  padding-top: 20px;
}

.mobile-menu-list .q-item {
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.mobile-menu-list .q-item:hover {
  background: rgba(102, 126, 234, 0.05);
}
</style>
