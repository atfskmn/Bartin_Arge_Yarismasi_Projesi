<template>
  <q-page class="flex flex-center">
    <q-card
      class="q-pa-lg"
      style="max-width: 500px; width: 100%"
    >
      <q-card-section>
        <div class="text-h5 text-center q-mb-md">🔧 Admin Setup</div>
        <div class="text-body2 text-grey-7 text-center q-mb-lg">
          Bu sayfa sadece admin kullanıcısı oluşturmak için kullanılır.
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn
          color="red"
          label="a@gmai.com için Admin Rolü Ekle"
          icon="admin_panel_settings"
          class="full-width"
          size="lg"
          @click="createAdmin"
          :loading="loading"
          :disable="success"
        />

        <div
          v-if="message"
          class="q-mt-md q-pa-md rounded-borders"
          :class="success ? 'bg-green-1' : 'bg-red-1'"
        >
          <div :class="success ? 'text-green-9' : 'text-red-9'">
            {{ message }}
          </div>
        </div>

        <div
          v-if="success"
          class="q-mt-lg text-center"
        >
          <q-btn
            color="primary"
            label="Ana Sayfaya Git"
            icon="home"
            to="/"
            unelevated
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { doc, setDoc } from 'firebase/firestore'

const loading = ref(false)
const success = ref(false)
const message = ref('')

async function createAdmin() {
  loading.value = true
  message.value = ''

  const db = window.$firebase?.db
  if (!db) {
    message.value = '❌ Firebase bağlantısı yok'
    loading.value = false
    return
  }

  try {
    const adminUid = 'ceihn2I5axW9XJ5c1bTexwTFPr83'
    const userDocRef = doc(db, 'users', adminUid)

    console.log('🔧 Admin kullanıcısı oluşturuluyor...')

    await setDoc(userDocRef, {
      uid: adminUid,
      email: 'a@gmai.com',
      displayName: 'Admin',
      role: 'admin',
      createdAt: new Date().toISOString()
    }, { merge: true }) // merge: true ile mevcut data'yı korur, sadece role ekler

    console.log('✅ Admin kullanıcısı başarıyla oluşturuldu!')

    success.value = true
    message.value = '✅ Admin rolü başarıyla eklendi! Artık a@gmai.com hesabı admin yetkilerine sahip.'

  } catch (error) {
    console.error('❌ Hata:', error)
    message.value = `❌ Hata oluştu: ${error.message}`
    success.value = false
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 8px;
}
</style>
