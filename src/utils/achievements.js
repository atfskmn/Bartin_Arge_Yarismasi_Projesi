// Empati Rozetleri ve Başarım Sistemi

export const ACHIEVEMENTS = {
  // Her hikaye için rozet (1-20 arası)
  FIRST_STORY: {
    id: 'first_story',
    name: '🌱 İlk Adım',
    description: '1. hikayenizi paylaştınız!',
    icon: '🌱',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 1,
    rarity: 'common',
  },

  SECOND_STORY: {
    id: 'second_story',
    name: '🌿 İkinci Adım',
    description: '2. hikayenizi paylaştınız!',
    icon: '🌿',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 2,
    rarity: 'common',
  },

  THIRD_STORY: {
    id: 'third_story',
    name: '🍀 Üçüncü Adım',
    description: '3. hikayenizi paylaştınız!',
    icon: '🍀',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 3,
    rarity: 'common',
  },

  FOURTH_STORY: {
    id: 'fourth_story',
    name: '🌸 Dördüncü Adım',
    description: '4. hikayenizi paylaştınız!',
    icon: '🌸',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 4,
    rarity: 'common',
  },

  FIFTH_STORY: {
    id: 'fifth_story',
    name: '🌺 Beşinci Adım',
    description: '5. hikayenizi paylaştınız!',
    icon: '🌺',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 5,
    rarity: 'common',
  },

  SIXTH_STORY: {
    id: 'sixth_story',
    name: '🌻 Altıncı Adım',
    description: '6. hikayenizi paylaştınız!',
    icon: '🌻',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 6,
    rarity: 'uncommon',
  },

  SEVENTH_STORY: {
    id: 'seventh_story',
    name: '🌼 Yedinci Adım',
    description: '7. hikayenizi paylaştınız!',
    icon: '🌼',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 7,
    rarity: 'uncommon',
  },

  EIGHTH_STORY: {
    id: 'eighth_story',
    name: '🏵️ Sekizinci Adım',
    description: '8. hikayenizi paylaştınız!',
    icon: '🏵️',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 8,
    rarity: 'uncommon',
  },

  NINTH_STORY: {
    id: 'ninth_story',
    name: '💐 Dokuzuncu Adım',
    description: '9. hikayenizi paylaştınız!',
    icon: '💐',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 9,
    rarity: 'uncommon',
  },

  TENTH_STORY: {
    id: 'tenth_story',
    name: '🌹 Onuncu Adım',
    description: '10. hikayenizi paylaştınız!',
    icon: '🌹',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 10,
    rarity: 'rare',
  },

  ELEVENTH_STORY: {
    id: 'eleventh_story',
    name: '🌷 On Birinci Adım',
    description: '11. hikayenizi paylaştınız!',
    icon: '🌷',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 11,
    rarity: 'rare',
  },

  TWELFTH_STORY: {
    id: 'twelfth_story',
    name: '🪻 On İkinci Adım',
    description: '12. hikayenizi paylaştınız!',
    icon: '🪻',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 12,
    rarity: 'rare',
  },

  THIRTEENTH_STORY: {
    id: 'thirteenth_story',
    name: '🌾 On Üçüncü Adım',
    description: '13. hikayenizi paylaştınız!',
    icon: '🌾',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 13,
    rarity: 'rare',
  },

  FOURTEENTH_STORY: {
    id: 'fourteenth_story',
    name: '🪴 On Dördüncü Adım',
    description: '14. hikayenizi paylaştınız!',
    icon: '🪴',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 14,
    rarity: 'epic',
  },

  FIFTEENTH_STORY: {
    id: 'fifteenth_story',
    name: '🎋 On Beşinci Adım',
    description: '15. hikayenizi paylaştınız!',
    icon: '�',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 15,
    rarity: 'epic',
  },

  SIXTEENTH_STORY: {
    id: 'sixteenth_story',
    name: '🎍 On Altıncı Adım',
    description: '16. hikayenizi paylaştınız!',
    icon: '🎍',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 16,
    rarity: 'epic',
  },

  SEVENTEENTH_STORY: {
    id: 'seventeenth_story',
    name: '🏆 17 Hikaye Ustası!',
    description: '17. hikayenizi paylaştınız! Muhteşemsiniz!',
    icon: '🏆',
    category: 'stories',
    condition: (stats) => stats.totalStories >= 17,
    rarity: 'legendary',
  },

  // Eski rozetler
  STORY_WRITER: {
    id: 'story_writer',
    name: 'Hikaye Anlatıcı',
    description: '3 hikaye paylaştınız',
    icon: '📖',
    category: 'beginner',
    condition: (stats) => stats.totalStories >= 3,
    rarity: 'common',
  },

  STORY_MASTER: {
    id: 'story_master',
    name: 'Hikaye Ustası',
    description: '10 hikaye paylaştınız',
    icon: '📚',
    category: 'advanced',
    condition: (stats) => stats.totalStories >= 10,
    rarity: 'rare',
  },

  // Empati Seviyeleri
  EMPATHY_AWAKENING: {
    id: 'empathy_awakening',
    name: 'Empati Uyanışı',
    description: 'İlk "Yüksek" empati seviyenize ulaştınız',
    icon: '💫',
    category: 'empathy',
    condition: (stats) => stats.highEmpathyCount >= 1,
    rarity: 'uncommon',
  },

  EMPATHY_EXPERT: {
    id: 'empathy_expert',
    name: 'Empati Uzmanı',
    description: '5 hikayede "Yüksek" empati seviyesi',
    icon: '🌟',
    category: 'empathy',
    condition: (stats) => stats.highEmpathyCount >= 5,
    rarity: 'rare',
  },

  EMPATHY_MASTER: {
    id: 'empathy_master',
    name: 'Empati Ustası',
    description: '10 hikayede "Çok Yüksek" empati seviyesi',
    icon: '⭐',
    category: 'empathy',
    condition: (stats) => stats.veryHighEmpathyCount >= 10,
    rarity: 'epic',
  },

  // Kültürel Duyarlılık
  CULTURE_BRIDGE: {
    id: 'culture_bridge',
    name: 'Kültür Köprüsü',
    description: 'Kültürel duyarlılık ortalamanız %60 üzeri',
    icon: '🌍',
    category: 'cultural',
    condition: (stats) => stats.avgCulturalSensitivity >= 60,
    rarity: 'rare',
  },

  WORLD_CITIZEN: {
    id: 'world_citizen',
    name: 'Dünya Vatandaşı',
    description: 'Tüm empati kriterlerinde %60+ ortalama',
    icon: '🌏',
    category: 'cultural',
    condition: (stats) => {
      return (
        stats.avgEmotionalRecognition >= 60 &&
        stats.avgPerspectiveTaking >= 60 &&
        stats.avgCulturalSensitivity >= 60 &&
        stats.avgEmpathicResponse >= 60
      )
    },
    rarity: 'epic',
  },

  // Karakter ve Kelime
  WORD_SMITH: {
    id: 'word_smith',
    name: 'Kelime Ustası',
    description: 'Bir hikayede 200+ kelime',
    icon: '✍️',
    category: 'writing',
    condition: (stats) => stats.maxWords >= 200,
    rarity: 'uncommon',
  },

  STORYTELLER: {
    id: 'storyteller',
    name: 'Hikaye Anlatıcısı',
    description: 'Toplam 3,000+ kelime yazdınız',
    icon: '📝',
    category: 'writing',
    condition: (stats) => stats.totalWords >= 3000,
    rarity: 'rare',
  },

  // Tutarlılık
  CONSISTENT_WRITER: {
    id: 'consistent_writer',
    name: 'Kararlı Yazar',
    description: '3 gün üst üste hikaye paylaştınız',
    icon: '🔥',
    category: 'consistency',
    condition: (stats) => stats.consecutiveDays >= 3,
    rarity: 'rare',
  },

  DEDICATION: {
    id: 'dedication',
    name: 'Adanmışlık',
    description: '7 gün üst üste hikaye paylaştınız',
    icon: '💎',
    category: 'consistency',
    condition: (stats) => stats.consecutiveDays >= 7,
    rarity: 'legendary',
  },

  // Topluluk
  COMMUNITY_MEMBER: {
    id: 'community_member',
    name: 'Topluluk Üyesi',
    description: 'Platformda 7 gün geçirdiniz',
    icon: '👥',
    category: 'community',
    condition: (stats) => stats.memberDays >= 7,
    rarity: 'uncommon',
  },

  // Özel Başarımlar
  PERFECT_STORY: {
    id: 'perfect_story',
    name: 'Mükemmel Hikaye',
    description: 'Tüm kriterlerde %90+ alan bir hikaye',
    icon: '💯',
    category: 'special',
    condition: (stats) => stats.hasPerfectStory,
    rarity: 'epic',
  },

  EMOTIONAL_DEPTH: {
    id: 'emotional_depth',
    name: 'Duygusal Derinlik',
    description: 'Duygusal tanıma ortalamanız %85 üzeri',
    icon: '❤️',
    category: 'special',
    condition: (stats) => stats.avgEmotionalRecognition >= 85,
    rarity: 'rare',
  },

  PERSPECTIVE_GENIUS: {
    id: 'perspective_genius',
    name: 'Perspektif Dehası',
    description: 'Perspektif alma ortalamanız %85 üzeri',
    icon: '🎭',
    category: 'special',
    condition: (stats) => stats.avgPerspectiveTaking >= 85,
    rarity: 'rare',
  },

  EMPATHIC_SOUL: {
    id: 'empathic_soul',
    name: 'Empatik Ruh',
    description: 'Empatik tepki ortalamanız %85 üzeri',
    icon: '🤝',
    category: 'special',
    condition: (stats) => stats.avgEmpathicResponse >= 85,
    rarity: 'rare',
  },
}

// Rozet nadirlik renkleri
export const RARITY_COLORS = {
  common: '#95a5a6', // Gri
  uncommon: '#3498db', // Mavi
  rare: '#9b59b6', // Mor
  epic: '#e67e22', // Turuncu
  legendary: '#f1c40f', // Altın
}

// Rozet nadirlik etiketleri
export const RARITY_LABELS = {
  common: 'Yaygın',
  uncommon: 'Az Rastlanan',
  rare: 'Nadir',
  epic: 'Epik',
  legendary: 'Efsanevi',
}

// Kullanıcı istatistiklerini hesapla
export function calculateUserStats(stories, userCreatedAt) {
  const stats = {
    totalStories: stories.length,
    totalWords: 0,
    maxWords: 0,
    highEmpathyCount: 0,
    veryHighEmpathyCount: 0,
    avgEmotionalRecognition: 0,
    avgPerspectiveTaking: 0,
    avgCulturalSensitivity: 0,
    avgEmpathicResponse: 0,
    hasPerfectStory: false,
    consecutiveDays: 0,
    memberDays: 0,
  }

  if (stories.length === 0) return stats

  let sumEmotionalRecognition = 0
  let sumPerspectiveTaking = 0
  let sumCulturalSensitivity = 0
  let sumEmpathicResponse = 0

  stories.forEach((story) => {
    // Kelime sayısı
    const wordCount = story.wordCount || 0
    stats.totalWords += wordCount
    if (wordCount > stats.maxWords) {
      stats.maxWords = wordCount
    }

    // Empati seviyeleri - story.level doğrudan kullan
    const level = story.level || story.analysis?.level
    if (level === 'Yüksek' || level === 'Çok Yüksek') {
      stats.highEmpathyCount++
    }
    if (level === 'Çok Yüksek') {
      stats.veryHighEmpathyCount++
    }

    // Kriterler - story.criteria doğrudan kullan
    const criteria = story.criteria || story.analysis?.criteria
    if (criteria) {
      // Bizim sistem emotionalDepth, empathyExpressions vs kullanıyor
      const emotionalDepth = criteria.emotionalDepth || 0
      const empathyExpressions = criteria.empathyExpressions || 0
      const culturalAwareness = criteria.culturalAwareness || 0
      const personalConnection = criteria.personalConnection || 0

      sumEmotionalRecognition += emotionalDepth
      sumPerspectiveTaking += empathyExpressions
      sumCulturalSensitivity += culturalAwareness
      sumEmpathicResponse += personalConnection

      // Mükemmel hikaye kontrolü
      if (
        emotionalDepth >= 22 &&
        empathyExpressions >= 22 &&
        culturalAwareness >= 13 &&
        personalConnection >= 13
      ) {
        stats.hasPerfectStory = true
      }
    }
  })

  // Ortalamalar (max değerlere göre yüzde hesapla)
  if (stories.length > 0) {
    stats.avgEmotionalRecognition = (sumEmotionalRecognition / stories.length / 25) * 100
    stats.avgPerspectiveTaking = (sumPerspectiveTaking / stories.length / 25) * 100
    stats.avgCulturalSensitivity = (sumCulturalSensitivity / stories.length / 15) * 100
    stats.avgEmpathicResponse = (sumEmpathicResponse / stories.length / 15) * 100
  }

  // Ardışık gün hesaplama (basit versiyon - geliştirilecek)
  stats.consecutiveDays = calculateConsecutiveDays(stories)

  // Üyelik günü
  if (userCreatedAt) {
    const createdDate = userCreatedAt.toDate ? userCreatedAt.toDate() : new Date(userCreatedAt)
    const now = new Date()
    const diffTime = Math.abs(now - createdDate)
    stats.memberDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return stats
}

// Ardışık gün hesaplama
function calculateConsecutiveDays(stories) {
  if (stories.length === 0) return 0

  // Tarihleri sırala
  const dates = stories
    .map((story) => {
      const timestamp = story.timestamp
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      return date.toDateString()
    })
    .sort()

  // Benzersiz tarihleri al
  const uniqueDates = [...new Set(dates)]

  let maxStreak = 1
  let currentStreak = 1

  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1])
    const currDate = new Date(uniqueDates[i])
    const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 1
    }
  }

  return maxStreak
}

// Kullanıcının kazandığı rozetleri kontrol et
export function checkAchievements(stats, currentAchievements = []) {
  const newAchievements = []
  const currentIds = currentAchievements.map((a) => a.id)

  Object.values(ACHIEVEMENTS).forEach((achievement) => {
    // Eğer rozet zaten kazanılmışsa atla
    if (currentIds.includes(achievement.id)) return

    // Koşulu kontrol et
    if (achievement.condition(stats)) {
      newAchievements.push({
        id: achievement.id,
        unlockedAt: new Date(),
      })
    }
  })

  return newAchievements
}

// Rozet bilgisini al
export function getAchievementInfo(achievementId) {
  return Object.values(ACHIEVEMENTS).find((a) => a.id === achievementId)
}

// Kategori başına rozetleri grupla
export function getAchievementsByCategory() {
  const grouped = {}

  Object.values(ACHIEVEMENTS).forEach((achievement) => {
    if (!grouped[achievement.category]) {
      grouped[achievement.category] = []
    }
    grouped[achievement.category].push(achievement)
  })

  return grouped
}

// Kategori etiketleri
export const CATEGORY_LABELS = {
  beginner: 'Başlangıç',
  empathy: 'Empati',
  cultural: 'Kültürel',
  writing: 'Yazarlık',
  consistency: 'Tutarlılık',
  community: 'Topluluk',
  special: 'Özel',
}

// Kategori ikonları
export const CATEGORY_ICONS = {
  beginner: 'emoji_events',
  empathy: 'favorite',
  cultural: 'public',
  writing: 'edit',
  consistency: 'local_fire_department',
  community: 'groups',
  special: 'stars',
}
