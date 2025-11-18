<template>
  <q-page class="users-page">
    <div class="page-header">
      <div class="text-h4 text-weight-bold q-mb-sm">
        👥 Tüm Kullanıcılar
      </div>
      <div class="text-subtitle1">
        <span class="text-green text-weight-bold">{{ onlineCount }}</span> çevrimiçi •
        <span class="text-red text-weight-bold">{{ offlineCount }}</span> çevrimdışı •
        Toplam: <span class="text-weight-bold">{{ allUsers.length }}</span>
      </div>
    </div>

    <div class="users-container q-pa-md">
      <q-card class="users-card">
        <q-card-section>
          <q-input
            v-model="searchQuery"
            outlined
            dense
            placeholder="Kullanıcı ara..."
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon
                v-if="searchQuery"
                name="clear"
                @click="searchQuery = ''"
                class="cursor-pointer"
              />
            </template>
          </q-input>

          <div class="filter-chips q-mb-md">
            <q-chip
              :outlined="statusFilter !== 'all'"
              clickable
              @click="statusFilter = 'all'"
              color="primary"
              text-color="white"
            >
              Tümü ({{ allUsers.length }})
            </q-chip>
            <q-chip
              :outlined="statusFilter !== 'online'"
              clickable
              @click="statusFilter = 'online'"
              color="green"
              text-color="white"
            >
              🟢 Çevrimiçi ({{ onlineCount }})
            </q-chip>
            <q-chip
              :outlined="statusFilter !== 'offline'"
              clickable
              @click="statusFilter = 'offline'"
              color="red"
              text-color="white"
            >
              🔴 Çevrimdışı ({{ offlineCount }})
            </q-chip>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="users-list-section">
          <q-list separator>
            <q-item
              v-for="user in filteredUsers"
              :key="user.uid"
              class="user-item"
            >
              <q-item-section avatar>
                <q-avatar
                  size="56px"
                  :color="user.isOnline ? 'green-2' : 'red-2'"
                  :text-color="user.isOnline ? 'green-9' : 'red-9'"
                >
                  <div class="avatar-text">{{ getUserInitials(user) }}</div>
                  <q-badge
                    floating
                    rounded
                    :color="user.isOnline ? 'green' : 'red'"
                    class="status-indicator"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h6 text-weight-bold">
                  {{ user.displayName || user.email }}
                  <q-badge
                    v-if="user.role === 'admin'"
                    color="red"
                    label="YÖNETİCİ"
                    class="q-ml-sm"
                  />
                </q-item-label>
                <q-item-label
                  caption
                  class="text-subtitle2"
                >
                  {{ user.email }}
                </q-item-label>
                <q-item-label
                  caption
                  :class="user.isOnline ? 'text-green-8' : 'text-red-8'"
                >
                  <q-icon
                    :name="user.isOnline ? 'circle' : 'circle'"
                    size="xs"
                  />
                  {{ user.isOnline ? 'Çevrimiçi' : 'Çevrimdışı' }}
                  <span
                    v-if="user.lastSeen"
                    class="q-ml-sm text-grey-7"
                  >
                    • {{ formatLastSeen(user.lastSeen) }}
                  </span>
                </q-item-label>
                <q-item-label
                  caption
                  class="text-purple-8 q-mt-xs"
                >
                  <q-icon
                    name="emoji_events"
                    size="xs"
                  />
                  <span class="text-weight-bold">{{ user.badgeCount || 0 }}</span> rozet
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="row q-gutter-sm">
                  <q-btn
                    round
                    color="primary"
                    icon="chat"
                    size="md"
                    @click="openChat(user)"
                    :disable="user.uid === currentUser?.uid"
                  >
                    <q-tooltip>Mesaj Gönder</q-tooltip>
                  </q-btn>
                  <q-badge
                    v-if="unreadMessages[user.uid] > 0"
                    color="red"
                    :label="unreadMessages[user.uid]"
                    floating
                    class="unread-badge"
                  />
                </div>
              </q-item-section>
            </q-item>

            <q-item v-if="filteredUsers.length === 0">
              <q-item-section>
                <q-item-label class="text-center text-grey q-py-lg">
                  <q-icon
                    name="search_off"
                    size="48px"
                    class="q-mb-md"
                  />
                  <div>Kullanıcı bulunamadı</div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- Chat Dialog -->
    <ChatDialog
      v-model="showChat"
      :selected-user="selectedUser"
    />

    <!-- Loading -->
    <q-inner-loading :showing="loading">
      <q-spinner-orbit
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { collection, query, onSnapshot, where, getDocs, doc, getDoc } from 'firebase/firestore'
import ChatDialog from 'components/ChatDialog.vue'

const allUsers = ref([])
const currentUser = ref(null)
const showChat = ref(false)
const selectedUser = ref(null)
const searchQuery = ref('')
const statusFilter = ref('all')
const loading = ref(true)
const unreadMessages = ref({})
let unsubscribePresence = null
let unsubscribeMessages = null

onMounted(() => {
  currentUser.value = window.$user
  loadAllUsers()
  loadUnreadMessages()
})

onUnmounted(() => {
  if (unsubscribePresence) unsubscribePresence()
  if (unsubscribeMessages) unsubscribeMessages()
})

async function loadAllUsers() {
  const db = window.$firebase?.db
  if (!db) {
    loading.value = false
    return
  }

  try {
    // Önce tüm kullanıcıları al
    const usersSnapshot = await getDocs(collection(db, 'users'))
    const usersMap = new Map()

    usersSnapshot.forEach(doc => {
      const data = doc.data()
      usersMap.set(data.uid, {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        role: data.role || 'user', // admin veya user
        isOnline: false,
        lastSeen: null,
        badgeCount: 0
      })
    })

    // Tüm kullanıcıların rozet sayılarını al
    console.log('🏆 Rozet sayıları çekiliyor...')
    for (const [uid, user] of usersMap.entries()) {
      try {
        // userAchievements/{userId} document yapısı kullanılıyor
        const achievementDocRef = doc(db, 'userAchievements', uid)
        const achievementDoc = await getDoc(achievementDocRef)

        if (achievementDoc.exists()) {
          const data = achievementDoc.data()
          const achievements = data.achievements || []
          user.badgeCount = achievements.length
          console.log(`✅ ${user.email}: ${user.badgeCount} rozet`)

          if (achievements.length > 0) {
            achievements.slice(0, 2).forEach(a => {
              console.log(`   └─ ${a.icon} ${a.name}`)
            })
          }
        } else {
          user.badgeCount = 0
          console.log(`⚪ ${user.email}: Henüz rozet yok`)
        }
      } catch (error) {
        console.error(`❌ ${uid} için rozet sayısı alınamadı:`, error)
        user.badgeCount = 0
      }
    }
    console.log('🏆 Tüm rozet sayıları yüklendi!')

    // Presence bilgilerini dinle
    const presenceRef = collection(db, 'userPresence')
    unsubscribePresence = onSnapshot(presenceRef, (snapshot) => {
      console.log('👥 Presence snapshot alındı, belge sayısı:', snapshot.size)

      const now = Date.now()
      const ONLINE_THRESHOLD = 1 * 60 * 1000 // 1 dakika (daha dinamik)

      let onlineCount = 0
      snapshot.forEach(doc => {
        const data = doc.data()
        const lastSeen = data.lastSeen?.toMillis() || 0
        const isOnline = now - lastSeen < ONLINE_THRESHOLD

        if (isOnline) onlineCount++

        // Sadece users collection'ında olan kullanıcıları güncelle
        if (usersMap.has(data.uid)) {
          const user = usersMap.get(data.uid)
          user.isOnline = isOnline
          user.lastSeen = data.lastSeen
          // badgeCount'u koru!
        }
        // Presence'de var ama users'da yoksa EKLEME (silinmiş kullanıcı olabilir)
      })

      console.log('🟢 Çevrimiçi kullanıcı sayısı:', onlineCount)
      console.log('👤 Toplam kullanıcı sayısı (usersMap):', usersMap.size)
      console.log('🏆 Rozet sayıları:', Array.from(usersMap.values()).map(u => ({ uid: u.uid, badges: u.badgeCount })))

      allUsers.value = Array.from(usersMap.values())
        .filter(u => u.uid !== currentUser.value?.uid)
        .sort((a, b) => {
          // Önce adminler
          if (a.role === 'admin' && b.role !== 'admin') return -1
          if (a.role !== 'admin' && b.role === 'admin') return 1
          // Sonra online olanlar
          if (a.isOnline && !b.isOnline) return -1
          if (!a.isOnline && b.isOnline) return 1
          // Son olarak isme göre
          const nameA = a.displayName || a.email || ''
          const nameB = b.displayName || b.email || ''
          return nameA.localeCompare(nameB, 'tr')
        })

      loading.value = false
    })
  } catch (error) {
    console.error('Kullanıcılar yüklenirken hata:', error)
    loading.value = false
  }
}

function loadUnreadMessages() {
  const db = window.$firebase?.db
  if (!db || !currentUser.value) return

  const messagesRef = collection(db, 'messages')
  const q = query(
    messagesRef,
    where('toUid', '==', currentUser.value.uid),
    where('read', '==', false)
  )

  unsubscribeMessages = onSnapshot(q, (snapshot) => {
    const counts = {}
    snapshot.forEach((doc) => {
      const data = doc.data()
      counts[data.fromUid] = (counts[data.fromUid] || 0) + 1
    })
    unreadMessages.value = counts
  })
}

const onlineCount = computed(() => {
  return allUsers.value.filter(u => u.isOnline).length
})

const offlineCount = computed(() => {
  return allUsers.value.filter(u => !u.isOnline).length
})

const filteredUsers = computed(() => {
  let users = allUsers.value

  // Durum filtreleme
  if (statusFilter.value === 'online') {
    users = users.filter(u => u.isOnline)
  } else if (statusFilter.value === 'offline') {
    users = users.filter(u => !u.isOnline)
  }

  // Arama filtreleme
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    users = users.filter(u => {
      const name = (u.displayName || '').toLowerCase()
      const email = (u.email || '').toLowerCase()
      return name.includes(query) || email.includes(query)
    })
  }

  return users
})

function getUserInitials(user) {
  const name = user.displayName || user.email || ''
  return name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
}

function formatLastSeen(timestamp) {
  if (!timestamp) return ''

  try {
    const date = timestamp.toDate()
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Az önce'
    if (minutes < 60) return `${minutes} dakika önce`
    if (hours < 24) return `${hours} saat önce`
    if (days === 1) return 'Dün'
    if (days < 7) return `${days} gün önce`

    return date.toLocaleDateString('tr-TR')
  } catch {
    return ''
  }
}

function openChat(user) {
  selectedUser.value = user
  showChat.value = true
}
</script>

<style scoped>
.users-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.page-header {
  padding: 24px;
  text-align: center;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.users-container {
  max-width: 1200px;
  margin: 0 auto;
}

.users-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.users-list-section {
  max-height: calc(100vh - 320px);
  overflow-y: auto;
}

.user-item {
  padding: 16px;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 4px 8px;
}

.user-item:hover {
  background: rgba(102, 126, 234, 0.05);
  transform: translateX(4px);
}

.avatar-text {
  font-size: 20px;
  font-weight: bold;
}

.status-indicator {
  width: 14px;
  height: 14px;
  min-width: 14px;
  min-height: 14px;
  padding: 0;
  border: 2px solid white;
}

.filter-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.unread-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  z-index: 1;
}

/* Scrollbar styling */
.users-list-section::-webkit-scrollbar {
  width: 8px;
}

.users-list-section::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.users-list-section::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.users-list-section::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Responsive */
@media (max-width: 600px) {
  .page-header {
    padding: 16px;
  }

  .user-item {
    padding: 12px;
  }

  .avatar-text {
    font-size: 16px;
  }
}
</style>
