<template>
  <q-card class="q-mb-sm cursor-pointer story-card" @click="$emit('click')">
    <q-card-section>
      <div class="row items-center justify-between">
        <div class="col">
          <div class="text-subtitle1 font-medium">
            <q-icon name="person" size="xs" class="q-mr-xs" />
            {{ story.username }}
          </div>
          <div class="text-caption text-grey">
            <q-icon name="schedule" size="xs" class="q-mr-xs" />
            {{ formattedDate }}
          </div>
          <div v-if="story.location" class="text-caption text-green q-mt-xs">
            <q-icon name="location_on" size="xs" class="q-mr-xs" />
            {{ story.location.name || `${story.location.lat.toFixed(4)}, ${story.location.lng.toFixed(4)}` }}
          </div>
        </div>
        <div class="col-auto">
          <q-chip color="purple" text-color="white" icon="psychology">
            {{ story.score }}/100
          </q-chip>
          <q-badge v-if="story.level" :color="getLevelColor(story.level)" :label="story.level" class="q-ml-xs" />
        </div>
      </div>
      <div class="q-mt-sm text-body2 story-preview">{{ storyPreview }}</div>
      <div class="text-caption text-primary q-mt-sm">
        <q-icon name="open_in_new" size="xs" />
        Detayları görmek için tıklayın
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pt-sm q-pb-sm">
      <div class="row q-gutter-xs">
        <q-chip
          v-for="(value, key) in story.criteria"
          :key="key"
          size="sm"
          dense
          :color="getCriteriaColor(value, key)"
          text-color="white"
        >
          {{ getCriteriaLabel(key) }}: {{ value }}
        </q-chip>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ story: { type: Object, required: true } })
defineEmits(['click'])

const formattedDate = computed(() => {
  try {
    if (!props.story.createdAt) return ''
    const v = props.story.createdAt
    if (v.toDate) return v.toDate().toLocaleString('tr-TR')
    return new Date(v).toLocaleString('tr-TR')
  } catch { return '' }
})

const storyPreview = computed(() => {
  const text = props.story.story || ''
  return text.length > 150 ? text.substring(0, 150) + '...' : text
})

function getLevelColor(level) {
  const colors = {
    'Çok Yüksek': 'green',
    'Yüksek': 'purple',
    'Orta': 'orange',
    'Gelişiyor': 'grey'
  }
  return colors[level] || 'grey'
}

function getCriteriaColor(value, key) {
  const max = key === 'emotionalDepth' || key === 'empathyExpressions' ? 25 :
              key === 'storytellingQuality' ? 20 : 15
  const percentage = (value / max) * 100
  if (percentage >= 80) return 'green'
  if (percentage >= 60) return 'purple'
  if (percentage >= 40) return 'orange'
  return 'grey'
}

function getCriteriaLabel(key) {
  const labels = {
    emotionalDepth: 'Duygu',
    empathyExpressions: 'Empati',
    storytellingQuality: 'Hikaye',
    culturalAwareness: 'Kültür',
    personalConnection: 'Kişisel'
  }
  return labels[key] || key
}
</script>

<style scoped>
.story-card {
  transition: all 0.3s ease;
}

.story-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.story-preview {
  line-height: 1.6;
  color: #424242;
}
</style>
