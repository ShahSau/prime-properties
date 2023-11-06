import { FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LanguageDropdown from './LanguageDropdown'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice'

export default function Header() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const handleSignOut = async () => {

    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      // setFetchError(error.message)

      dispatch(deleteUserFailure())
    }
  }

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Prime</span>
            <span className='text-slate-700'>Properties</span>
          </h1>
        </Link>

        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              {t('header.home')}
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              {t('header.about')}
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
            ) : (
              <li className=' text-slate-700 hover:underline'>{t('header.signin')}</li>
            )}
          </Link>
          <LanguageDropdown />
          {currentUser ? (
            <FaSignOutAlt onClick={handleSignOut} className='text-red-700 cursor-pointer text-2xl'/>
          ) : (
            ''
          )}
        </ul>
      </div>
    </header>
  )
}