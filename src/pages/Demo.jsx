// Page de test : vérifie que Firestore fonctionne (lecture temps réel + écriture).
// À supprimer ou à transformer le jour J.
import { useState } from 'react'
import { isFirebaseConfigured } from '../lib/firebase'
import { addMessage } from '../lib/messages'
import { useCollection } from '../hooks/useCollection'

export default function Demo() {
  const { data, loading, error } = useCollection('messages', { orderField: 'createdAt' })
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const value = text.trim()
    if (!value || !isFirebaseConfigured) return
    setSending(true)
    try {
      await addMessage(value)
      setText('')
    } finally {
      setSending(false)
    }
  }

  return (
    <section>
      <h1>Démo base de données</h1>
      {error && <p className="alert">Erreur : {error.message}</p>}

      <form onSubmit={handleSubmit} className="row">
        <label htmlFor="msg" className="visually-hidden">
          Message
        </label>
        <input
          id="msg"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écris un message…"
          maxLength={280}
        />
        <button className="btn" disabled={sending || !isFirebaseConfigured}>
          Envoyer
        </button>
      </form>

      {loading ? (
        <p>Chargement…</p>
      ) : (
        <ul className="list">
          {data.map((m) => (
            <li key={m.id}>{m.text}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
