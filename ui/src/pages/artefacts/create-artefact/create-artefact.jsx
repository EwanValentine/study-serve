import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router'
import Breadcrumb from '../../../components/shared/breadcrumb/breadcrumb'

function CreateArtefact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { topic } = useParams()

  const mutation = useMutation(data =>
    fetch(`http://localhost:8000/topics/${topic}/artefacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json())
  )

  return (
    <div className="mt-4 mb-4">
      <Breadcrumb to={`/topics/${topic}`} text="Back to Topic" />
      <h3 className="title">Create Artefact</h3>
      <div>{mutation.isSuccess && <p>Artefact added to search!</p>}</div>
      {mutation.loading ? <p>Creating artefact...</p> : (
        <form onSubmit={handleSubmit((data) => {
          mutation.mutate(data)
          reset()
        })}>
          <input className="form-input" name="title" {...register("title", { required: true }) } placeholder="Title" />
          <textarea placeholder="Content" className="textarea" name="content" {...register("content", { required: true }) }></textarea>
          <input className="form-input" name="tags" {...register("tags", { required: true }) } placeholder="Tags (comma separated)" />
          <button className="button" type="submit">Create Artefact</button>
          {errors.titleRequired && <span>This field is required</span>}
        </form>
      )}
      
    </div>
  )
}

export default CreateArtefact