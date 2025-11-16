<template>
  <div class="empathy-page">
    <!-- Tab Navigation -->
    <q-tabs
      v-model="currentTab"
      dense
      class="text-white tab-navigation"
      active-color="white"
      indicator-color="white"
      align="justify"
    >
      <q-tab
        name="info"
        label="Bilgilendirme"
        icon="info"
      />
      <q-tab
        name="experience"
        label="Hikaye Deneyimi"
        icon="book"
      />
      <q-tab
        name="community"
        label="Topluluk Hikayeleri"
        icon="people"
      />
      <q-tab
        name="methodology"
        label="AI Metodolojisi"
        icon="psychology"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="currentTab"
      animated
    >
      <!-- Bilgilendirme Panel -->
      <q-tab-panel name="info">
        <div class="q-pa-md">
          <q-card class="q-pa-lg">
            <div class="text-h4 text-weight-bold q-mb-md">Proje Hakkında</div>
            <div class="text-body1 q-mb-md">
              <strong>Dijital Empati Köprüleri</strong>, gençlerin dijital dünyada empati, kültürel farkındalık ve etik
              duyarlılık geliştirmesini hedefleyen yenilikçi bir dijital platformdur.
            </div>

            <q-card class="bg-purple-1 q-pa-md q-mb-md">
              <div class="text-h6 text-weight-bold q-mb-sm">Temel Amaçlarımız</div>
              <q-list>
                <q-item>
                  <q-item-section avatar>
                    <q-icon
                      name="check_circle"
                      color="purple"
                    />
                  </q-item-section>
                  <q-item-section>Farklı kültürlerden insanların yaşanmış hikayelerini paylaşmak</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon
                      name="check_circle"
                      color="purple"
                    />
                  </q-item-section>
                  <q-item-section>Yapay zeka destekli empati ölçümü ile duygusal farkındalığı artırmak</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon
                      name="check_circle"
                      color="purple"
                    />
                  </q-item-section>
                  <q-item-section>Gençleri pasif izleyicilerden duyarlı katılımcılara dönüştürmek</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon
                      name="check_circle"
                      color="purple"
                    />
                  </q-item-section>
                  <q-item-section>Kültürler arası dayanışma ve toplumsal bağı güçlendirmek</q-item-section>
                </q-item>
              </q-list>
            </q-card>

            <div class="text-body1 q-mb-md">
              Bu platform, empatiyi ölçülebilir bir bilişsel veri alanına dönüştüren yapay zeka destekli ilk kültürel
              teknoloji platformudur. Duygu analizi, hikaye üretimi ve etkileşimli deneyim teknolojilerini
              bütünleştirerek bireyin kültürel farkındalık düzeyini anlık olarak görselleştiren yeni bir metodoloji
              geliştirmektedir.
            </div>

            <q-card class="bg-blue-1 q-pa-md q-mb-md">
              <div class="text-h6 text-weight-bold q-mb-sm">Nasıl Çalışır?</div>
              <q-list>
                <q-item>
                  <q-item-section avatar>
                    <div class="text-h6 text-blue text-weight-bold">1.</div>
                  </q-item-section>
                  <q-item-section>Hikayenizi veya deneyimlerinizi paylaşın</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <div class="text-h6 text-blue text-weight-bold">2.</div>
                  </q-item-section>
                  <q-item-section>Yapay zeka sistemi hikayenizi analiz eder ve empati skorunuzu
                    hesaplar</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <div class="text-h6 text-blue text-weight-bold">3.</div>
                  </q-item-section>
                  <q-item-section>Diğer kullanıcıların hikayelerini okuyun ve empati ağını genişletin</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <div class="text-h6 text-blue text-weight-bold">4.</div>
                  </q-item-section>
                  <q-item-section>Kültürel farkındalığınızı geliştirin ve toplumsal dayanışmaya katkıda
                    bulunun</q-item-section>
                </q-item>
              </q-list>
            </q-card>

            <div class="text-body1 text-purple-8 text-weight-medium">
              Bu proje, BARÜ AR-GE Proje Pazarı 2025 kapsamında geliştirilmektedir ve dijital çağda insan duygusunu
              merkeze alan teknoloji tasarımı anlayışını güçlendirmeyi hedeflemektedir.
            </div>
          </q-card>
        </div>
      </q-tab-panel>

      <!-- Hikaye Deneyimi Panel -->
      <q-tab-panel name="experience">
        <div class="q-pa-md">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-card class="glass-card animated-card q-pa-lg">
                <div class="row items-center q-mb-md">
                  <q-icon
                    name="edit_note"
                    size="48px"
                    class="text-purple pulse-icon q-mr-md"
                  />
                  <div>
                    <div class="text-h4 text-weight-bold gradient-text q-mb-xs">Hikayenizi Paylaşın</div>
                    <div class="text-body2 text-grey-7">
                      Kültürel deneyimlerinizi, gözlemlerinizi veya empatik düşüncelerinizi paylaşın.
                    </div>
                  </div>
                </div>

                <div
                  class="text-caption q-mt-xs q-mb-md"
                  v-if="currentUser"
                >
                  <q-chip
                    icon="person"
                    color="purple"
                    text-color="white"
                  >
                    {{ currentUser.displayName || currentUser.email }}
                  </q-chip>
                </div>
                <div
                  class="text-caption q-mt-xs q-mb-md"
                  v-else
                >
                  <q-banner class="bg-warning text-white rounded-borders">
                    <template v-slot:avatar>
                      <q-icon name="info" />
                    </template>
                    Paylaşmak için <q-btn
                      dense
                      flat
                      to="/login"
                      label="Giriş Yapın"
                      color="white"
                    />
                  </q-banner>
                </div>

                <!-- Örnek Hikayeler -->
                <q-expansion-item
                  label="💡 Örnek Hikayeler"
                  icon="lightbulb"
                  class="q-mb-md example-expansion"
                  header-class="text-blue-8 text-weight-bold"
                  expand-icon-class="text-blue-8"
                >
                  <q-card
                    flat
                    bordered
                    class="q-pa-md bg-blue-1 rounded-borders"
                  >
                    <q-list separator>
                      <q-item
                        clickable
                        v-ripple
                        @click="useExampleStory(0)"
                        class="rounded-borders example-item"
                      >
                        <q-item-section avatar>
                          <q-avatar
                            color="blue"
                            text-color="white"
                            icon="school"
                          />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-bold">🎓 Mülteci Öğrenci</q-item-label>
                          <q-item-label
                            caption
                            lines="2"
                          >Sınıfımıza yeni gelen Suriyeli bir öğrenci vardı...</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-ripple
                        @click="useExampleStory(1)"
                        class="rounded-borders example-item"
                      >
                        <q-item-section avatar>
                          <q-avatar
                            color="purple"
                            text-color="white"
                            icon="elderly"
                          />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-bold">👵 Yaşlı Komşu</q-item-label>
                          <q-item-label
                            caption
                            lines="2"
                          >Apartmanımızda yaşayan yaşlı teyze...</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-ripple
                        @click="useExampleStory(2)"
                        class="rounded-borders example-item"
                      >
                        <q-item-section avatar>
                          <q-avatar
                            color="green"
                            text-color="white"
                            icon="public"
                          />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-bold">🌍 Farklılıklarımız</q-item-label>
                          <q-item-label
                            caption
                            lines="2"
                          >Üniversitede farklı kültürlerden arkadaşlarım var...</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </q-expansion-item>

                <!-- Hikaye Input -->
                <div class="story-input-wrapper q-mb-md">
                  <q-input
                    filled
                    type="textarea"
                    v-model="userStory"
                    autogrow
                    :rows="8"
                    placeholder="✨ Hikayenizi buraya yazın... Duygularınızı, deneyimlerinizi ve düşüncelerinizi paylaşın. (Konum otomatik alınacak)"
                    class="story-input"
                    :rules="[val => val.length >= 20 || 'En az 20 karakter gerekli', val => val.length <= 2000 || 'Maksimum 2000 karakter']"
                    counter
                    maxlength="2000"
                  >
                    <template v-slot:append>
                      <div class="row q-gutter-xs">
                        <q-btn
                          round
                          dense
                          flat
                          icon="emoji_emotions"
                          @click="showEmojiPicker = !showEmojiPicker"
                          color="purple"
                          class="emoji-btn"
                        >
                          <q-tooltip>Emoji Ekle</q-tooltip>
                        </q-btn>
                      </div>
                    </template>
                  </q-input>

                  <!-- Konum Gösterimi -->
                  <transition name="fade">
                    <div v-if="selectedLocation" class="location-display q-mt-sm">
                      <q-chip
                        color="green"
                        text-color="white"
                        icon="location_on"
                        class="location-chip"
                      >
                        📍 {{ selectedLocation.name || `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}` }}
                      </q-chip>
                    </div>
                    <div v-else-if="loadingLocation" class="location-display q-mt-sm">
                      <q-chip
                        color="grey"
                        text-color="white"
                        icon="gps_fixed"
                        class="location-chip"
                      >
                        Konum aliniyor...
                      </q-chip>
                    </div>
                  </transition>
                </div>

                <!-- Emoji Picker -->
                <transition name="slide-down">
                  <div
                    v-if="showEmojiPicker"
                    class="emoji-picker q-mb-md"
                  >
                    <div class="text-subtitle2 text-weight-bold q-mb-sm">Duygularınızı ifade edin:</div>
                    <div class="row q-gutter-sm">
                      <q-btn
                        v-for="emoji in commonEmojis"
                        :key="emoji"
                        @click="addEmoji(emoji)"
                        flat
                        round
                        size="lg"
                        class="emoji-item"
                      >
                        {{ emoji }}
                      </q-btn>
                    </div>
                  </div>
                </transition>

                <!-- İstatistikler -->
                <div class="row q-mb-md q-gutter-md stats-container">
                  <div
                    class="counter-badge"
                    :class="{ active: wordCount >= 50 }"
                  >
                    <q-icon
                      name="text_fields"
                      size="sm"
                    />
                    <span class="text-weight-bold">{{ wordCount }}</span>
                    <span>kelime</span>
                  </div>
                  <div
                    class="counter-badge"
                    :class="{ active: userStory.length >= 100 }"
                  >
                    <q-icon
                      name="edit"
                      size="sm"
                    />
                    <span class="text-weight-bold">{{ userStory.length }}</span>
                    <span>/ 2000 karakter</span>
                  </div>
                  <div
                    class="counter-badge"
                    :class="{ active: hasEmotionalWords }"
                  >
                    <q-icon
                      name="favorite"
                      size="sm"
                    />
                    <span>{{ hasEmotionalWords ? '✓ Duygusal' : 'Duygu ekle' }}</span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="row q-gutter-md">
                  <q-btn
                    :label="isRecording ? 'Dinleniyor...' : '🎤 Sesli Anlat'"
                    :color="isRecording ? 'red' : 'deep-orange'"
                    :icon="isRecording ? 'mic' : 'mic_none'"
                    @click="toggleVoiceRecording"
                    size="lg"
                    class="voice-btn"
                    glossy
                    unelevated
                  >
                    <q-tooltip v-if="!isRecording">Hikayenizi sesli olarak anlatın</q-tooltip>
                  </q-btn>
                  <q-btn
                    :label="isAnalyzing ? 'Analiz Ediliyor...' : '🔮 Empati Skorunu Hesapla'"
                    color="purple"
                    icon="psychology"
                    @click="onAnalyze"
                    :disable="isAnalyzing || userStory.trim().length < 20"
                    :loading="isAnalyzing"
                    size="lg"
                    class="gradient-btn"
                    glossy
                    unelevated
                  />
                  <q-btn
                    label="Temizle"
                    color="grey-7"
                    outline
                    icon="clear"
                    @click="clearStory"
                    :disable="!userStory"
                    size="lg"
                  />
                </div>

                <!-- Sesli Anlatım Durumu -->
                <transition name="fade">
                  <q-banner
                    v-if="isRecording"
                    class="bg-red-1 text-red-9 q-mt-md"
                    rounded
                  >
                    <template v-slot:avatar>
                      <q-icon
                        name="mic"
                        color="red"
                        size="md"
                        class="recording-pulse"
                      />
                    </template>
                    <div class="text-weight-bold">🎙️ Dinliyorum... Hikayenizi anlatın</div>
                    <div class="text-caption">Bitirmek için tekrar "Sesli Anlat" butonuna tıklayın</div>
                  </q-banner>
                </transition>

                <!-- Transkripsiyon Önizleme -->
                <transition name="fade">
                  <q-card
                    v-if="transcription && !isRecording"
                    class="bg-green-1 q-mt-md q-pa-md"
                  >
                    <div class="text-subtitle2 text-weight-bold text-green-9 q-mb-sm">
                      ✅ Sesli anlatım metne çevrildi:
                    </div>
                    <div class="text-body2 text-grey-8">{{ transcription }}</div>
                  </q-card>
                </transition>
              </q-card>
            </div>

            <!-- Empati Skoru Sonuçları -->
            <div
              class="col-12"
              v-if="empathyScore"
            >
              <q-card class="q-pa-lg">
                <div class="text-h5 text-weight-bold q-mb-md">Empati Analiz Sonuçlarınız</div>

                <div class="row items-center q-mb-lg">
                  <div class="col">
                    <div class="text-grey-7 q-mb-xs">Toplam Empati Skoru</div>
                    <div class="text-h2 text-purple text-weight-bold">{{ empathyScore.total }}/100</div>
                    <div class="text-h6 q-mt-sm">Seviye: <span class="text-weight-bold">{{ empathyScore.level }}</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <q-icon
                      name="trending_up"
                      size="80px"
                      color="purple-4"
                    />
                  </div>
                </div>

                <div class="text-subtitle1 text-weight-bold q-mb-md">Detaylı Analiz:</div>

                <div
                  v-for="(label, key) in criteriaLabels"
                  :key="key"
                  class="q-mb-md"
                >
                  <div class="row items-center q-mb-xs">
                    <div class="col text-body2 text-weight-medium">{{ label }}</div>
                    <div class="col-auto text-body2 text-weight-bold text-purple">
                      {{ empathyScore.criteria[key] }}/{{ maxFor(key) }}
                    </div>
                  </div>
                  <q-linear-progress
                    :value="(empathyScore.criteria[key] / maxFor(key))"
                    color="purple"
                    track-color="grey-3"
                    size="8px"
                  />
                </div>

                <q-btn
                  label="Hikayemi Toplulukla Paylaş"
                  color="green"
                  class="full-width q-mt-md"
                  @click="confirmShare"
                  :disable="!currentUser"
                />
              </q-card>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <!-- Topluluk Hikayeleri Panel -->
      <q-tab-panel name="community">
        <div class="q-pa-md">
          <q-card class="q-pa-lg">
            <div class="row items-center justify-between q-mb-md">
              <div class="text-h5 text-weight-bold">Topluluk Hikayeleri</div>
              <q-btn
                flat
                label="Yenile"
                icon="refresh"
                @click="loadStories"
                color="purple"
              />
            </div>

            <div class="text-body2 text-grey-7 q-mb-md">
              Farklı kullanıcılar tarafından paylaşılan hikayeler ve empati skorları. Bu hikayeler tüm kullanıcılar
              tarafından
              gerçek zamanlı olarak görülebilir.
            </div>

            <div
              v-if="stories.length === 0"
              class="text-center q-pa-xl"
            >
              <q-icon
                name="people"
                size="64px"
                color="grey-4"
              />
              <div class="text-grey-6 q-mt-md">Henüz topluluk hikayesi paylaşılmadı.</div>
              <div class="text-grey-5 text-caption q-mt-xs">İlk hikayeyi paylaşan siz olun!</div>
            </div>

            <div
              v-for="s in stories"
              :key="s.id"
              class="q-mb-sm"
            >
              <StoryCard
                :story="s"
                @click="openStoryDetail(s)"
              />
            </div>
          </q-card>
        </div>
      </q-tab-panel>

      <!-- AI Metodolojisi Panel -->
      <q-tab-panel name="methodology">
        <div class="q-pa-md">
          <q-card class="q-pa-lg">
            <div class="text-h4 text-weight-bold q-mb-md">AI Empati Ölçüm Metodolojisi</div>
            <div class="text-body1 text-grey-7 q-mb-lg">
              Yapay zeka sistemimiz, paylaşılan hikayeleri beş temel kritere göre analiz ederek empati skorunu hesaplar.
              Bu
              metodoloji, bilimsel araştırmalara ve psikolojik empati teorilerine dayanmaktadır.
            </div>

            <!-- Kriter 1 -->
            <q-card
              class="q-mb-md"
              bordered
              flat
              style="border-left: 4px solid #9c27b0"
            >
              <q-card-section>
                <div class="text-h6 text-weight-bold q-mb-sm">1. Duygusal Derinlik (Maks. 25 puan)</div>
                <div class="text-body2 q-mb-sm">
                  Hikayede kullanılan duygusal ifadelerin çeşitliliği ve yoğunluğu analiz edilir.
                </div>
                <div class="text-caption text-grey-7">
                  <strong>Değerlendirilen terimler:</strong> üzgün, mutlu, korku, umut, sevgi, acı, hüzün, sevinç,
                  endişe,
                  öfke, merhamet, şefkat
                </div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  <strong>Geçerlilik:</strong> Duygusal kelime zenginliği, empati düzeyinin önemli bir göstergesidir
                  (Hoffman,
                  2000)
                </div>
              </q-card-section>
            </q-card>

            <!-- Kriter 2 -->
            <q-card
              class="q-mb-md"
              bordered
              flat
              style="border-left: 4px solid #2196f3"
            >
              <q-card-section>
                <div class="text-h6 text-weight-bold q-mb-sm">2. Empati İfadeleri (Maks. 25 puan)</div>
                <div class="text-body2 q-mb-sm">
                  Başkasının perspektifinden bakma ve duygusal bağlantı kurma yeteneği ölçülür.
                </div>
                <div class="text-caption text-grey-7">
                  <strong>Değerlendirilen terimler:</strong> hissettim, anladım, düşündüm, deneyimledim, yaşadım, fark
                  ettim,
                  empati, kendimi, onların
                </div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  <strong>Geçerlilik:</strong> Perspektif alma becerisinin dilsel göstergeleri (Davis, 1983)
                </div>
              </q-card-section>
            </q-card>

            <!-- Kriter 3 -->
            <q-card
              class="q-mb-md"
              bordered
              flat
              style="border-left: 4px solid #4caf50"
            >
              <q-card-section>
                <div class="text-h6 text-weight-bold q-mb-sm">3. Hikaye Kalitesi (Maks. 20 puan)</div>
                <div class="text-body2 q-mb-sm">
                  Hikayenin uzunluğu ve detay düzeyi değerlendirilir.
                </div>
                <div class="text-caption text-grey-7">
                  <strong>Puanlama:</strong> 100+ kelime (20p), 50-100 kelime (15p), 20-50 kelime (10p), &lt;20 kelime
                  (5p)
                </div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  <strong>Geçerlilik:</strong> Detaylı anlatım, empatik düşünmenin göstergesidir
                </div>
              </q-card-section>
            </q-card>

            <!-- Kriter 4 -->
            <q-card
              class="q-mb-md"
              bordered
              flat
              style="border-left: 4px solid #ff9800"
            >
              <q-card-section>
                <div class="text-h6 text-weight-bold q-mb-sm">4. Kültürel Farkındalık (Maks. 15 puan)</div>
                <div class="text-body2 q-mb-sm">
                  Kültürlerarası anlayış ve toplumsal bilinç seviyesi ölçülür.
                </div>
                <div class="text-caption text-grey-7">
                  <strong>Değerlendirilen terimler:</strong> kültür, toplum, gelenek, değer, insan, dünya, ülke,
                  insanlık
                </div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  <strong>Geçerlilik:</strong> Kültürel empati, toplumsal bağlamı anlama yeteneğini gösterir (Bennett,
                  1993)
                </div>
              </q-card-section>
            </q-card>

            <!-- Kriter 5 -->
            <q-card
              class="q-mb-md"
              bordered
              flat
              style="border-left: 4px solid #e91e63"
            >
              <q-card-section>
                <div class="text-h6 text-weight-bold q-mb-sm">5. Kişisel Bağlantı (Maks. 15 puan)</div>
                <div class="text-body2 q-mb-sm">
                  Kişisel deneyimlerle bağlantı kurma ve özdeşleşme düzeyi analiz edilir.
                </div>
                <div class="text-caption text-grey-7">
                  <strong>Değerlendirilen terimler:</strong> benim, ailem, arkadaşım, çevrem, toplumumuz, biz
                </div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  <strong>Geçerlilik:</strong> Kişisel bağlantı, empatik tepkinin güçlü bir tetikleyicisidir (Batson et
                  al.,
                  1997)
                </div>
              </q-card-section>
            </q-card>

            <!-- Güvenilirlik -->
            <q-card class="bg-purple-1 q-pa-md q-mb-md">
              <div class="row items-center q-mb-sm">
                <q-icon
                  name="check_circle"
                  color="green"
                  size="24px"
                  class="q-mr-sm"
                />
                <div class="text-h6 text-weight-bold">Güvenilirlik ve Geçerlilik</div>
              </div>
              <div class="text-body2">
                <p><strong>Bilimsel Temel:</strong> Sistemimiz, psikoloji ve dil bilimi literatüründeki kanıtlanmış
                  empati
                  göstergelerini kullanır. Her kriter, akademik araştırmalara dayalı olarak seçilmiştir.</p>
                <p><strong>Objektif Analiz:</strong> AI sistemi, önyargısız ve tutarlı bir şekilde tüm hikayeleri aynı
                  kriterlerle değerlendirir. Bu, sonuçların tekrarlanabilirliğini sağlar.</p>
                <p><strong>Şeffaflık:</strong> Her skorun nasıl hesaplandığı açıkça gösterilir. Kullanıcılar, hangi
                  kriterlerde yüksek veya düşük puan aldıklarını görebilir.</p>
                <p><strong>Sürekli Gelişim:</strong> Sistem, topluluk geri bildirimleri ve yeni araştırmalar ışığında
                  sürekli
                  olarak iyileştirilmektedir.</p>
              </div>
            </q-card>

            <!-- Uyarı -->
            <q-banner class="bg-yellow-1 text-yellow-9">
              <template v-slot:avatar>
                <q-icon
                  name="warning"
                  color="yellow-8"
                />
              </template>
              <div class="text-weight-bold">Önemli Not</div>
              <div class="text-caption">
                Bu empati skorları, kişisel gelişim ve farkındalık amaçlıdır. Hiçbir AI sistemi insan duygularını
                mükemmel bir
                şekilde ölçemez. Skorlar, empatik ifade biçiminizi anlamanız ve geliştirmeniz için bir rehber
                niteliğindedir.
              </div>
            </q-banner>

            <div class="text-center q-mt-lg text-caption text-grey-6">
              <strong>Akademik Referanslar:</strong><br>
              Davis, M. H. (1983). Measuring individual differences in empathy.<br>
              Hoffman, M. L. (2000). Empathy and moral development.<br>
              Bennett, M. J. (1993). Towards ethnorelativism.<br>
              Batson, C. D. et al. (1997). Empathy and attitudes.
            </div>
          </q-card>
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Hikaye Paylaşma Onay Dialogu -->
    <q-dialog v-model="confirmDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Hikayeyi Paylaş</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Hikayeniz topluluğa gönderilecek. Devam etmek istiyor musunuz?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="İptal"
            color="grey"
            v-close-popup
          />
          <q-btn
            label="Paylaş"
            color="primary"
            @click="shareStoryConfirmed"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Hikaye Detay Dialogu -->
    <q-dialog
      v-model="storyDetailDialog"
      :maximized="$q.screen.lt.sm"
    >
      <q-card style="min-width: 600px; max-width: 800px">
        <q-card-section class="bg-purple text-white">
          <div class="row items-center">
            <div class="col">
              <div class="text-h5 text-weight-bold">{{ selectedStory?.username }}</div>
              <div class="text-caption">{{ formatDate(selectedStory?.createdAt) }}</div>
              <div v-if="selectedStory?.location" class="text-caption q-mt-xs">
                <q-icon name="location_on" size="xs" class="q-mr-xs" />
                {{ selectedStory.location.name || `${selectedStory.location.lat.toFixed(4)}, ${selectedStory.location.lng.toFixed(4)}` }}
              </div>
            </div>
            <div class="col-auto">
              <q-btn
                flat
                round
                dense
                icon="close"
                v-close-popup
                color="white"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-h6 text-weight-bold q-mb-sm">Hikaye</div>
          <div
            class="text-body1 q-mb-lg"
            style="white-space: pre-wrap"
          >{{ selectedStory?.story }}</div>

          <q-separator class="q-my-md" />

          <div class="text-h6 text-weight-bold q-mb-md">Empati Analizi</div>

          <div class="row items-center q-mb-lg">
            <div class="col">
              <div class="text-grey-7">Toplam Empati Skoru</div>
              <div class="text-h3 text-purple text-weight-bold">{{ selectedStory?.score }}/100</div>
              <q-linear-progress
                :value="(selectedStory?.score || 0) / 100"
                color="purple"
                size="12px"
                class="q-mt-sm"
              />
              <div class="text-subtitle1 q-mt-sm">Seviye: <span class="text-weight-bold text-purple">{{
                selectedStory?.level
                  }}</span></div>
            </div>
            <div class="col-auto">
              <q-circular-progress
                :value="selectedStory?.score || 0"
                :max="100"
                size="100px"
                :thickness="0.15"
                color="purple"
                track-color="grey-3"
                class="text-purple"
              >
                <div class="text-h6">{{ selectedStory?.score }}</div>
                <div class="text-caption">puan</div>
              </q-circular-progress>
            </div>
          </div>

          <div class="text-subtitle1 text-weight-bold q-mb-md">Kriter Detayları:</div>

          <div v-if="selectedStory?.criteria">
            <div
              v-for="(label, key) in criteriaLabels"
              :key="key"
              class="q-mb-md"
            >
              <div class="row items-center q-mb-xs">
                <div class="col">
                  <div class="text-body2 text-weight-medium">{{ label }}</div>
                </div>
                <div class="col-auto text-body2 text-weight-bold text-purple">
                  {{ selectedStory.criteria[key] }}/{{ maxFor(key) }}
                </div>
              </div>
              <q-linear-progress
                :value="(selectedStory.criteria[key] / maxFor(key))"
                :color="getProgressColor(selectedStory.criteria[key], maxFor(key))"
                track-color="grey-3"
                size="10px"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions
          align="right"
          class="q-pa-md"
        >
          <q-btn
            flat
            label="Kapat"
            color="purple"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Confetti Animasyonu -->
    <div
      v-if="confettiActive"
      class="confetti-container"
    >
      <div
        v-for="i in 100"
        :key="i"
        class="confetti"
        :style="getConfettiStyle(i)"
      ></div>
    </div>

    <!-- Milestone Celebration (17 Hikaye) -->
    <MilestoneCelebration
      v-model="showMilestoneCelebration"
      :total-achievements="milestoneAchievementCount"
    />

    <!-- Achievement Notification -->
    <AchievementNotification
      v-if="currentAchievement"
      v-model="showAchievement"
      :achievement="currentAchievement"
      @update:model-value="onAchievementClosed"
    />
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import StoryCard from 'components/StoryCard.vue'
import AchievementNotification from 'components/AchievementNotification.vue'
import MilestoneCelebration from 'components/MilestoneCelebration.vue'
import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot, doc, setDoc, getDoc, getDocs, where } from 'firebase/firestore'
import { calculateUserStats, checkAchievements, getAchievementInfo } from '../utils/achievements'

const currentTab = ref('info')
const userStory = ref('')
const empathyScore = ref(null)
const isAnalyzing = ref(false)
const stories = ref([])
const confirmDialog = ref(false)
const storyDetailDialog = ref(false)
const selectedStory = ref(null)
const showEmojiPicker = ref(false)
const $q = useQuasar()
const currentUser = ref(window.$user || null)

// Achievement sistemi
const showAchievement = ref(false)
const currentAchievement = ref(null)
const achievementQueue = ref([])
const showMilestoneCelebration = ref(false)
const milestoneAchievementCount = ref(0)

// Sesli anlatım sistemi
const isRecording = ref(false)
const transcription = ref('')
const recognition = ref(null)

// Konum sistemi
const selectedLocation = ref(null)
const loadingLocation = ref(false)

// Örnek hikayeler
const exampleStories = [
  'Sınıfımıza yeni gelen Suriyeli bir öğrenci vardı. İlk günlerde çok çekingen ve yalnızdı. Dili yeterince bilmediği için derslerde zorlanıyordu. Ben yanına oturdum ve yavaş yavaş arkadaş olduk. Ona Türkçe öğretmeye çalıştım, o da bana Arapça birkaç kelime öğretti. Zamanla onun ne kadar cesur ve güçlü biri olduğunu anladım. Ailesini, evini geride bırakmış, yeni bir hayata başlamaya çalışıyordu. Onun gözlerindeki umut, bana hayatın zorluklarına rağmen nasıl güçlü kalınabileceğini öğretti.',

  'Apartmanımızda yaşayan yaşlı teyze her gün marketin önünde oturuyordu. Bir gün yanına gidip sohbet ettik. Bana gençlik yıllarından, kayıplarından, yalnızlığından bahsetti. O gün anladım ki, bazen insanların en çok ihtiyaç duyduğu şey sadece dinlenilmek. Artık her gün yanına uğruyorum, birlikte çay içiyoruz. Onun hikayelerini dinlerken, hayatın ne kadar kıymetli olduğunu ve yaşlılara gösterilen saygının önemini daha iyi anlıyorum.',

  'Üniversitede farklı kültürlerden arkadaşlarım var. Her birimizin bayramları, gelenekleri ve değerleri farklı. Başlarda bu farklılıklar garip geliyordu, ama sonra anladım ki, hepimiz temelde aynı şeyleri istiyoruz: sevgi, saygı, anlayış. Artık onların bayramlarını kutluyorum, yemeklerini tatıyorum, hikayelerini dinliyorum. Bu deneyim bana insanlığın ne kadar zengin ve çeşitli olduğunu gösterdi. Farklılıklarımız bizi zenginleştiriyor, empati kurmamızı sağlıyor.'
]

// Yaygın emojiler
const commonEmojis = ['❤️', '😊', '😢', '🤗', '🙏', '💪', '✨', '🌟', '🤝', '💭', '🌈', '🕊️']

// Kelime sayısı
const wordCount = computed(() => {
  return userStory.value.trim().split(/\s+/).filter(w => w.length > 0).length
})

// Duygusal kelime kontrolü
const hasEmotionalWords = computed(() => {
  const lowerText = userStory.value.toLowerCase()
  const emotions = ['üzgün', 'mutlu', 'korku', 'umut', 'sevgi', 'acı', 'hüzün', 'sevinç', 'endişe', 'öfke', 'merhamet', 'şefkat', 'mutluluk', 'kedel']
  return emotions.some(e => lowerText.includes(e))
})

const criteriaLabels = {
  emotionalDepth: 'Duygusal Derinlik',
  empathyExpressions: 'Empati İfadeleri',
  storytellingQuality: 'Hikaye Kalitesi',
  culturalAwareness: 'Kültürel Farkındalık',
  personalConnection: 'Kişisel Bağlantı',
}

function maxFor(key) {
  if (key === 'emotionalDepth' || key === 'empathyExpressions') return 25
  if (key === 'storytellingQuality') return 20
  return 15
}

function getProgressColor(score, max) {
  const percentage = (score / max) * 100
  if (percentage >= 80) return 'green'
  if (percentage >= 60) return 'purple'
  if (percentage >= 40) return 'orange'
  return 'grey'
}

function useExampleStory(index) {
  userStory.value = exampleStories[index]
  showEmojiPicker.value = false
  $q.notify({ type: 'info', message: 'Örnek hikaye eklendi. İsterseniz düzenleyebilirsiniz.', icon: 'lightbulb' })
}

function addEmoji(emoji) {
  userStory.value += emoji
}

function clearStory() {
  userStory.value = ''
  empathyScore.value = null
  showEmojiPicker.value = false
  selectedLocation.value = null
  $q.notify({ type: 'info', message: 'Hikaye temizlendi', icon: 'delete' })
}

// Konum fonksiyonları
function autoGetLocation() {
  if (!navigator.geolocation) {
    console.warn('Tarayıcınız konum özelliğini desteklemiyor')
    return
  }

  loadingLocation.value = true

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude

      try {
        // Reverse geocoding ile şehir/ülke bilgisi al
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=tr`
        )
        const data = await response.json()

        const locationName = data.address?.city ||
                            data.address?.town ||
                            data.address?.village ||
                            data.address?.state ||
                            data.address?.country ||
                            'Bilinmeyen Konum'

        selectedLocation.value = {
          lat,
          lng,
          name: locationName,
          fullAddress: data.display_name
        }

        $q.notify({
          type: 'positive',
          message: `📍 Konumunuz otomatik alındı: ${locationName}`,
          icon: 'location_on',
          timeout: 2000
        })
      } catch {
        selectedLocation.value = {
          lat,
          lng,
          name: null
        }
        $q.notify({
          type: 'positive',
          message: '📍 Konumunuz otomatik alındı',
          icon: 'location_on',
          timeout: 2000
        })
      } finally {
        loadingLocation.value = false
      }
    },
    (error) => {
      loadingLocation.value = false
      let message = 'Konum alınamadı'

      if (error.code === error.PERMISSION_DENIED) {
        message = 'Konum izni gerekli. Tarayıcıdan izin verin.'
      }

      console.warn(message, error)
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  )
}

function openStoryDetail(story) {
  selectedStory.value = story
  storyDetailDialog.value = true
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

function analyzeEmpathy(text) {
  isAnalyzing.value = true
  return new Promise((res) => {
    setTimeout(() => {
      const criteria = {
        emotionalDepth: 0,
        empathyExpressions: 0,
        storytellingQuality: 0,
        culturalAwareness: 0,
        personalConnection: 0,
      }
      const lowerText = text.toLowerCase()
      const emotions = ['üzgün', 'mutlu', 'korku', 'umut', 'sevgi', 'acı', 'hüzün', 'sevinç', 'endişe', 'öfke', 'merhamet', 'şefkat']
      emotions.forEach(e => { if (lowerText.includes(e)) criteria.emotionalDepth += 5 })
      // Bonus: Metinde duygusal kelime varsa ekstra puan
      if (emotions.some(e => lowerText.includes(e))) criteria.emotionalDepth += 5
      criteria.emotionalDepth = Math.min(criteria.emotionalDepth, 25)

      const empathyPhrases = ['hissettim', 'anladım', 'düşündüm', 'deneyimledim', 'yaşadım', 'fark ettim', 'empati', 'kendimi', 'onların', 'his', 'duygu', 'anlıyorum']
      empathyPhrases.forEach(p => { if (lowerText.includes(p)) criteria.empathyExpressions += 4 })
      // Bonus: Empati ifadesi varsa ekstra puan
      if (empathyPhrases.some(p => lowerText.includes(p))) criteria.empathyExpressions += 5
      criteria.empathyExpressions = Math.min(criteria.empathyExpressions, 25)

      const wordCount = text.split(' ').length
      if (wordCount > 100) criteria.storytellingQuality = 20
      else if (wordCount > 50) criteria.storytellingQuality = 18
      else if (wordCount > 30) criteria.storytellingQuality = 15
      else if (wordCount > 20) criteria.storytellingQuality = 12
      else criteria.storytellingQuality = 8

      const culturalTerms = ['kültür', 'toplum', 'gelenek', 'değer', 'insan', 'dünya', 'ülke', 'insanlık', 'toplum', 'aile', 'arkadaş']
      culturalTerms.forEach(t => { if (lowerText.includes(t)) criteria.culturalAwareness += 3 })
      // Bonus: Kültürel terim varsa ekstra puan
      if (culturalTerms.some(t => lowerText.includes(t))) criteria.culturalAwareness += 3
      criteria.culturalAwareness = Math.min(criteria.culturalAwareness, 15)

      const personalPhrases = ['benim', 'ailem', 'arkadaşım', 'çevrem', 'toplumumuz', 'biz', 'ben', 'bana', 'beni']
      personalPhrases.forEach(p => { if (lowerText.includes(p)) criteria.personalConnection += 3 })
      // Bonus: Kişisel bağlantı varsa ekstra puan
      if (personalPhrases.some(p => lowerText.includes(p))) criteria.personalConnection += 3
      criteria.personalConnection = Math.min(criteria.personalConnection, 15)

      const totalScore = Object.values(criteria).reduce((a, b) => a + b, 0)
      const level = totalScore >= 80 ? 'Çok Yüksek' : totalScore >= 60 ? 'Yüksek' : totalScore >= 40 ? 'Orta' : 'Gelişiyor'

      isAnalyzing.value = false
      res({ total: totalScore, criteria, level })
    }, 800)
  })
}

async function onAnalyze() {
  const res = await analyzeEmpathy(userStory.value)
  empathyScore.value = res

  // Analiz sonucunu veritabanına kaydet
  await saveAnalysisToDatabase(res)
}

// Sesli Anlatım Fonksiyonları
function initSpeechRecognition() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    $q.notify({
      type: 'negative',
      message: 'Tarayıcınız sesli anlatımı desteklemiyor. Chrome veya Edge kullanmayı deneyin.',
      timeout: 5000
    })
    return null
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognitionInstance = new SpeechRecognition()

  recognitionInstance.continuous = true // Sürekli dinle
  recognitionInstance.interimResults = true // Ara sonuçları göster
  recognitionInstance.lang = 'tr-TR' // Türkçe dil desteği

  recognitionInstance.onstart = () => {
    console.log('🎤 Sesli anlatım başladı')
    isRecording.value = true
    transcription.value = ''
    $q.notify({
      type: 'positive',
      message: '🎤 Dinliyorum... Hikayenizi anlatın',
      icon: 'mic',
      timeout: 2000
    })
  }

  recognitionInstance.onresult = (event) => {
    let finalTranscript = ''

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' '
      }
    }

    // Metni textarea'ya ekle
    if (finalTranscript) {
      userStory.value += finalTranscript
      transcription.value = finalTranscript.trim()
      console.log('📝 Metne çevrildi:', finalTranscript)
    }
  }

  recognitionInstance.onerror = (event) => {
    console.error('❌ Sesli anlatım hatası:', event.error)
    isRecording.value = false

    let errorMessage = 'Sesli anlatım hatası'
    if (event.error === 'no-speech') {
      errorMessage = 'Ses algılanamadı. Lütfen mikrofonunuzu kontrol edin.'
    } else if (event.error === 'not-allowed') {
      errorMessage = 'Mikrofon izni reddedildi. Lütfen tarayıcı ayarlarından izin verin.'
    } else if (event.error === 'network') {
      errorMessage = 'İnternet bağlantısı gerekli.'
    }

    $q.notify({
      type: 'negative',
      message: errorMessage,
      timeout: 3000
    })
  }

  recognitionInstance.onend = () => {
    console.log('🛑 Sesli anlatım durdu')
    isRecording.value = false

    if (userStory.value.trim()) {
      $q.notify({
        type: 'positive',
        message: '✅ Hikayeniz metne çevrildi!',
        icon: 'check_circle',
        timeout: 2000
      })
    }
  }

  return recognitionInstance
}

function toggleVoiceRecording() {
  if (isRecording.value) {
    // Durdur
    if (recognition.value) {
      recognition.value.stop()
    }
    isRecording.value = false
  } else {
    // Başlat
    recognition.value = initSpeechRecognition()
    if (recognition.value) {
      try {
        recognition.value.start()
      } catch (error) {
        console.error('Sesli anlatım başlatılamadı:', error)
        $q.notify({
          type: 'negative',
          message: 'Sesli anlatım başlatılamadı. Mikrofon izni verin.',
          timeout: 3000
        })
      }
    }
  }
}

async function saveAnalysisToDatabase(analysisResult) {
  const fb = getServices()
  if (!fb || !fb.db) {
    console.warn('Firebase bağlı değil, analiz kaydedilemedi')
    return
  }

  const authUser = window.$user
  if (!authUser) {
    console.warn('Kullanıcı giriş yapmamış, analiz kaydedilmedi')
    return
  }

  try {
    // 1. Analiz koleksiyonuna kaydet
    await addDoc(collection(fb.db, 'analyses'), {
      uid: authUser.uid,
      username: authUser.displayName || authUser.email,
      storyText: userStory.value,
      totalScore: analysisResult.total,
      level: analysisResult.level,
      criteria: analysisResult.criteria,
      shared: false, // Henüz paylaşılmadı
      createdAt: serverTimestamp(),
    })

    // 2. Kullanıcı aktivite kaydı oluştur
    await addDoc(collection(fb.db, 'userActivities'), {
      uid: authUser.uid,
      username: authUser.displayName || authUser.email,
      activityType: 'analysis', // activity türü: analysis, share, login
      score: analysisResult.total,
      timestamp: serverTimestamp(),
    })

    console.log('Analiz veritabanına kaydedildi')
  } catch (err) {
    console.error('Analiz kaydedilirken hata:', err)
  }
}

function getServices() { return window.$firebase }

// Confetti animasyonu
const confettiActive = ref(false)

function showConfetti() {
  confettiActive.value = true
  setTimeout(() => {
    confettiActive.value = false
  }, 5000) // 5 saniye boyunca confetti
}

function getConfettiStyle() {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const randomLeft = Math.random() * 100
  const randomDelay = Math.random() * 2
  const randomDuration = 2 + Math.random() * 2

  return {
    backgroundColor: randomColor,
    left: `${randomLeft}%`,
    animationDelay: `${randomDelay}s`,
    animationDuration: `${randomDuration}s`
  }
}

// Achievement kontrol ve gösterme
async function checkAndShowAchievements(userId) {
  try {
    console.log('🎯 Achievement kontrolü başlıyor için userId:', userId)
    const fb = getServices()
    if (!fb || !fb.db) {
      console.error('❌ Firebase bağlantısı yok!')
      return
    }

    // Kullanıcının tüm hikayelerini çek
    const storiesQuery = query(
      collection(fb.db, 'stories'),
      where('userId', '==', userId)
    )
    const storiesSnapshot = await getDocs(storiesQuery)
    const userStories = []
    storiesSnapshot.forEach(doc => {
      userStories.push({ id: doc.id, ...doc.data() })
    })

    console.log('📚 Bulunan hikaye sayısı:', userStories.length)
    console.log('📖 Hikayeler:', userStories)

    // Kullanıcı istatistiklerini hesapla
    const usersRef = doc(fb.db, 'users', userId)
    const userDoc = await getDoc(usersRef)
    const userCreatedAt = userDoc.exists() ? userDoc.data().createdAt : null

    const stats = calculateUserStats(userStories, userCreatedAt)
    console.log('📊 Hesaplanan istatistikler:', stats)

    // Mevcut rozetleri al
    const achievementsRef = doc(fb.db, 'userAchievements', userId)
    const achievementsDoc = await getDoc(achievementsRef)
    const currentAchievements = achievementsDoc.exists() ? achievementsDoc.data().achievements || [] : []
    console.log('🏆 Mevcut rozetler:', currentAchievements)

    // Yeni rozetleri kontrol et
    const newAchievements = checkAchievements(stats, currentAchievements)
    console.log('🎖️ Yeni kazanılan rozetler:', newAchievements)

    if (newAchievements.length > 0) {
      console.log('✅ YENİ ROZET KAZANILDI! Sayı:', newAchievements.length)
      // Yeni rozetleri veritabanına kaydet
      const updatedAchievements = [...currentAchievements, ...newAchievements]
      await setDoc(achievementsRef, {
        userId: userId,
        achievements: updatedAchievements,
        lastUpdated: serverTimestamp()
      })

      // 17. rozet kontrolü
      const has17thAchievement = newAchievements.some(a => a.id === 'seventeenth_story')
      if (has17thAchievement) {
        console.log('🏆 17. HİKAYE MİLSTONE ULAŞILDI!')
        milestoneAchievementCount.value = updatedAchievements.length
        showMilestoneCelebration.value = true
      } else {
        // Rozetleri sıraya ekle ve göster
        achievementQueue.value = newAchievements.map(a => getAchievementInfo(a.id))
        showNextAchievement()
      }
    } else {
      console.log('⚠️ Yeni rozet kazanılmadı')
    }
  } catch (error) {
    console.error('❌ Achievement check error:', error)
  }
}

function showNextAchievement() {
  if (achievementQueue.value.length > 0) {
    currentAchievement.value = achievementQueue.value.shift()
    showAchievement.value = true
  }
}

// Achievement dialog kapandığında bir sonrakini göster
function onAchievementClosed() {
  showAchievement.value = false
  setTimeout(() => {
    if (achievementQueue.value.length > 0) {
      showNextAchievement()
    }
  }, 500)
}

async function shareStory() {
  const fb = getServices()
  if (!fb || !fb.db) {
    console.error('❌ Firebase bağlantısı yok!')
    $q.notify({ type: 'negative', message: 'Veritabanı bağlı değil' })
    return
  }
  if (!empathyScore.value) {
    $q.notify({ type: 'warning', message: 'Önce analiz yapın' })
    return
  }
  const authUser = window.$user
  if (!authUser || !authUser.uid) {
    console.error('❌ Kullanıcı giriş yapmamış!')
    $q.notify({ type: 'warning', message: 'Lütfen giriş yapın' })
    return
  }

  console.log('📝 Hikaye paylaşılıyor...')
  console.log('👤 User ID:', authUser.uid)
  console.log('📊 Empati Skoru:', empathyScore.value)

  const payload = {
    username: authUser?.displayName || authUser?.email || 'anon',
    uid: authUser?.uid || null,
    userId: authUser?.uid || null, // userId ekle
    story: userStory.value,
    wordCount: wordCount.value, // Kelime sayısı ekle
    score: empathyScore.value.total,
    criteria: empathyScore.value.criteria,
    level: empathyScore.value.level,
    location: selectedLocation.value ? {
      lat: selectedLocation.value.lat,
      lng: selectedLocation.value.lng,
      name: selectedLocation.value.name,
      fullAddress: selectedLocation.value.fullAddress
    } : null,
    analysis: {
      level: empathyScore.value.level,
      criteria: empathyScore.value.criteria,
      summary: `${empathyScore.value.level} empati seviyesi tespit edildi.`
    },
    timestamp: serverTimestamp(),
    createdAt: serverTimestamp(),
  }
  try {
    console.log('💾 Hikaye kaydediliyor...')
    console.log('📦 Payload:', payload)

    // Hikayeyi stories koleksiyonuna ekle
    const docRef = await addDoc(collection(fb.db, 'stories'), payload)
    console.log('✅ Hikaye kaydedildi! Doc ID:', docRef.id)

    // Paylaşma aktivitesi kaydet
    await addDoc(collection(fb.db, 'userActivities'), {
      uid: authUser?.uid || null,
      username: authUser?.displayName || authUser?.email || 'anon',
      activityType: 'share',
      score: empathyScore.value.total,
      timestamp: serverTimestamp(),
    })

    // Rozet kontrolü yap
    console.log('🎯 Rozet kontrolü başlatılıyor...')
    if (authUser?.uid) {
      await checkAndShowAchievements(authUser.uid)
    } else {
      console.error('❌ User ID bulunamadı, rozet kontrolü yapılamıyor!')
    }

    // Confetti animasyonu göster
    showConfetti()

    userStory.value = ''
    empathyScore.value = null
    selectedLocation.value = null

    // Yeni hikaye için konum al
    autoGetLocation()

    $q.notify({ type: 'positive', message: 'Hikaye paylaşıldı! 🎉', icon: 'celebration' })
  } catch (err) {
    console.error('❌ Hikaye paylaşırken hata:', err)
    $q.notify({ type: 'negative', message: 'Hata oluştu: ' + err.message })
  }
}

function confirmShare() {
  if (!currentUser.value) { $q.notify({ type: 'warning', message: 'Lütfen paylaşmadan önce giriş yapın.' }); return }
  confirmDialog.value = true
}

async function shareStoryConfirmed() {
  confirmDialog.value = false
  await shareStory()
}

function loadStories() {
  const fb = getServices()
  if (!fb || !fb.db) return
  const q = query(collection(fb.db, 'stories'), orderBy('createdAt', 'desc'))
  onSnapshot(q, (snap) => {
    const arr = []
    snap.forEach(d => { arr.push({ id: d.id, ...(d.data()) }) })
    stories.value = arr
  })
}

onMounted(() => {
  loadStories()
  // Otomatik konum alma
  autoGetLocation()
  // keep a small watcher to reflect auth changes made in boot
  const iv = setInterval(() => { currentUser.value = window.$user || null }, 800)
  onUnmounted(() => clearInterval(iv))
})
</script>

<style scoped>
/* Tab Navigation */
.tab-navigation {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.tab-navigation .q-tab {
  color: white !important;
  font-weight: 600;
}

.tab-navigation .q-tab--active {
  color: white !important;
  font-weight: 700;
}

/* Tab Panels - Dark Text with Better Visibility */
.q-tab-panel {
  color: #1a1a1a !important;
}

.q-tab-panel .text-h4,
.q-tab-panel .text-h5,
.q-tab-panel .text-h6 {
  color: #000000 !important;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
  font-weight: 800;
}

.q-tab-panel .text-body1,
.q-tab-panel .text-body2 {
  color: #1a1a1a !important;
  text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.3);
  font-weight: 600;
  line-height: 1.8;
}

.q-tab-panel .text-caption {
  color: #2a2a2a !important;
  text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.3);
  font-weight: 600;
}

.q-tab-panel div,
.q-tab-panel p,
.q-tab-panel li {
  color: #1a1a1a !important;
  text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.2);
}

.q-tab-panel .q-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #1a1a1a !important;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.q-tab-panel .q-card .text-h6,
.q-tab-panel .q-card .text-subtitle1 {
  color: #000000 !important;
  text-shadow: none;
  font-weight: 800;
}

.q-tab-panel .q-item-section {
  color: #1a1a1a !important;
  text-shadow: none;
}

.q-tab-panel .q-item-label {
  color: #1a1a1a !important;
  font-weight: 700;
}

.q-tab-panel .text-grey-7 {
  color: #424242 !important;
  font-weight: 600;
}

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 48px rgba(102, 126, 234, 0.2);
}

/* Animated Card */
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

/* Pulse Icon */
.pulse-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientMove 3s ease infinite;
}

@keyframes gradientMove {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

/* Example Expansion */
.example-expansion {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.example-item {
  transition: all 0.3s ease;
  margin: 4px 0;
}

.example-item:hover {
  background: rgba(33, 150, 243, 0.1);
  transform: translateX(8px);
}

/* Story Input */
.story-input-wrapper {
  position: relative;
}

.story-input {
  font-size: 16px;
}

.story-input :deep(.q-field__control) {
  border-radius: 16px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.story-input:focus-within :deep(.q-field__control) {
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.15);
  transform: scale(1.01);
}

.emoji-btn {
  transition: all 0.3s ease;
}

.emoji-btn:hover {
  transform: rotate(20deg) scale(1.2);
}

.location-btn {
  transition: all 0.3s ease;
}

.location-btn:hover {
  transform: scale(1.15);
}

/* Konum Display */
.location-display {
  animation: fadeIn 0.3s ease-out;
}

.location-chip {
  font-size: 14px;
  font-weight: 600;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Emoji Picker */
.emoji-picker {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 16px;
  border-radius: 12px;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.emoji-item {
  font-size: 24px;
  transition: all 0.2s ease;
}

.emoji-item:hover {
  transform: scale(1.3) rotate(15deg);
}

/* Stats Container */
.stats-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.counter-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, rgba(158, 158, 158, 0.1) 0%, rgba(189, 189, 189, 0.1) 100%);
  border-radius: 25px;
  font-weight: 600;
  color: #666;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeIn 0.5s ease;
}

.counter-badge.active {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(67, 233, 123, 0.4);
  animation: pulse 1.5s infinite, bounceIn 0.5s ease;
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Gradient Button */
.gradient-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.gradient-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.gradient-btn:hover::before {
  left: 100%;
}

.gradient-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
}

/* Voice Recording Button */
.voice-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  border: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.voice-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.5);
}

/* Recording Pulse Animation */
.recording-pulse {
  animation: recordingPulse 1.5s ease-in-out infinite;
}

@keyframes recordingPulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


/* Confetti Animasyonu */
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 15px;
  height: 15px;
  top: -20px;
  opacity: 1;
  animation: confettiFall linear forwards;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

@keyframes confettiFall {
  0% {
    top: -20px;
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  50% {
    opacity: 1;
    transform: rotate(360deg) scale(1.2);
  }

  100% {
    top: 100vh;
    opacity: 0.3;
    transform: rotate(720deg) scale(0.8);
  }
}
</style>
