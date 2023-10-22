import React from 'react';

export default function Dropdown({ data, label, title, multiple }) {
  return (
    <div>
      <label htmlFor={label} hidden>Select an Option</label>
      <select className='w-full py-2 px-1 rounded my-2 outline-none' name={label} id={label} multiple={multiple}>
        <option value="" >Select a {title}</option>
        {
          data.map((el, idx) => <option key={idx} className='mr-2' value={el.alias}>{el.name}</option>)
        }
      </select>
    </div>
  )
}
