import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AnimePreview } from './screens/AnimePreview'
import { HomeScreen } from './screens/HomeScreen'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/anime/:animeId">
          <AnimePreview />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
