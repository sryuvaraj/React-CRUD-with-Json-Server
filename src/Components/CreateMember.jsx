import axios from 'axios'
import React, { useState } from 'react'

const CreateMember = ({members, setMembers}) => {

  const membersAPI = "http://localhost:3001/members"

  const [initialVals, setInitialVals] = useState({
    name:"",
    email:"",
    phone:"",
    designation:"",
    experience:""
  })

  const handleChnage = (e) => {
    const {name,value} = e.target
    setInitialVals({...initialVals,[name]:value})
  }

  const addMember = (e) => {
    e.preventDefault()
    setMembers([...members, initialVals])
    axios.post(membersAPI,initialVals)
    setInitialVals({
      name:"",
      email:"",
      phone:"",
      designation:"",
      experience:""
    })
  }
  return (
    <>
    <div>
      <div className='d-flex justify-content-center'>
        <form onSubmit={addMember} style={{width:"100vh"}}>
          <h3 className='text-center text-success'>Create Member</h3>
          <div className='form-group'>
            <label>Name :</label>
            <input type='text' className='form-control' name="name" value={initialVals.name} onChange={handleChnage} required/>
          </div>
          <div className='form-group'>
            <label>Email :</label>
            <input type='email' className='form-control' name='email' value={initialVals.email} onChange={handleChnage}  required/>
          </div>
          <div className='form-group'>
            <label>Phone :</label>
            <input type='number' className='form-control' name='phone' value={initialVals.phone} onChange={handleChnage}  required/>
          </div>
          <div className='form-group'>
            <label>Designation :</label>
            <input type='text' className='form-control' name='designation' value={initialVals.designation} onChange={handleChnage}  required/>
          </div>
          <div className='form-group'>
            <label>Experience :</label>
            <input type='number' className='form-control' name='experience' value={initialVals.experience} onChange={handleChnage}  required/>
          </div>
          <button type='submit' className='btn btn-success mt-3'>Submit</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default CreateMember