import { Link } from 'react-router-dom'

function Breadcrumb(props) {
  return (
    <>
      <div className="mb-4 border-b border-solid border-gray-500 text-sm">
        <Link to={props.to}>
          <p className="mb-4">{props.text}</p>
        </Link>
      </div>
    </>
  )
}

export default Breadcrumb
