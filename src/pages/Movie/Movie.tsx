import { useParams } from "react-router-dom"

const Movie = () => {

  const { id } = useParams()

  return <>
    Movie - {id}
  </>
}

export default Movie;