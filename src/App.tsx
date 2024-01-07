import { Forecast } from "./components/Forecast"
import { RecentSearches } from "./components/RecentSearches"
import Search from "./components/Search"
import useForescast from "./hooks/useForescast"

const App = (): JSX.Element => {

  const {
    term, options, forecast, onInputChange, onOptionSelect, onSubmit, removeSearch, getForecast, recentSearches
  } = useForescast()

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 bg-sky-950 to-lime-100 h-[100vh] w-full min-h-[900px]">
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <>
          <Search
            term={term}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
          {recentSearches.length > 0 ? (
            <RecentSearches
              recentSearches={recentSearches}
              removeSearch={removeSearch}
              getForecast={getForecast}
            />
          ) : ''}

        </>
      )}
    </main>
  )
}

export default App
