import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import Breadcrumb from '../../../components/shared/breadcrumb/breadcrumb'

import CreateArtefact from '../../artefacts/create-artefact/create-artefact'

function ViewTopic() {
  const { topic } = useParams()
  const mutation = useMutation(term =>
    fetch(`http://localhost:8000/topics/${topic}/artefacts/search/${term}`, {}).then(res => res.json())
  )

  return (
    <div>
      <Breadcrumb to="/topics" text="Back to Topics" />

      <h2 className="title mb-8">View Topic: {topic}</h2>

      <h3 className="mt-4 mb-4">Search Artefacts for this Topic</h3>

      <div className="mt-4 mb-4 pb-4 pt-4">
        <div className="mt-4 mb-4">
          <input
            className="input"
            name="term" onKeyUp={(e) => mutation.mutate(e.target.value)}
            placeholder="Search Artefacts"
          />
        </div>

        {mutation.data?.length === 0 ? (
          <>
            <p className="mt-4 mb-4">No artefacts found</p>
          </>
        ) : (
          <div className="mb-4 mt-4">
            {mutation.data?.map(artefact => (
              <div key={artefact._id}>
                <p><b><Link to={`/topics/${topic}/artefacts/${artefact._id}`}>{artefact._source.title}</Link></b></p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      
      <hr />

      <div className="mt-4 mb-4">
        <Link to={`/topics/${topic}/artefacts/create`}>
          <button className="button">Create Artefact</button>
        </Link>
      </div>
    </div>
  )
}

export default ViewTopic