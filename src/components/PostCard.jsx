import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({$id, title, featuredImage}) {


  return (
    <Link to={`/post/${$id}`}>
        <div className='group block h-full w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-2xl shadow-[var(--shadow)]'>
            <div className='w-full h-48 sm:h-52 overflow-hidden rounded-xl bg-[var(--bg)] flex items-center justify-center mb-4'>
                <img src={service.getFilePreview(featuredImage)} alt={title} className='w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:scale-[1.03]'/>
            </div>
            <h2 className='text-lg font-bold text-[var(--text-h)] group-hover:text-indigo-400 transition-colors duration-200 text-left line-clamp-2 leading-snug'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard