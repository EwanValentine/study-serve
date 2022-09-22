import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

function ListTopics() {
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery(['topicsList'], () =>
    fetch('http://localhost:8000/topics').then(res =>
      res.json()
    )
  )

  const deleteMutation = useMutation(id => 
    fetch(`http://localhost:8000/topics/${id}`, {
      method: 'DELETE',     
    }).then(res => res.json()),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(['topicsList'])
      },
    }
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">Topics</h2>
      {data.length === 0 && <p>You don't currently have any topics, create one?</p>}
      {data.map(topic => (
        <div key={topic} className="flex flex-row align-middle space-x-3 h-16">
          <h3 className=""><Link to={`/topics/${topic}`}>{topic}</Link></h3>
          <p><button onClick={() => {
            deleteMutation.mutate(topic)
          }} className="text-md">x</button></p>
        </div>
      ))}
      <hr className="mt-4 mb-4" />
      <div className="mt-4">
        <Link to={"/topics/create"}>
          <button className="button">Create Topic</button>
        </Link>
      </div>
    </div>
  )
}

export default ListTopics