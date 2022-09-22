import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import Layout from './layouts/main/main'

// Pages 
import Home from './pages/home/home'
import ViewTopic from './pages/topics/view-topic/view-topic'
import ListTopics from './pages/topics/list-topics/list-topics'
import ViewArtefact from './pages/artefacts/view-artefact/view-artefact'
import CreateTopic from './pages/topics/create-topic/create-topic'
import CreateArtefact from './pages/artefacts/create-artefact/create-artefact'

import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="topics" element={<ListTopics />} />
            <Route path="topics/:topic" element={<ViewTopic />} />
            <Route path="topics/:topic/artefacts/:artefact" element={<ViewArtefact />} />
            <Route path="topics/create" element={<CreateTopic />} />
            <Route path="topics/:topic/artefacts/create" element={<CreateArtefact />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
