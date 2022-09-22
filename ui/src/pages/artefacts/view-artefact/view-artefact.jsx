import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import Breadcrumb from '../../../components/shared/breadcrumb/breadcrumb'

function ViewArtefact() {
  const { artefact, topic } = useParams()

  const { isLoading, error, data } = useQuery(['artefactList'], () =>
    fetch(`http://localhost:8000/topics/${topic}/artefacts/${artefact}`).then(res =>
      res.json()
    )
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <Breadcrumb to={`/topics/${topic}`} text="Back to Topic" />

      <h2>View Artefact: {data.title}</h2>

      <hr />

      <div className="mt-4 mb-4">
        <p className="mb-4"><b>Content</b></p>
        <p>{data.content}</p>
      </div>
    </div>
  )
}

export default ViewArtefact