<template>
  <div class="my-stories-page q-pa-lg">
    <div class="page-header q-mb-lg text-center">
      <h3 class="text-h3 text-weight-bold gradient-text q-mb-sm">📚 Hikayelerim ve Rozetlerim</h3>
      <p class="text-body1 text-white">Paylaştığınız hikayeler, empati analizleri ve kazandığınız rozetler</p>
    </div>

    <!-- Rozet Koleksiyonu -->
    <div
      v-if="!loading"
      class="achievements-section q-mb-xl"
    >
      <div class="glass-card q-pa-lg">
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h5 text-weight-bold achievement-title">
            🏆 Rozetler ve Başarımlar
          </div>
          <q-chip
            color="amber"
            text-color="dark"
            icon="workspace_premium"
            size="lg"
          >
            {{ userAchievements.length }} / {{ totalAchievements }} Rozet
          </q-chip>
        </div>

        <!-- Rozet Nasıl Kazanılır -->
        <q-banner
          class="bg-info text-white q-mb-md"
          style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;"
        >
          <template v-slot:avatar>
            <q-icon
              name="info"
              size="32px"
            />
          </template>
          <div class="text-h6 text-weight-bold q-mb-xs">🎯 Rozetler Nasıl Kazanılır?</div>
          <div class="text-body2">
            <strong>Hikaye paylaştığınızda</strong> otomatik olarak rozet kontrolü yapılır ve yeni kazandığınız rozetler
            <strong>animasyonlu bir bildirimle</strong> gösterilir!
          </div>
          <div class="q-mt-sm">
            <q-chip
              color="white"
              text-color="purple"
              size="sm"
              icon="local_fire_department"
            >Tutarlı yazın</q-chip>
            <q-chip
              color="white"
              text-color="purple"
              size="sm"
              icon="favorite"
            >Yüksek empati skorları alın</q-chip>
            <q-chip
              color="white"
              text-color="purple"
              size="sm"
              icon="public"
            >Kültürel duyarlılık gösterin</q-chip>
          </div>
        </q-banner>

        <div
          v-if="userAchievements.length === 0"
          class="text-center q-py-lg no-achievement-box"
        >
          <q-icon
            name="emoji_events"
            size="80px"
            color="amber"
          />
          <div class="text-h6 q-mt-md text-weight-bold">Henüz rozet kazanmadınız</div>
          <p class="text-body1 q-mb-md">İlk hikayenizi paylaşın ve <strong>🌱 İlk Adım</strong> rozetini kazanın!</p>
          <q-btn
            label="Hikaye Paylaş ve Rozet Kazan"
            color="purple"
            size="lg"
            icon="add_circle"
            @click="goToExperience"
            class="gradient-btn"
            unelevated
          />
        </div>

        <div
          v-else
          class="achievements-grid"
        >
          <div
            v-for="achievement in userAchievements"
            :key="achievement.id"
            class="achievement-item"
            :style="{ borderColor: getRarityColor(achievement.rarity) }"
          >
            <div class="achievement-icon-wrapper">
              <div class="achievement-icon">{{ achievement.icon }}</div>
              <q-tooltip
                class="bg-dark text-white text-body2"
                anchor="top middle"
                self="bottom middle"
                :offset="[0, 10]"
              >
                <div class="text-weight-bold q-mb-xs">{{ getIconMeaning(achievement.icon) }}</div>
                <div>{{ achievement.description }}</div>
                <div
                  class="text-caption q-mt-xs"
                  :style="{ color: getRarityColor(achievement.rarity) }"
                >
                  {{ getRarityLabel(achievement.rarity) }}
                </div>
              </q-tooltip>
            </div>
            <div
              class="achievement-name text-weight-bold q-mt-sm"
              :style="{ color: getRarityColor(achievement.rarity) }"
            >
              {{ achievement.name }}
            </div>
            <div class="achievement-desc text-caption text-white q-mt-xs">
              {{ achievement.description }}
            </div>
            <q-badge
              :color="getRarityColor(achievement.rarity)"
              class="q-mt-sm"
            >
              {{ getRarityLabel(achievement.rarity) }}
            </q-badge>
          </div>
        </div>

        <!-- İstatistikler -->
        <div class="stats-section q-mt-lg">
          <div class="row q-gutter-md">
            <div class="col stat-card">
              <q-icon
                name="auto_stories"
                size="32px"
                color="blue"
              />
              <div class="text-h6 text-white q-mt-sm">{{ myStories.length }}</div>
              <div class="text-caption text-white">Toplam Hikaye</div>
            </div>
            <div class="col stat-card">
              <q-icon
                name="trending_up"
                size="32px"
                color="green"
              />
              <div class="text-h6 text-white q-mt-sm">{{ avgEmpathyScore }}</div>
              <div class="text-caption text-white">Ortalama Skor</div>
            </div>
            <div class="col stat-card">
              <q-icon
                name="emoji_events"
                size="32px"
                color="amber"
              />
              <div class="text-h6 text-white q-mt-sm">{{ userAchievements.length }}</div>
              <div class="text-caption text-white">Kazanılan Rozet</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="text-center q-py-xl"
    >
      <q-spinner-dots
        color="purple"
        size="60px"
      />
      <p class="text-white q-mt-md">Hikayeleriniz yükleniyor...</p>
    </div>

    <!-- No Stories -->
    <div
      v-else-if="myStories.length === 0"
      class="text-center q-py-xl"
    >
      <q-icon
        name="book"
        size="100px"
        color="white"
        class="q-mb-md opacity-50"
      />
      <h5 class="text-h5 text-white q-mb-sm">Henüz hikaye paylaşmadınız</h5>
      <p class="text-body2 text-white q-mb-lg">İlk hikayenizi paylaşarak başlayın!</p>
      <q-btn
        label="Hikaye Paylaş"
        color="purple"
        size="lg"
        icon="add"
        @click="goToExperience"
        class="gradient-btn"
      />
    </div>

    <!-- Stories Grid -->
    <div v-else>
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h5 text-weight-bold stories-title">📖 Hikayelerim</div>
        <q-btn
          label="Yeni Hikaye Ekle"
          color="purple"
          icon="add_circle"
          @click="goToExperience"
          class="gradient-btn"
          unelevated
        />
      </div>
      <div class="stories-grid">
        <div
          v-for="story in myStories"
          :key="story.id"
          class="story-card glass-card animated-card q-pa-lg"
        >
          <!-- Story Header -->
          <div class="row items-center justify-between q-mb-md">
            <div>
              <q-chip
                color="purple"
                text-color="white"
                icon="calendar_today"
                size="sm"
              >
                {{ formatDate(story.timestamp) }}
              </q-chip>
            </div>
            <div class="row q-gutter-xs">
              <q-btn
                flat
                dense
                round
                icon="share"
                color="primary"
              >
                <q-tooltip>Paylaş</q-tooltip>
                <q-menu>
                  <q-list style="min-width: 150px">
                    <q-item
                      clickable
                      v-close-popup
                      @click="shareOnTwitter(story)"
                    >
                      <q-item-section avatar>
                        <q-icon
                          name="fab fa-twitter"
                          color="blue"
                        />
                      </q-item-section>
                      <q-item-section>Twitter (X)</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      @click="shareOnFacebook(story)"
                    >
                      <q-item-section avatar>
                        <q-icon
                          name="fab fa-facebook"
                          color="blue-8"
                        />
                      </q-item-section>
                      <q-item-section>Facebook</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      @click="shareOnInstagram(story)"
                    >
                      <q-item-section avatar>
                        <q-icon
                          name="fab fa-instagram"
                          color="pink"
                        />
                      </q-item-section>
                      <q-item-section>Instagram</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      @click="shareOnWhatsApp(story)"
                    >
                      <q-item-section avatar>
                        <q-icon
                          name="fab fa-whatsapp"
                          color="green"
                        />
                      </q-item-section>
                      <q-item-section>WhatsApp</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      v-close-popup
                      @click="copyStoryLink(story)"
                    >
                      <q-item-section avatar>
                        <q-icon
                          name="content_copy"
                          color="grey"
                        />
                      </q-item-section>
                      <q-item-section>Bağlantıyı Kopyala</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <q-btn
                flat
                dense
                round
                icon="delete"
                color="negative"
                @click="confirmDelete(story.id)"
              >
                <q-tooltip>Hikayeyi Sil</q-tooltip>
              </q-btn>
            </div>
          </div>

          <!-- Story Content -->
          <div class="story-content q-mb-md">
            <q-scroll-area
              style="height: 150px;"
              class="story-text"
            >
              {{ story.story }}
            </q-scroll-area>
          </div>

          <!-- Story Stats -->
          <div class="row items-center q-gutter-sm q-mb-md">
            <q-chip
              color="blue-grey-2"
              text-color="dark"
              size="sm"
              icon="text_fields"
            >
              {{ story.wordCount }} kelime
            </q-chip>
            <q-chip
              color="blue-grey-2"
              text-color="dark"
              size="sm"
              icon="notes"
            >
              {{ story.story.length }} karakter
            </q-chip>
          </div>

          <!-- Empathy Analysis -->
          <div
            v-if="story.analysis"
            class="analysis-section"
          >
            <div class="text-h6 text-white q-mb-md">🎯 Empati Analizi</div>

            <!-- Empathy Level Badge -->
            <div class="q-mb-md">
              <q-badge
                :color="getEmpathyColor(story.analysis.level)"
                class="text-h6 q-pa-sm"
              >
                {{ story.analysis.level }}
              </q-badge>
            </div>

            <!-- Criteria -->
            <div class="criteria-grid q-mb-md">
              <div
                v-for="(value, key) in story.analysis.criteria"
                :key="key"
                class="criterion"
              >
                <div class="row items-center justify-between q-mb-xs">
                  <span class="text-white text-weight-medium">{{ getCriteriaLabel(key) }}</span>
                  <span
                    class="text-weight-bold"
                    :style="{ color: getCriteriaColor(value) }"
                  >
                    %{{ value }}
                  </span>
                </div>
                <q-linear-progress
                  :value="value / 100"
                  :color="getCriteriaColor(value)"
                  size="8px"
                  rounded
                />
              </div>
            </div>

            <!-- Summary -->
            <div class="summary-box q-pa-md">
              <div class="text-body2 text-white">
                <strong>Özet:</strong> {{ story.analysis.summary }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <q-dialog v-model="deleteDialog">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Hikayeyi Sil</div>
        </q-card-section>
        <q-card-section>
          Bu hikayeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="İptal"
            color="grey"
            v-close-popup
          />
          <q-btn
            flat
            label="Sil"
            color="negative"
            @click="deleteStory"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { useQuasar } from 'quasar'
import { ACHIEVEMENTS, RARITY_COLORS, RARITY_LABELS, getAchievementInfo } from '../utils/achievements'

const router = useRouter()
const $q = useQuasar()

const loading = ref(true)
const myStories = ref([])
const deleteDialog = ref(false)
const storyToDelete = ref(null)
const userAchievements = ref([])

const totalAchievements = computed(() => Object.keys(ACHIEVEMENTS).length)

const avgEmpathyScore = computed(() => {
  if (myStories.value.length === 0) return 0
  const sum = myStories.value.reduce((acc, story) => acc + (story.score || 0), 0)
  return Math.round(sum / myStories.value.length)
})

onMounted(async () => {
  await loadMyStories()
})

async function loadMyStories() {
  loading.value = true
  try {
    const user = window.$user
    if (!user) {
      router.push('/login')
      return
    }

    const db = window.$firebase?.db
    if (!db) {
      $q.notify({
        type: 'negative',
        message: 'Firebase bağlantısı bulunamadı',
        position: 'top'
      })
      return
    }

    // Get user's stories
    const storiesRef = collection(db, 'stories')
    const q = query(
      storiesRef,
      where('userId', '==', user.uid)
    )
    const querySnapshot = await getDocs(q)

    myStories.value = []
    querySnapshot.forEach((doc) => {
      myStories.value.push({
        id: doc.id,
        ...doc.data()
      })
    })

    // JavaScript'te timestamp'e göre sırala (en yeni en üstte)
    myStories.value.sort((a, b) => {
      const timeA = a.timestamp?.toDate?.() || new Date(a.timestamp || 0)
      const timeB = b.timestamp?.toDate?.() || new Date(b.timestamp || 0)
      return timeB - timeA // Descending order (en yeni üstte)
    })

    // Kullanıcının rozetlerini yükle
    await loadUserAchievements(user.uid, db)

  } catch (error) {
    console.error('Error loading stories:', error)
    $q.notify({
      type: 'negative',
      message: 'Hikayeler yüklenirken hata oluştu: ' + error.message,
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

async function loadUserAchievements(userId, db) {
  try {
    console.log('🏆 Loading achievements for user:', userId)
    const achievementsRef = doc(db, 'userAchievements', userId)
    const achievementsDoc = await getDoc(achievementsRef)

    if (achievementsDoc.exists()) {
      const data = achievementsDoc.data()
      console.log('📊 Achievement document data:', data)
      const achievements = data.achievements || []
      console.log('🎖️ Found achievements:', achievements.length)

      // Rozet bilgilerini tam olarak al
      userAchievements.value = achievements.map(a => {
        const info = getAchievementInfo(a.id)
        return info ? { ...info, unlockedAt: a.unlockedAt } : null
      }).filter(a => a !== null)

      console.log('✅ Loaded achievements:', userAchievements.value)
    } else {
      console.log('⚠️ No achievement document found for user')
      userAchievements.value = []
    }
  } catch (error) {
    console.error('❌ Error loading achievements:', error)
    // Permission hatası sessizce geç - kullanıcı deneyimini bozma
    if (error.code === 'permission-denied') {
      console.warn('⚠️ Permission denied - Firestore rules deploy edilmeli!')
      // Firestore rules deploy edilene kadar boş array
      userAchievements.value = []
    } else {
      // Diğer hatalar için hata mesajı göster
      console.error('Unexpected error:', error)
      userAchievements.value = []
    }
  }
}

function formatDate(timestamp) {
  if (!timestamp) return 'Tarih yok'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getEmpathyColor(level) {
  const colors = {
    'Çok Yüksek': 'green',
    'Yüksek': 'light-green',
    'Orta': 'orange',
    'Düşük': 'deep-orange',
    'Çok Düşük': 'red'
  }
  return colors[level] || 'grey'
}

function getCriteriaLabel(key) {
  const labels = {
    emotionalRecognition: 'Duygusal Tanıma',
    perspectiveTaking: 'Perspektif Alma',
    culturalSensitivity: 'Kültürel Duyarlılık',
    empathicResponse: 'Empatik Tepki'
  }
  return labels[key] || key
}

function getRarityColor(rarity) {
  return RARITY_COLORS[rarity] || '#95a5a6'
}

function getRarityLabel(rarity) {
  return RARITY_LABELS[rarity] || 'Yaygın'
}

function getIconMeaning(icon) {
  const iconMeanings = {
    '🌱': 'Fide - Yeni başlangıç',
    '🌿': 'Dal - Büyüme',
    '🍀': 'Yonca - Şans',
    '🌸': 'Çiçek - Gelişim',
    '🌺': 'Orkide - Güzellik',
    '🌻': 'Ayçiçeği - Işık',
    '🌼': 'Papatya - Saflık',
    '🏵️': 'Rozet - Onur',
    '💐': 'Buket - Başarı',
    '🌹': 'Gül - Tutku',
    '🌲': 'Ağaç - Güç',
    '🌳': 'Yapraklı Ağaç - Olgunluk',
    '🌴': 'Palmiye - Zafer',
    '🎋': 'Bambu - Esneklik',
    '🎍': 'Süsleme - Kutlama',
    '🌾': 'Buğday - Bolluk',
    '☘️': 'Üçlü Yonca - Bereket',
    '🍃': 'Yapraklar - Barış',
    '🪴': 'Saksı - Yetiştirme',
    '🔥': 'Ateş - Tutku ve Kararlılık',
    '⚡': 'Şimşek - Hız ve Güç',
    '💫': 'Yıldız - Parlaklık',
    '✨': 'Işıltı - Sihir',
    '🌟': 'Parlak Yıldız - Mükemmellik',
    '⭐': 'Yıldız - Başarı',
    '🏆': 'Kupa - Şampiyonluk',
    '🎖️': 'Askeri Madalya - Kahramanlık',
    '🥇': 'Altın Madalya - Birinci',
    '🥈': 'Gümüş Madalya - İkinci',
    '🥉': 'Bronz Madalya - Üçüncü',
    '👑': 'Taç - Krallık',
    '💎': 'Elmas - Değer',
    '🎯': 'Hedef - Odaklanma',
    '🎪': 'Sirk - Eğlence',
    '🎨': 'Palet - Yaratıcılık',
    '🎭': 'Maskeler - Duygu',
    '🎬': 'Film - Hikaye',
    '📚': 'Kitaplar - Bilgi',
    '💡': 'Ampul - Fikir',
    '🌈': 'Gökkuşağı - Umut',
    '☀️': 'Güneş - Aydınlık',
    '🌙': 'Ay - Huzur',
    '🦋': 'Kelebek - Dönüşüm',
    '🕊️': 'Güvercin - Barış',
    '💝': 'Kalp - Sevgi',
    '💖': 'Parlak Kalp - Derin Sevgi'
  }
  return iconMeanings[icon] || 'Özel Rozet'
}

function getCriteriaColor(value) {
  if (value >= 80) return '#43e97b'
  if (value >= 60) return '#4facfe'
  if (value >= 40) return '#f093fb'
  return '#f5576c'
}

function goToExperience() {
  router.push('/empathy')
}

function confirmDelete(storyId) {
  storyToDelete.value = storyId
  deleteDialog.value = true
}

async function deleteStory() {
  if (!storyToDelete.value) return

  try {
    const db = window.$firebase?.db
    if (!db) {
      $q.notify({
        type: 'negative',
        message: 'Firebase bağlantısı bulunamadı',
        position: 'top'
      })
      return
    }

    await deleteDoc(doc(db, 'stories', storyToDelete.value))

    // Remove from local array
    myStories.value = myStories.value.filter(s => s.id !== storyToDelete.value)

    $q.notify({
      type: 'positive',
      message: 'Hikaye başarıyla silindi',
      position: 'top'
    })
  } catch (error) {
    console.error('Error deleting story:', error)
    $q.notify({
      type: 'negative',
      message: 'Hikaye silinirken hata oluştu',
      position: 'top'
    })
  } finally {
    storyToDelete.value = null
  }
}

// Sosyal Medya Paylaşım Fonksiyonları
function getStoryShareText(story) {
  const maxLength = 100
  const storyText = story.story.length > maxLength
    ? story.story.substring(0, maxLength) + '...'
    : story.story

  const empathyScore = story.analysis?.totalScore || 0
  return `🌟 Empati Hikayem (Skor: ${empathyScore}/100)\n\n"${storyText}"\n\n#EmpatiKöprüleri #Hikaye #Empati`
}

function getStoryUrl(story) {
  // Hikaye detay sayfası URL'i (gelecekte eklenebilir)
  return window.location.origin + '/#/stories/' + story.id
}

function shareOnTwitter(story) {
  const text = getStoryShareText(story)
  const url = getStoryUrl(story)
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  window.open(twitterUrl, '_blank', 'width=550,height=420')
}

function shareOnFacebook(story) {
  const url = getStoryUrl(story)
  const text = getStoryShareText(story)
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
  window.open(facebookUrl, '_blank', 'width=555,height=555')
}

function shareOnInstagram(story) {
  // Instagram doğrudan web paylaşımı desteklemiyor
  // Kullanıcıya metin kopyalama ve manuel paylaşım önerisi göster
  const text = getStoryShareText(story)

  navigator.clipboard.writeText(text).then(() => {
    $q.notify({
      type: 'info',
      message: 'Hikaye metni kopyalandı! Instagram uygulamasını açıp paylaşabilirsiniz.',
      caption: 'Instagram web üzerinden doğrudan paylaşım desteklemiyor',
      position: 'top',
      timeout: 4000,
      actions: [
        {
          label: 'Tamam',
          color: 'white'
        }
      ]
    })
  }).catch(err => {
    console.error('Kopyalama hatası:', err)
    $q.notify({
      type: 'negative',
      message: 'Metin kopyalanamadı',
      position: 'top'
    })
  })
}

function shareOnWhatsApp(story) {
  const text = getStoryShareText(story)
  const url = getStoryUrl(story)
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + url)}`
  window.open(whatsappUrl, '_blank')
}

function copyStoryLink(story) {
  const url = getStoryUrl(story)

  navigator.clipboard.writeText(url).then(() => {
    $q.notify({
      type: 'positive',
      message: 'Hikaye bağlantısı kopyalandı!',
      icon: 'content_copy',
      position: 'top'
    })
  }).catch(err => {
    console.error('Kopyalama hatası:', err)
    $q.notify({
      type: 'negative',
      message: 'Bağlantı kopyalanamadı',
      position: 'top'
    })
  })
}

</script>

<style scoped>
.my-stories-page {
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.page-header {
  animation: fadeIn 0.8s ease;
}

.page-header .text-h3 {
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
  font-weight: 900;
  color: #ffffff !important;
}

.page-header .text-body1 {
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.5);
  font-weight: 600;
  color: #ffffff !important;
}

.gradient-text {
  color: #667eea !important;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.achievement-title {
  color: #000000 !important;
  text-shadow: none;
}

.no-achievement-box {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 32px;
  border: 3px dashed rgba(102, 126, 234, 0.5);
}

.no-achievement-box .text-h6,
.no-achievement-box .text-body1 {
  color: #1a1a1a !important;
}

.stories-title {
  color: #ffffff !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
  animation: fadeIn 0.6s ease;
}

.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 48px rgba(102, 126, 234, 0.4);
  background: rgba(255, 255, 255, 0.98);
}

.glass-card .text-h5,
.glass-card .text-h6 {
  text-shadow: none;
  font-weight: 800;
  color: #000000 !important;
}

.glass-card .text-white {
  color: #1a1a1a !important;
  text-shadow: none;
  font-weight: 600;
}

.animated-card {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Achievements Section */
.achievements-section {
  animation: fadeIn 0.8s ease 0.2s both;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.achievement-item {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.achievement-item:hover {
  transform: translateY(-5px) scale(1.05);
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.achievement-icon-wrapper {
  position: relative;
  display: inline-block;
}

.achievement-icon {
  font-size: 56px;
  margin-bottom: 12px;
  animation: float 3s ease-in-out infinite;
  cursor: help;
  transition: all 0.3s ease;
}

.achievement-icon:hover {
  transform: scale(1.2) rotate(5deg);
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.achievement-name {
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 4px;
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  line-height: 1.3;
}

.achievement-desc {
  font-size: 11px;
  line-height: 1.4;
  opacity: 0.9;
  font-weight: 600;
  text-shadow: none;
  color: #424242 !important;
  margin-top: 4px;
}

/* Stats Cards */
.stats-section {
  animation: fadeIn 0.8s ease 0.4s both;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.98);
  transform: translateY(-3px);
}

.stat-card .text-h6,
.stat-card .text-caption {
  text-shadow: none;
  font-weight: 800;
  color: #000000 !important;
}

.story-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 16px;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.story-text {
  color: #1a1a1a !important;
  font-size: 14px;
  line-height: 1.6;
  text-shadow: none;
  font-weight: 600;
}

.analysis-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 16px;
  border-top: 3px solid rgba(102, 126, 234, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.analysis-section .text-h6 {
  text-shadow: none;
  font-weight: 800;
  color: #000000 !important;
}

.criteria-grid {
  display: grid;
  gap: 12px;
}

.criterion {
  background: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
}

.criterion .text-white {
  color: #1a1a1a !important;
  text-shadow: none;
  font-weight: 700;
}

.summary-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  border-left: 4px solid #667eea;
  border: 2px solid rgba(102, 126, 234, 0.5);
}

.summary-box .text-body2 {
  text-shadow: none;
  font-weight: 700;
  color: #1a1a1a !important;
}

.gradient-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
}

.gradient-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
}

@media (max-width: 768px) {
  .stories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
