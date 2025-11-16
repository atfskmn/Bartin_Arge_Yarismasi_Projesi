<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg" style="max-width:480px; width:100%">
      <q-card-section>
        <div class="text-h6">Giriş / Kayıt</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="displayName" label="Kullanıcı adı (kayıt için)" />
        <q-input v-model="email" label="E-posta" type="email" class="q-mt-sm" />
        <q-input v-model="password" label="Parola" type="password" class="q-mt-sm" />

        <div class="row q-mt-md q-gutter-sm">
          <q-btn color="primary" label="Giriş Yap" @click="login" :loading="loading" />
          <q-btn color="secondary" label="Kayıt Ol" @click="register" :loading="loading" />
        </div>

        <div class="q-mt-md">
          <q-btn flat label="Empati Sayfasına Git" to="/empathy" />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat color="negative" label="Çıkış Yap" @click="logout" v-if="user" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'

const $q = useQuasar()
const { appContext } = getCurrentInstance()
const router = useRouter()
const email = ref('')
const password = ref('')
const displayName = ref('')
const loading = ref(false)
const user = ref(window.$user || null)

function getServices() {
  // prefer global window helper if available
  const fb = window.$firebase || appContext.config.globalProperties.$firebase
  return fb || {}
}

async function register() {
  const { auth, db } = getServices()
  if (!auth) return
  if (!email.value || !password.value) { $q.notify({ type: 'warning', message: 'E-posta ve parola gerekli' }); return }
  loading.value = true
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)
    if (displayName.value) {
      await updateProfile(cred.user, { displayName: displayName.value })
    }
    // Save minimal user profile to Firestore
    await setDoc(doc(db, 'users', cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: displayName.value || cred.user.email,
      createdAt: new Date().toISOString(),
    })

    // Kayıt aktivitesi kaydet (ağ hatası olsa bile devam et)
    try {
      await addDoc(collection(db, 'userActivities'), {
        uid: cred.user.uid,
        username: displayName.value || cred.user.email,
        activityType: 'register',
        timestamp: serverTimestamp(),
      })
    } catch (activityErr) {
      console.warn('Aktivite kaydedilemedi:', activityErr)
    }

    user.value = cred.user
    $q.notify({ type: 'positive', message: 'Kayıt başarılı! Yönlendiriliyorsunuz...' })

    // Kısa bir gecikme ile yönlendir
    setTimeout(() => {
      router.push('/empathy')
    }, 500)
  } catch (err) {
    console.error(err)
    let errorMsg = 'Kayıt hatası'

    // Kullanıcı dostu hata mesajları
    if (err.code === 'auth/email-already-in-use') {
      errorMsg = 'Bu e-posta adresi zaten kullanımda'
    } else if (err.code === 'auth/invalid-email') {
      errorMsg = 'Geçersiz e-posta adresi'
    } else if (err.code === 'auth/weak-password') {
      errorMsg = 'Parola çok zayıf (en az 6 karakter)'
    } else if (err.code === 'auth/network-request-failed') {
      errorMsg = 'İnternet bağlantınızı kontrol edin'
    } else if (err.message && err.message.includes('Missing or insufficient permissions')) {
      errorMsg = 'Firebase güvenlik kuralları henüz güncellenmemiş. Lütfen FIREBASE_SETUP.md dosyasını kontrol edin.'
    } else {
      errorMsg = err.message || 'Kayıt hatası'
    }

    $q.notify({ type: 'negative', message: errorMsg, timeout: 5000 })
  } finally {
    loading.value = false
  }
}async function login() {
  const { auth, db } = getServices()
  if (!auth) return
  if (!email.value || !password.value) {
    $q.notify({ type: 'warning', message: 'E-posta ve parola gerekli' })
    return
  }
  loading.value = true
  try {
    const cred = await signInWithEmailAndPassword(auth, email.value, password.value)
    user.value = cred.user

    // Giriş aktivitesi kaydet (ağ hatası olsa bile devam et)
    try {
      await addDoc(collection(db, 'userActivities'), {
        uid: cred.user.uid,
        username: cred.user.displayName || cred.user.email,
        activityType: 'login',
        timestamp: serverTimestamp(),
      })
    } catch (activityErr) {
      console.warn('Aktivite kaydedilemedi:', activityErr)
    }

    $q.notify({ type: 'positive', message: 'Giriş başarılı! Yönlendiriliyorsunuz...' })

    // Kısa bir gecikme ile yönlendir
    setTimeout(() => {
      router.push('/empathy')
    }, 500)
  } catch (err) {
    console.error(err)
    let errorMsg = 'Giriş hatası'

    // Kullanıcı dostu hata mesajları
    if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
      errorMsg = 'E-posta veya parola hatalı'
    } else if (err.code === 'auth/network-request-failed') {
      errorMsg = 'İnternet bağlantınızı kontrol edin'
    } else if (err.code === 'auth/too-many-requests') {
      errorMsg = 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin'
    } else if (err.code === 'auth/user-disabled') {
      errorMsg = 'Bu hesap devre dışı bırakılmış'
    } else {
      errorMsg = err.message || 'Giriş hatası'
    }

    $q.notify({ type: 'negative', message: errorMsg })
  } finally {
    loading.value = false
  }
}

async function logout() {
  const { auth } = getServices()
  if (!auth) return
  try {
    await signOut(auth)
    user.value = null
    $q.notify({ type: 'info', message: 'Çıkış yapıldı' })
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Çıkış hatası' })
  }
}

onMounted(() => {
  // reflect any auth changes
  setInterval(() => { user.value = window.$user || null }, 800)
})
</script>
