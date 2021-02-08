import { useState, useEffect, useCallback } from 'react'

export function useFetch(url) {
  const [data, setData] = useState([])

  const getData = useCallback(async () => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            'e773b95eddmsh42dc3a5e97faf70p18ed16jsnc858ed5e7a68',
          'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com',
        },
      })
      const data = await res.json()
      setData(data)
    } catch (error) {
      throw new Error(error)
    }
  }, [url])

  useEffect(() => {
    getData()
  }, [getData])
  return { data }
}
