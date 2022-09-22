import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'

function CreateTopic() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const mutation = useMutation(data => fetch('http://localhost:8000/topics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }))

  console.log('is success: ', mutation.isSuccess)

  return (
    <div className="mt-2 text-center">
      <div className="block mb-2 w-full">
        <h2 className="text-lg mb-2">Create Topic</h2>        
      </div>

      {mutation.isSuccess && <Navigate to="/topics" />}
      <div className="w-full items-start">
        <form onSubmit={handleSubmit(mutation.mutate)}>
          <input
            defaultValue="my-topic"
            {...register("name") }
            placeholder="Title"
            className="form-input"
          />
          <button className="rounded-md bg-slate-300 p-2">Create Topic!</button>
          {errors.nameRequired && <span>This field is required</span>}
        </form>

        {mutation.isError && <p className="text-red-400 mb-2 mt-2">There was an error creating the topic</p>}
      </div>
    </div>
  )
}

export default CreateTopic