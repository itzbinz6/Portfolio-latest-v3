import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Loads every document in `collectionName`, sorted by its `order` field.
 * Mirrors the old site-data.js behavior: never throws to the UI, just
 * resolves to an empty array on failure so a page never breaks if
 * Firestore is unreachable or the collection hasn't been seeded yet.
 */
export function useCollection<T>(collectionName: string, limit?: number) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const q = query(collection(db, collectionName), orderBy('order'));
        const snap = await getDocs(q);
        if (cancelled) return;
        let docs = snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) }) as T);
        if (limit) docs = docs.slice(0, limit);
        setItems(docs);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [collectionName, limit]);

  return { items, loading };
}
