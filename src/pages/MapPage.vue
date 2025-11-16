<template>
  <q-page class="map-page">
    <div class="page-header">
      <div class="text-h4 text-weight-bold text-white q-mb-sm">
        🗺️ Hikaye Haritası
      </div>
      <div class="text-subtitle1 text-white-7">
        Dünya üzerindeki hikayeler - {{ stories.length }} konum
      </div>
    </div>

    <div class="map-container">
      <div id="map" ref="mapContainer"></div>
    </div>

    <!-- Hikaye Detay Dialog -->
    <q-dialog v-model="showStoryDialog" :maximized="$q.screen.lt.sm">
      <q-card style="min-width: 500px; max-width: 700px;">
        <q-card-section class="bg-purple text-white">
          <div class="row items-center">
            <div class="col">
              <div class="text-h6 text-weight-bold">
                <q-icon name="location_on" class="q-mr-sm" />
                {{ selectedStory?.location?.name || 'Bilinmeyen Konum' }}
              </div>
              <div class="text-caption">
                {{ selectedStory?.username }} • {{ formatDate(selectedStory?.createdAt) }}
              </div>
            </div>
            <div class="col-auto">
              <q-btn flat round dense icon="close" v-close-popup color="white" />
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-h6 text-weight-bold q-mb-sm">Hikaye</div>
          <div class="text-body1 story-text q-mb-md" style="white-space: pre-wrap">
            {{ selectedStory?.story }}
          </div>

          <q-separator class="q-my-md" />

          <div class="row items-center q-gutter-md">
            <div class="col">
              <div class="text-caption text-grey-7">Empati Skoru</div>
              <div class="text-h4 text-purple text-weight-bold">
                {{ selectedStory?.score }}/100
              </div>
              <div class="text-subtitle2 text-weight-medium">
                {{ selectedStory?.level }}
              </div>
            </div>
            <div class="col-auto">
              <q-circular-progress
                :value="selectedStory?.score || 0"
                :max="100"
                size="80px"
                :thickness="0.15"
                color="purple"
                track-color="grey-3"
                class="text-purple"
              >
                <div class="text-subtitle1 text-weight-bold">{{ selectedStory?.score }}</div>
              </q-circular-progress>
            </div>
          </div>

          <q-separator class="q-my-md" />

          <div class="text-caption text-grey-7 q-mb-xs">Konum Detayları</div>
          <div class="row q-gutter-sm">
            <q-chip icon="location_on" color="green" text-color="white">
              {{ selectedStory?.location?.name }}
            </q-chip>
            <q-chip icon="map" color="blue" text-color="white" dense>
              {{ selectedStory?.location?.lat?.toFixed(4) }}, {{ selectedStory?.location?.lng?.toFixed(4) }}
            </q-chip>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Yükleme Göstergesi -->
    <q-inner-loading :showing="loading">
      <q-spinner-orbit size="50px" color="purple" />
      <div class="text-white q-mt-md">Hikayeler yükleniyor...</div>
    </q-inner-loading>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const $q = useQuasar()
const mapContainer = ref(null)
const map = ref(null)
const markers = ref([])
const stories = ref([])
const selectedStory = ref(null)
const showStoryDialog = ref(false)
const loading = ref(true)
let unsubscribe = null

onMounted(() => {
  initMap()
  loadStories()
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
  if (map.value) {
    map.value.remove()
  }
})

function initMap() {
  // Harita oluştur - Türkiye merkezli
  map.value = L.map('map').setView([39.0, 35.0], 6)

  // OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map.value)

  // Haritayı ayarla
  setTimeout(() => {
    map.value.invalidateSize()
  }, 100)
}

function loadStories() {
  const db = window.$firebase?.db
  if (!db) {
    loading.value = false
    $q.notify({
      type: 'negative',
      message: 'Veritabanı bağlantısı kurulamadı',
      icon: 'error'
    })
    return
  }

  // Sadece konum bilgisi olan hikayeleri getir
  const storiesRef = collection(db, 'stories')
  const q = query(storiesRef, where('location', '!=', null))

  unsubscribe = onSnapshot(q, (snapshot) => {
    stories.value = []

    // Eski markerları temizle
    markers.value.forEach(marker => marker.remove())
    markers.value = []

    snapshot.forEach((doc) => {
      const story = { id: doc.id, ...doc.data() }
      stories.value.push(story)
      addMarker(story)
    })

    loading.value = false

    if (stories.value.length === 0) {
      $q.notify({
        type: 'info',
        message: 'Henüz konum bilgisi olan hikaye yok',
        icon: 'info'
      })
    } else {
      // Haritayı hikayelere göre ayarla
      fitMapToMarkers()
    }
  }, (error) => {
    loading.value = false
    console.error('Hikayeler yüklenirken hata:', error)
    $q.notify({
      type: 'negative',
      message: 'Hikayeler yüklenemedi',
      icon: 'error'
    })
  })
}

function addMarker(story) {
  if (!story.location || !story.location.lat || !story.location.lng) return

  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `<div class="marker-pin pulse">
             <span class="marker-icon">📖</span>
             <span class="marker-badge">${story.score}</span>
           </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  })

  const marker = L.marker([story.location.lat, story.location.lng], {
    icon: customIcon
  }).addTo(map.value)

  // Popup içeriği
  const popupContent = `
    <div class="map-popup">
      <div class="popup-header">
        <strong>${story.username}</strong>
        <span class="popup-score">⭐ ${story.score}/100</span>
      </div>
      <div class="popup-location">📍 ${story.location.name || 'Bilinmeyen'}</div>
      <div class="popup-preview">${story.story.substring(0, 80)}...</div>
      <div class="popup-footer">
        <button class="popup-btn" onclick="window.openStoryFromMap('${story.id}')">
          Detayları Gör
        </button>
      </div>
    </div>
  `

  marker.bindPopup(popupContent, {
    maxWidth: 300,
    className: 'custom-popup'
  })

  markers.value.push(marker)
}

function fitMapToMarkers() {
  if (markers.value.length === 0) return

  const group = L.featureGroup(markers.value)
  map.value.fitBounds(group.getBounds().pad(0.1))
}

function openStoryDetail(storyId) {
  const story = stories.value.find(s => s.id === storyId)
  if (story) {
    selectedStory.value = story
    showStoryDialog.value = true
  }
}

function formatDate(timestamp) {
  try {
    if (!timestamp) return ''
    const v = timestamp
    if (v.toDate) return v.toDate().toLocaleString('tr-TR')
    return new Date(v).toLocaleString('tr-TR')
  } catch {
    return ''
  }
}

// Global fonksiyon - popup'tan çağrılmak için
if (typeof window !== 'undefined') {
  window.openStoryFromMap = (storyId) => {
    openStoryDetail(storyId)
  }
}
</script>

<style scoped>
.map-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.page-header {
  padding: 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.map-container {
  flex: 1;
  position: relative;
  margin: 10px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

#map {
  width: 100%;
  height: 100%;
  min-height: 500px;
}

.story-text {
  line-height: 1.8;
  color: #333;
}

/* Custom Marker Styles */
:deep(.custom-marker) {
  background: transparent;
  border: none;
}

:deep(.marker-pin) {
  position: relative;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

:deep(.marker-pin:hover) {
  transform: rotate(-45deg) scale(1.1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.7);
}

:deep(.marker-pin.pulse) {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
  }
  50% {
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.8);
  }
}

:deep(.marker-icon) {
  font-size: 20px;
  transform: rotate(45deg);
  display: block;
}

:deep(.marker-badge) {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6b6b;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  transform: rotate(45deg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Custom Popup Styles */
:deep(.custom-popup .leaflet-popup-content-wrapper) {
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  padding: 0;
}

:deep(.custom-popup .leaflet-popup-content) {
  margin: 0;
  min-width: 250px;
}

:deep(.map-popup) {
  padding: 16px;
}

:deep(.popup-header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 16px;
}

:deep(.popup-score) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

:deep(.popup-location) {
  color: #22c55e;
  font-size: 13px;
  margin-bottom: 8px;
}

:deep(.popup-preview) {
  color: #666;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 12px;
}

:deep(.popup-footer) {
  text-align: center;
}

:deep(.popup-btn) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
}

:deep(.popup-btn:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Responsive */
@media (max-width: 600px) {
  .page-header {
    padding: 15px;
  }

  .map-container {
    margin: 5px;
  }

  #map {
    min-height: 400px;
  }
}
</style>
