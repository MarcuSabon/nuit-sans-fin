// Accès à la collection `messages`. Exemple : await addMessage('Bonjour')
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export async function addMessage(text) {
  if (!db) throw new Error('Firebase non configuré')
  await addDoc(collection(db, 'messages'), { text, createdAt: serverTimestamp() })
}
