import React from 'react'

const ChartsHeader = ({ category, title }) => {
  return (
    <div className=" mb-10">
    <div>
      <p className="text-lg text-gray-400">Heart</p>
      <p className="text-3xl font-extrabold tracking-tight dark:text-gray-200 text-slate-900">Rate</p>
    </div>
    <p className="text-center dark:text-gray-200 text-xl mb-2 mt-3">Nirav Joshi</p>
  </div>
  )
}

export default ChartsHeader