<template>
  <q-banner v-if="!isOnline" class="bg-red text-white" dense>
    <template v-slot:avatar>
      <q-icon name="wifi_off" color="white" />
    </template>
    <strong>İnternet bağlantısı yok!</strong> Uygulama offline modda çalışıyor. Bazı özellikler kullanılamayabilir.
  </q-banner>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOnline = ref(navigator.onLine)

function updateOnlineStatus() {
  isOnline.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})
</script>
