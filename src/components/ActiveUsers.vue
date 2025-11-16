<template>
  <q-card class="active-users-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">
        <q-icon name="people" class="q-mr-sm" />
        Aktif Kullanıcılar
        <q-badge color="green" :label="activeUsers.length" class="q-ml-sm" />
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="user-list">
      <q-list separator>
        <q-item
          v-for="user in activeUsers"
          :key="user.uid"
          clickable
          @click="openChat(user)"
          class="user-item"
        >
          <q-item-section avatar>
            <q-avatar color="grey-3" text-color="primary" size="48px">
              <div class="avatar-text">{{ getUserInitials(user) }}</div>
              <q-badge
                floating
                rounded
                :color="user.isOnline ? 'green' : 'grey'"
                class="online-indicator"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">
              {{ user.displayName || user.email }}
            </q-item-label>
            <q-item-label caption>
              <span :class="user.isOnline ? 'text-green' : 'text-grey'">
                {{ user.isOnline ? '🟢 Çevrimiçi' : '⚪ Çevrimdışı' }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-badge
              v-if="unreadMessages[user.uid] > 0"
              color="red"
              :label="unreadMessages[user.uid]"
              rounded
            />
          </q-item-section>
        </q-item>

        <q-item v-if="activeUsers.length === 0">
          <q-item-section>
            <q-item-label class="text-center text-grey">
              Şu anda aktif kullanıcı yok
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { collection, query, onSnapshot, where, orderBy } from 'firebase/firestore'

const emit = defineEmits(['open-chat'])

const activeUsers = ref([])
const unreadMessages = ref({})
let unsubscribeUsers = null
let unsubscribeMessages = null

onMounted(() => {
  loadActiveUsers()
  loadUnreadMessages()
})

onUnmounted(() => {
  if (unsubscribeUsers) unsubscribeUsers()
  if (unsubscribeMessages) unsubscribeMessages()
})

function loadActiveUsers() {
  const db = window.$firebase?.db
  const currentUser = window.$user

  if (!db || !currentUser) return

  const usersRef = collection(db, 'userPresence')
  const q = query(usersRef, orderBy('lastSeen', 'desc'))

  unsubscribeUsers = onSnapshot(q, (snapshot) => {
    const users = []
    const now = Date.now()
    const ONLINE_THRESHOLD = 5 * 60 * 1000 // 5 dakika

    snapshot.forEach((doc) => {
      const data = doc.data()
      if (data.uid !== currentUser.uid) {
        const lastSeen = data.lastSeen?.toMillis() || 0
        const isOnline = now - lastSeen < ONLINE_THRESHOLD

        users.push({
          uid: data.uid,
          displayName: data.displayName,
          email: data.email,
          lastSeen: data.lastSeen,
          isOnline
        })
      }
    })

    activeUsers.value = users
  })
}

function loadUnreadMessages() {
  const db = window.$firebase?.db
  const currentUser = window.$user

  if (!db || !currentUser) return

  const messagesRef = collection(db, 'messages')
  const q = query(
    messagesRef,
    where('toUid', '==', currentUser.uid),
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

function getUserInitials(user) {
  const name = user.displayName || user.email || ''
  return name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
}

function openChat(user) {
  emit('open-chat', user)
}
</script>

<style scoped>
.active-users-card {
  max-height: 600px;
  display: flex;
  flex-direction: column;
}

.user-list {
  overflow-y: auto;
  flex: 1;
}

.user-item {
  transition: background-color 0.2s;
}

.user-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.avatar-text {
  font-weight: bold;
  font-size: 18px;
}

.online-indicator {
  width: 12px;
  height: 12px;
  min-width: 12px;
  min-height: 12px;
  padding: 0;
}
</style>
