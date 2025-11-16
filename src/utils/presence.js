import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export async function initUserPresence(user) {
  if (!user) return

  const db = window.$firebase?.db
  if (!db) return

  const userPresenceRef = doc(db, 'userPresence', user.uid)

  // Kullanıcı çevrimiçi durumunu güncelle
  const updatePresence = async () => {
    try {
      await setDoc(
        userPresenceRef,
        {
          uid: user.uid,
          displayName: user.displayName || null,
          email: user.email,
          isOnline: true,
          lastSeen: serverTimestamp(),
        },
        { merge: true },
      )
      console.log('✅ Presence güncellendi:', user.email)
    } catch (error) {
      console.error('❌ Presence güncelleme hatası:', error)
    }
  }

  // İlk güncelleme
  await updatePresence()

  // Her 30 saniyede bir güncelle (daha dinamik)
  const presenceInterval = setInterval(updatePresence, 30 * 1000)

  // Sayfa kapanınca veya kullanıcı çıkış yapınca temizle
  window.addEventListener('beforeunload', async () => {
    clearInterval(presenceInterval)
    try {
      await setDoc(
        userPresenceRef,
        {
          isOnline: false,
          lastSeen: serverTimestamp(),
        },
        { merge: true },
      )
    } catch {
      // Ignore errors on unload
    }
  })

  // Visibility API kullanarak sekme değişimlerini takip et
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      updatePresence()
    }
  })

  return presenceInterval
}

export async function updateUserPresence(user) {
  if (!user) return

  const db = window.$firebase?.db
  if (!db) return

  const userPresenceRef = doc(db, 'userPresence', user.uid)

  try {
    await setDoc(
      userPresenceRef,
      {
        isOnline: true,
        lastSeen: serverTimestamp(),
      },
      { merge: true },
    )
  } catch (error) {
    console.error('Error updating presence:', error)
  }
}

export async function setUserOffline(user) {
  if (!user) return

  const db = window.$firebase?.db
  if (!db) return

  const userPresenceRef = doc(db, 'userPresence', user.uid)

  try {
    await setDoc(
      userPresenceRef,
      {
        isOnline: false,
        lastSeen: serverTimestamp(),
      },
      { merge: true },
    )
  } catch (error) {
    console.error('Error setting user offline:', error)
  }
}
