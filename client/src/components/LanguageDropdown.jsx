import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import Flag from 'react-world-flags'


const locales = {
  en: { title: 'English', flag:'gb' },
  de: { title: 'Deutsch', flag:'de' },
  fi: { title: 'Suomi',flag:'fi' },
}

export const LanguageDropdown = () => {
  const { t, i18n } = useTranslation()
  console.warn('i18n.resolvedLanguage',locales[i18n.resolvedLanguage])
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center  text-gray-900 shadow-lg">
          <Flag code={`${locales[i18n.resolvedLanguage].flag}`} height='26' width='26'/>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-14 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {Object.keys(locales).map((locale) => (
              locales[i18n.resolvedLanguage].flag !== locales[locale].flag &&
              <Menu.Item key={locale}>
                {({ active }) => (
                  <button
                    className='block px-4 py-2 text-sm opacity-50 hover:opacity-100'
                    type='submit'
                    onClick={() => i18n.changeLanguage(locale)}
                  >
                    <Flag code={`${locales[locale].flag}`} height='56' width='56'/>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}


export default LanguageDropdown