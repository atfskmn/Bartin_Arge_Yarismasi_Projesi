<template>
  <q-dialog
    v-model="isOpen"
    @hide="onClose"
  >
    <q-card
      style="min-width: 400px; max-width: 600px; height: 600px;"
      class="chat-card"
    >
      <q-card-section class="row items-center q-pb-none bg-primary text-white">
        <div class="col">
          <div class="text-h6">
            <q-avatar
              size="32px"
              color="white"
              text-color="primary"
              class="q-mr-sm"
            >
              <div style="font-size: 14px; font-weight: bold;">{{ getUserInitials() }}</div>
              <q-badge
                floating
                rounded
                :color="selectedUser?.isOnline ? 'green' : 'grey'"
                style="width: 10px; height: 10px;"
              />
            </q-avatar>
            {{ selectedUser?.displayName || selectedUser?.email }}
          </div>
          <div class="text-caption">
            {{ selectedUser?.isOnline ? '🟢 Çevrimiçi' : '⚪ Çevrimdışı' }}
          </div>
        </div>
        <q-btn
          flat
          round
          dense
          icon="close"
          v-close-popup
        />
      </q-card-section>

      <q-separator />

      <q-card-section
        class="messages-container q-pa-md"
        ref="messagesContainer"
      >
        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="['message-wrapper', msg.fromUid === currentUser?.uid ? 'sent' : 'received']"
        >
          <div class="message-bubble">
            <div class="message-text">{{ msg.text }}</div>
            <div class="message-time">{{ formatTime(msg.createdAt) }}</div>
          </div>
        </div>
        <div
          v-if="messages.length === 0"
          class="text-center text-grey q-mt-xl q-mb-xl"
        >
          <q-icon
            name="chat_bubble_outline"
            size="48px"
            color="grey-5"
            class="q-mb-sm"
          />
          <div class="text-body2">Henüz mesaj yok</div>
          <div class="text-caption">İlk mesajı gönderin!</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-md">
        <div class="row q-gutter-sm">
          <q-input
            v-model="newMessage"
            outlined
            dense
            placeholder="Mesajınızı yazın..."
            class="col"
            @keyup.enter="sendMessage"
            autofocus
          >
            <template v-slot:append>
              <q-icon
                name="mood"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <q-btn
            round
            color="primary"
            icon="send"
            @click="sendMessage"
            :disable="!newMessage.trim() || isSending"
            :loading="isSending"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'

const props = defineProps({
  modelValue: Boolean,
  selectedUser: Object
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const currentUser = ref(window.$user)
const messages = ref([])
const newMessage = ref('')
const messagesContainer = ref(null)
const isSending = ref(false)
let unsubscribeMessages = null

watch(() => props.selectedUser, (newUser) => {
  if (newUser) {
    loadMessages()
    markMessagesAsRead()
  }
}, { immediate: true })

watch(messages, () => {
  nextTick(() => {
    scrollToBottom()
  })
})

onUnmounted(() => {
  if (unsubscribeMessages) unsubscribeMessages()
})

function loadMessages() {
  if (unsubscribeMessages) unsubscribeMessages()

  const db = window.$firebase?.db
  if (!db || !currentUser.value || !props.selectedUser) {
    console.log('❌ LoadMessages: db, currentUser veya selectedUser yok', {
      db: !!db,
      currentUser: !!currentUser.value,
      selectedUser: !!props.selectedUser
    })
    return
  }

  console.log('✅ LoadMessages başlatılıyor:', {
    currentUserUid: currentUser.value.uid,
    selectedUserUid: props.selectedUser.uid
  })

  const messagesRef = collection(db, 'messages')
  const allMessages = new Map()
  let unsub1 = null
  let unsub2 = null

  // Cleanup fonksiyonu
  unsubscribeMessages = () => {
    if (unsub1) unsub1()
    if (unsub2) unsub2()
  }

  function updateMessagesList() {
    const msgs = Array.from(allMessages.values())
      .sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0
        return a.createdAt.toMillis() - b.createdAt.toMillis()
      })

    console.log('✅ Toplam mesaj sayısı:', msgs.length)
    messages.value = msgs
    nextTick(() => scrollToBottom())
  }

  // Gönderilen mesajları dinle (fromUid == currentUser)
  const q1 = query(
    messagesRef,
    where('fromUid', '==', currentUser.value.uid)
  )

  unsub1 = onSnapshot(q1, (snapshot) => {
    console.log('📨 Gönderilen mesajlar snapshot:', snapshot.size)

    snapshot.forEach((doc) => {
      const data = doc.data()
      // Sadece selectedUser ile olan mesajları ekle
      if (data.toUid === props.selectedUser.uid) {
        allMessages.set(doc.id, { id: doc.id, ...data })
      }
    })

    updateMessagesList()
  }, (error) => {
    console.error('❌ Gönderilen mesajlar hatası:', error)
    console.error('Hata detayı:', error.message, error.code)
  })

  // Alınan mesajları dinle (toUid == currentUser)
  const q2 = query(
    messagesRef,
    where('toUid', '==', currentUser.value.uid)
  )

  unsub2 = onSnapshot(q2, (snapshot) => {
    console.log('📨 Alınan mesajlar snapshot:', snapshot.size)

    snapshot.forEach((doc) => {
      const data = doc.data()
      // Sadece selectedUser'dan gelen mesajları ekle
      if (data.fromUid === props.selectedUser.uid) {
        allMessages.set(doc.id, { id: doc.id, ...data })
      }
    })

    updateMessagesList()
  }, (error) => {
    console.error('❌ Alınan mesajlar hatası:', error)
    console.error('Hata detayı:', error.message, error.code)
  })
}

async function markMessagesAsRead() {
  const db = window.$firebase?.db
  if (!db || !currentUser.value || !props.selectedUser) return

  try {
    const unreadMessages = messages.value.filter(
      msg => msg.toUid === currentUser.value.uid && !msg.read
    )

    for (const msg of unreadMessages) {
      const msgRef = doc(db, 'messages', msg.id)
      await updateDoc(msgRef, { read: true })
    }
  } catch (error) {
    console.error('Mesajları okundu olarak işaretleme hatası:', error)
  }
}

async function sendMessage() {
  if (!newMessage.value.trim() || isSending.value) return

  const db = window.$firebase?.db
  if (!db || !currentUser.value || !props.selectedUser) {
    console.error('❌ SendMessage: db, currentUser veya selectedUser yok')
    return
  }

  isSending.value = true

  const messageData = {
    fromUid: currentUser.value.uid,
    fromName: currentUser.value.displayName || currentUser.value.email,
    toUid: props.selectedUser.uid,
    toName: props.selectedUser.displayName || props.selectedUser.email,
    text: newMessage.value.trim(),
    read: false,
    createdAt: serverTimestamp()
  }

  console.log('📤 Mesaj gönderiliyor:', messageData)

  try {
    const docRef = await addDoc(collection(db, 'messages'), messageData)
    console.log('✅ Mesaj başarıyla gönderildi, ID:', docRef.id)

    newMessage.value = ''

    // Mesaj gönderildikten sonra scroll down
    nextTick(() => scrollToBottom())
  } catch (error) {
    console.error('❌ Mesaj gönderme hatası:', error)
    console.error('Hata detayı:', error.message, error.code)

    // Kullanıcıya hata bildirimi göster
    window.$q?.notify({
      type: 'negative',
      message: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
      position: 'top'
    })
  } finally {
    isSending.value = false
  }
}

function getUserInitials() {
  const name = props.selectedUser?.displayName || props.selectedUser?.email || ''
  return name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
}

function formatTime(timestamp) {
  if (!timestamp) return ''
  const date = timestamp.toDate()
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

function onClose() {
  markMessagesAsRead()
}
</script>

<style scoped>
.chat-card {
  display: flex;
  flex-direction: column;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-wrapper {
  display: flex;
  width: 100%;
}

.message-wrapper.sent {
  justify-content: flex-end;
}

.message-wrapper.received {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 18px;
  word-wrap: break-word;
}

.message-wrapper.sent .message-bubble {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-wrapper.received .message-bubble {
  background: white;
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-text {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 4px;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  text-align: right;
}
</style>
