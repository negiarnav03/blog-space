import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <button
            onClick={logoutHandler}
            className='inline-block px-4 py-2 text-rose-400 hover:text-rose-300 font-semibold transition-all duration-200 rounded-lg hover:bg-rose-500/10 border border-rose-500/20'
        >
            Logout
        </button>
    )
}

export default LogoutBtn