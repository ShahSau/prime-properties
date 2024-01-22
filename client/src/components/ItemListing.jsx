import React from 'react'
import { AiOutlineLink,AiTwotoneDelete } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const ItemListing = ({ listing, onDelete }) => {
  const { t, i18n } = useTranslation()
  return (
    <div className="py-4 ">
      <div className="shadow-xl group container shadow-stone-500 rounded-md bg-white  max-w-sm flex justify-center items-center  mx-auto content-div">
        <div>
          <img
            src={
              listing.imageUrls[0]
            }
            alt='listing cover'
            className='h-[320px] sm:h-[220px] w-full object-cover group-hover:opacity-25'
          />
          <div className="py-8 px-4 bg-white  rounded-b-md fd-cl group-hover:opacity-25">
            <span className="block text-lg text-gray-800 font-bold tracking-wide truncate "> {listing.name}</span>
            <span  className="block text-gray-600 text-sm">
              {i18n.language === 'en' ?  listing.description_en.substring(0, 300)+ '...' : i18n.language === 'fi' ? listing.description_fi.substring(0, 300)+ '...' : listing.description_de.substring(0, 300)+ '...'}
            </span>
          </div>
        </div>
        <div className="absolute opacity-0 group-hover:opacity-100">
          <div className="pt-8 text-center mx-auto mt-10 grid max-w-lg grid-cols-3 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none">
            <Link to={`/listing/${listing._id}`}>
              <AiOutlineLink className="text-3xl text-center text-gray-700 cursor-pointer font-bold" />
            </Link>
            <Link to={`/update-listing/${listing._id}`}>
              <FiEdit2 className="text-3xl text-center text-gray-700 cursor-pointer font-bold" />
            </Link>
            <button>
              <AiTwotoneDelete className="text-3xl text-center text-gray-700 cursor-pointer font-bold" onClick={() => onDelete(listing._id)} />
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ItemListing