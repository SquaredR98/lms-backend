import React, { useState } from 'react'
import roles from '../constants/roles'
import permissions from '../constants/permissions'
import Select from 'react-select'

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    permissions: [],
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: [event.target.value] })
  }

  return (
    <div className='my-2 p-4 bg-blue-200 rounded'>
      <h3 className='text-xl font-bold mb-4'>Add a new User</h3>
      <form action="">
        <div>
          <label htmlFor='name' hidden>Name</label>
          <input id='name' value={formData.name} className='w-full py-2 px-2 outline-none my-2 rounded' type='text' placeholder='Enter Name' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='email' hidden>Email</label>
          <input id='email' className='w-full py-2 px-2 outline-none my-2 rounded' type='text' placeholder='Enter Email' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='password' hidden>Password</label>
          <input id='password' className='w-full py-2 px-2 outline-none my-2 rounded' type='password' placeholder='Enter Password' onChange={handleChange} />
        </div>
        <Select className='my-4 mt-2' defaultValue={formData.role} name="role" placeholder="Select a Role" options={roles} handleChange={handleChange} />
        <Select className='my-4 mb-2' defaultValue={formData.permissions} name='permissions' placeholder="Select Permissions" options={permissions} isMulti handleChange={handleChange} />
      </form>
    </div>
  )
}
