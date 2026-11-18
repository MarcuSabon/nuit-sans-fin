import { useEffect, useState } from 'react'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../lib/firebase'

/**
 * Écoute une collection Firestore en temps réel.
 * const { data, loading, error } = useCollection('messages', { orderField: 'createdAt' })
 */
export function useCollection(name, { orderField, direction = 'desc', max = 50 } = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(Boolean(db))
  const [error, setError] = useState(db ? null : new Error('Firebase non configuré'))

  useEffect(() => {
    if (!db) return undefined
    const constraints = orderField ? [orderBy(orderField, direction), limit(max)] : [limit(max)]
    const q = query(collection(db, name), ...constraints)
    return onSnapshot(
      q,
      (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )
  }, [name, orderField, direction, max])

  return { data, loading, error }
}
