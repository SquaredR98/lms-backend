import React from 'react'
import Layout from '../components/Layout'

export default function HomePage() {
  return (
    <Layout>
        <div className='flex my-4'>
        <div className='p-6 bg-blue-100 border rounded-lg border-gray-300 xl:w-1/4 mx-2'>
          <p className='text-lg'>Total Revenue</p>
          <p className='text-4xl'>50,000</p>
        </div>
        <div className='p-6 bg-blue-100 border rounded-lg border-gray-300 xl:w-1/4 mx-2'>
          <p className='text-lg'>Total Sales</p>
          <p className='text-4xl'>50,000</p>
        </div>
        <div className='p-6 bg-blue-100 border rounded-lg border-gray-300 xl:w-1/4 mx-2'>
          <p className='text-lg'>Total Sales</p>
          <p className='text-4xl'>50,000</p>
        </div>
        </div>
    </Layout>
  )
}
