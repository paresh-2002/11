import { Container } from 'react-bootstrap'
import useFetchJobs from './components/useFetchJobs';

function App() {
  const { jobs, loading, error } = useFetchJobs()

 console.log(jobs);
 

  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs && <h1>{jobs.length}</h1>}
     
    </Container>
  )
}

export default App;