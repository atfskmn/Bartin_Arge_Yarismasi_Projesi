<template>
  <q-page class="admin-stories-page">
    <div class="page-header q-pa-md">
      <div class="text-h4 text-weight-bold text-white">
        🛡️ Tüm Hikayeler (Admin Panel)
      </div>
      <div class="text-subtitle1 text-white">
        Toplam {{ allStories.length }} hikaye
      </div>
    </div>

    <div class="stories-container q-pa-md">
      <q-card
        v-if="loading"
        class="loading-card"
      >
        <q-card-section class="text-center">
          <q-spinner-orbit
            size="50px"
            color="primary"
          />
          <div class="q-mt-md">Hikayeler yükleniyor...</div>
        </q-card-section>
      </q-card>

      <div
        v-else
        class="stories-grid"
      >
        <q-card
          v-for="story in allStories"
          :key="story.id"
          class="story-card"
        >
          <q-card-section>
            <div class="row items-center justify-between q-mb-sm">
              <div>
                <q-chip
                  color="purple"
                  text-color="white"
                  icon="person"
                  size="sm"
                >
                  {{ story.username || story.email || 'Anonim' }}
                </q-chip>
                <q-chip
                  color="blue"
                  text-color="white"
                  icon="calendar_today"
                  size="sm"
                >
                  {{ formatDate(story.createdAt) }}
                </q-chip>
              </div>
              <q-btn
                round
                flat
                dense
                icon="delete"
                color="negative"
                @click="confirmDelete(story.id, story.uid)"
              >
                <q-tooltip>Hikayeyi Sil</q-tooltip>
              </q-btn>
            </div>

            <div class="story-content q-mb-md">
              <q-scroll-area style="height: 120px;">
                {{ story.story }}
              </q-scroll-area>
            </div>

            <div
              v-if="story.location"
              class="q-mb-sm"
            >
              <q-chip
                color="green"
                text-color="white"
                icon="location_on"
                size="sm"
              >
                {{ story.location.name || `${story.location.latitude}, ${story.location.longitude}` }}
              </q-chip>
            </div>

            <div class="row items-center justify-between">
              <q-badge
                :color="getEmpathyColor(story.score)"
                :label="`Skor: ${story.score}/100`"
                class="text-h6 q-pa-sm"
              />
              <q-badge
                :color="getLevelColor(story.level)"
                :label="story.level"
                class="q-pa-sm"
              />
            </div>
          </q-card-section>
        </q-card>

        <div
          v-if="allStories.length === 0"
          class="text-center q-pa-xl"
        >
          <q-icon
            name="auto_stories"
            size="80px"
            color="grey-5"
          />
          <div class="text-h6 text-grey-7 q-mt-md">Henüz hikaye yok</div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <q-dialog v-model="deleteDialog">
      <q-card style="min-width: 350px">
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
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, getDocs, doc, getDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const allStories = ref([])
const loading = ref(true)
const deleteDialog = ref(false)
const storyToDelete = ref(null)
const storyOwner = ref(null)

onMounted(async () => {
  await checkAdminRole()
  await loadAllStories()
})

async function checkAdminRole() {
  const user = window.$user
  if (!user) {
    $q.notify({
      type: 'negative',
      message: 'Giriş yapmanız gerekiyor',
      position: 'top'
    })
    router.push('/login')
    return
  }

  const db = window.$firebase?.db
  if (!db) return

  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (!userDoc.exists() || userDoc.data().role !== 'admin') {
      $q.notify({
        type: 'negative',
        message: 'Bu sayfaya erişim yetkiniz yok',
        position: 'top'
      })
      router.push('/')
    }
  } catch (error) {
    console.error('Rol kontrolü hatası:', error)
    router.push('/')
  }
}

async function loadAllStories() {
  const db = window.$firebase?.db
  if (!db) {
    loading.value = false
    return
  }

  try {
    const storiesQuery = query(collection(db, 'stories'), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(storiesQuery)

    allStories.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    console.log(`📚 ${allStories.value.length} hikaye yüklendi`)
  } catch (error) {
    console.error('Hikayeler yüklenirken hata:', error)
    $q.notify({
      type: 'negative',
      message: 'Hikayeler yüklenirken hata oluştu',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

function confirmDelete(storyId, userId) {
  storyToDelete.value = storyId
  storyOwner.value = userId
  deleteDialog.value = true
}

async function deleteStory() {
  if (!storyToDelete.value) {
    console.warn('⚠️ Silinecek hikaye ID yok')
    return
  }

  const db = window.$firebase?.db
  if (!db) {
    console.error('❌ Firebase bağlantısı yok')
    return
  }

  console.log('🗑️ Hikaye siliniyor:', storyToDelete.value)

  try {
    // Hikayeyi sil
    console.log('📄 stories/' + storyToDelete.value + ' siliniyor...')
    await deleteDoc(doc(db, 'stories', storyToDelete.value))
    console.log('✅ Hikaye silindi')

    // Analizi sil (varsa)
    try {
      console.log('📊 analyses/' + storyToDelete.value + ' siliniyor...')
      await deleteDoc(doc(db, 'analyses', storyToDelete.value))
      console.log('✅ Analiz silindi')
    } catch (analysisErr) {
      console.log('ℹ️ Analiz bulunamadı veya silinemedi:', analysisErr.message)
    }

    // Local array'den kaldır
    const beforeLength = allStories.value.length
    allStories.value = allStories.value.filter(s => s.id !== storyToDelete.value)
    console.log(`📋 Local array güncellendi: ${beforeLength} -> ${allStories.value.length}`)

    $q.notify({
      type: 'positive',
      message: 'Hikaye başarıyla silindi',
      icon: 'check',
      position: 'top'
    })
  } catch (error) {
    console.error('❌ Hikaye silinirken hata:', error)
    console.error('Hata kodu:', error.code)
    console.error('Hata mesajı:', error.message)

    let errorMessage = 'Hikaye silinirken hata oluştu'

    if (error.code === 'permission-denied') {
      errorMessage = 'Yetkisiz işlem: Firestore güvenlik kuralları bu işlemi engelliyor'
    } else if (error.message) {
      errorMessage = error.message
    }

    $q.notify({
      type: 'negative',
      message: errorMessage,
      position: 'top',
      timeout: 4000
    })
  } finally {
    storyToDelete.value = null
    storyOwner.value = null
  }
}

function formatDate(timestamp) {
  if (!timestamp) return ''
  try {
    const date = timestamp.toDate()
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  } catch {
    return ''
  }
}

function getEmpathyColor(score) {
  if (score >= 80) return 'green'
  if (score >= 60) return 'light-green'
  if (score >= 40) return 'orange'
  return 'red'
}

function getLevelColor(level) {
  const colors = {
    'Çok Yüksek': 'purple',
    'Yüksek': 'blue',
    'Orta': 'orange',
    'Gelişiyor': 'grey'
  }
  return colors[level] || 'grey'
}
</script>

<style scoped>
.admin-stories-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.page-header {
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.stories-container {
  max-width: 1400px;
  margin: 0 auto;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.story-card {
  transition: all 0.3s ease;
}

.story-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.story-content {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
}

.loading-card {
  text-align: center;
  padding: 40px;
}

@media (max-width: 600px) {
  .stories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
