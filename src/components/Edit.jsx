import  { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { database } from '../firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';

function Edit() {
  const location = useLocation()
  const data = location.state
  const [disdoc, setDisdoc] = useState(data.description)

  const editDescription = async () => {
    const document = doc(database, 'docsData', data.id)
    updateDoc(document, {
      description: disdoc
    })
  }

  const handleChange = (e) => {
    setDisdoc(e)
  }

  useEffect(() => {
    editDescription()
  }, [disdoc])

  return (
    <>
      <div  style={{ height: '100vh' }} className='container'>
        <div className='mt-3'>
            <Link to={'/'} style={{textDecoration:'none'}} className='btn btn-success'><i className='fa-solid fa-arrow-backward'></i> Go Back</Link>
        </div>
        <h2 className='mt-5 fw-bolder'>{data.title}</h2>
          <ReactQuill className='mt-2 '  placeholder='Type here....' theme="snow" value={disdoc} onChange={(e) => handleChange(e)} />
      </div>

    </>
  )
}

export default Edit