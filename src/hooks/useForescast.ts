import React, { ChangeEvent, useEffect, useState } from 'react'
import { forecastType, optionType } from '../types'

export default function useForescast() {
  const [term, setTerm] = useState<string>('')
  const [city, setCity] = useState<optionType | null>(null)
  const [options, setOptions] = useState<[]>([])
  const [forecast, setForecast] = useState<forecastType | null>(null)

  const [recentSearches, setRecentSearchs] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedRecentSearchs = localStorage.getItem('recentSearches')
      return savedRecentSearchs ? JSON.parse(savedRecentSearchs) : []
    }
    return []
  })

  const removeSearch = (index: number) => {
    // Crie uma cópia do array recentSearchs
    const updatedSearches = [...recentSearches]

    // Remova o item pelo índice
    updatedSearches.splice(index, 1)

    // Atualize o estado recentSearchs e o localStorage
    setRecentSearchs(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
  }

  useEffect(() => {
    if (recentSearches.length > 0) {
      // Atualiza o localStorage com a lista atualizada
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
    }
  }, [recentSearches])

  const getSearchOptions = (value: string) => {
    fetch(
      ` https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((e) => console.log(e))
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(value)

    if (value === '') return setOptions([])

    getSearchOptions(value)
  }

  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        }
        setForecast(forecastData)
      })
      .catch((e) => console.log(e))
  }

  const onSubmit = () => {
    if (!city) return

    // Atualiza o estado recentSearchs antes de salvar no localStorage
    const updatedSearches = [...recentSearches, city]
    setRecentSearchs(updatedSearches)

    // Atualiza o localStorage com a lista atualizada
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches))

    getForecast(city)
  }

  const onOptionSelect = (option: optionType) => {
    setCity(option)
  }

  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
  }, [city])

  return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
    removeSearch,
    getForecast,
    recentSearches,
  }
}
