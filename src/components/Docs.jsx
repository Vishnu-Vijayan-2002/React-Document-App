import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Modal, Button,Form,Card } from 'react-bootstrap'
import { addDoc,doc,deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import { database } from '../firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

function Docs() {
    const navigate = useNavigate()
    const [reload, setReload] = useState('')
    const [docData, setDocData] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const editData=(data)=>{
    //     navigate('/edit/:id',{state:data})

    // }

    const collectionRef = collection(database, 'docsData')
    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocData(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }))
        })
    }
    
    
    const handleChange=(e)=>{
        setTitle(e)
    }

    const addData = async () => {
        await addDoc(collectionRef, {
            title: title,
            description: ""
        })
        setReload(title)
    }
    useEffect(() => {
        getData()
    }, [reload])
 

    const handleAdd=()=>{
        addData()
       toast.info(`${title} added successfully`)
        handleChange('')
        setShow(false)

    }
    
    const handleDelete = async (id) => {
        const docRef = doc(database, 'docsData', id);
        await deleteDoc(docRef)
         toast.warning('Document deleted')
        
        getData(); 
    }

    const getedit = (data) => {
      navigate('/edit',{state:data})

    }


    return (
        <>
        <Header/>
            <div className='container-fluid'>
               
                <div className='d-flex justify-content-center mt-5'>
                    <Button className='shadow' style={{background:'blue',height:'50px', width:'190px'}}  onClick={handleShow}>
                        Add a document
                    </Button>
                </div>

                <div className='row mt-5 '>
                  

                    {docData?.length > 0 ? docData.map((data) => (
                        <div className='col-lg-4 mb-4 ms-3' key={data.id} style={{ width: '300px', cursor: 'pointer' }} > 
                            <Card className='shadow' style={{ width: '18rem',background:'' }}>
                                <Card.Body>
                                    <Card.Title style={{color:'#474747'}}  className='fw-bolder fs-3 py-1 text-info'>{data.title}</Card.Title>
                                    <hr />
                                    <Card.Text style={{fontFamily:"Poppins , sans-serif"}}>{data.description ? data.description.replace(/<[^>]+>/g, '') : ''}</Card.Text>
                                    <div className='d-flex justify-content-end'>
                                        <button onClick={() => getedit(data)} className='btn text-success'><i className="fa-solid fa-pen-to-square py-1"></i></button>
                                        <button onClick={() => handleDelete(data.id)} className='btn text-danger'><i className="fa-solid fa-trash py-1"></i></button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )) : <h4 className='text-warning text-center'>no documents added...</h4>}
                      
                </div>
            </div>
        
            <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputC"
                        type="text"
                        placeholder="Add title"
                        value={title}
                        onChange={(e)=>handleChange(e.target.value)}

                    />
                    <label htmlFor="floatingInputCustom">Add title</label>
                </Form.Floating>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleAdd} variant="primary">
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
        </>
    )
}

export default Docs