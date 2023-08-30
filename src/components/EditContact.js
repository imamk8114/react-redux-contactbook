import React, {useEffect, useState} from 'react';
import {Link, useParams,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify"


const EditContact = () => {
    const {id} = useParams();
    const contacts = useSelector(state => state)
    const currentContact = contacts.find(contact => contact.id === parseInt(id))

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [number, setNumber] = useState()
    
    useEffect(() => {
      if(currentContact){
        setName(currentContact.name)
        setEmail(currentContact.email)
        setNumber(currentContact.number)
      }
    }, [currentContact])
    
    const handleSubmit = (e) =>{
        e.preventDefault();

        const checkEmail = contacts.find( contact =>
            contact.id!== parseInt(id) && contact.email === email
        )

        if(!name || !email || !number){
            return toast.warning("Please fill in all details");
        }

        if(checkEmail){
            return toast.error("This email aleardy exists!");
        }

        const data ={
            id: parseInt(id),
            name,
            email,
            number
        }
        dispatch({type: "UPDATE_CONTACT", payload:data})
        toast.success("Contact updated successfully")
        navigate('/')
    }

  return (
    <div className='container'>
        {currentContact?(<>
        <h1 className='display-3 my-5 text-center'>Edit Contact {id}</h1>
        <div className='row'>
        <div className='col-md-6 shadow mx-auto p-5'>
            <form onSubmit={handleSubmit }>
                <div className='form-group mb-2'>
                    <input
                     type='text'
                     placeholder='Name' 
                     className='form-control'
                     value={name}
                     onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='form-group mb-2'>
                    <input
                     type='email' 
                     placeholder='Email' 
                     className='form-control'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='form-group mb-2'>
                    <input
                     type='number' 
                     placeholder='Phone Number' 
                     className='form-control'
                     value={number}
                     onChange={(e) => setNumber(e.target.value)}/>
                </div>
                <div className='form-group mt-4'>
                    <input type='submit' value='Update Student' className='btn btn-dark'/>
                    <Link to='/' className='btn btn-danger ml-3 ms-2'> Cancel </Link>
                </div>
            </form>
        </div>
        </div>
        </>):(
        <h1 className='display-3 my-5 text-center'>Contact with id {id} doesn't exists!</h1>
        )}
        
    </div>
  )
}

export default EditContact