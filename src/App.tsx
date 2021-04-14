import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AnimePreview } from './screens/AnimePreview'
import { HomeScreen } from './screens/HomeScreen'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/anime/:animeId">
          <AnimePreview />
        </Route>
        <Route path="/" component={HomeScreen} />
      </Switch>
    </Router>
  )
}

export default App
