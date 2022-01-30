import { Fragment, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { Dialog, Transition } from '@headlessui/react'

import useStore from "../../store";

export default function TopNavigation() {
  const history = useHistory();
  let [isOpen, setIsOpen] = useState(false)
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [invalidLogin, setInvalidLogin] = useState(false)
  const isLogged = useStore(state => state.isLogged)
  const setIsLogged = useStore(state => state.setIsLogged)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function logout() {
    setIsLogged(false)
  }

  function login() {
    if(email === 'test@email.com' && password === 'password') {
      setIsLogged(true)
      setInvalidLogin(false)
      history.push("/home")
      closeModal()
    } else {
      setIsLogged(false)
      setInvalidLogin(true)
    }
  }

  function renderLoginForm() {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Login
                </Dialog.Title>
                <div className="w-full relative rounded-2xl shadow-sm my-8">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="focus:ring-indigo-500 block w-full pl-7 pr-12 py-3 sm:text-sm border-gray-300 rounded-2xl focus:border-transparent focus:outline-none ring-1 ring-blue-500"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="w-full relative rounded-2xl shadow-sm my-8">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="focus:ring-indigo-500 block w-full pl-7 pr-12 py-3 sm:text-sm border-gray-300 rounded-2xl focus:border-transparent focus:outline-none ring-1 ring-blue-500"
                  />
                </div>
                <button className="bg-blue-500 hover:bg-blue-400 w-full text-xl rounded-2xl text-white py-1.5 focus:outline-none" onClick={login}>Login</button>
                {invalidLogin && (<p className="text-red-700">Invalid email or password</p>)}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  }

  return (
    <>
      <header className="h-20 items-center relative z-10">
        <div className="flex flex-center flex-col h-full justify-center mx-auto relative px-3 text-white z-10">
          <div className="flex items-center pl-1 relative w-full sm:ml-0 sm:pr-2 lg:max-w-68">
            <div className="flex items-center justify-center ml-5 p-1 relative w-full sm:mr-0 sm:right-auto">
              <Link to="/" className="block pr-5">
                Home
              </Link>
              <Link to="/trade" className="block pr-5">
                Trade
              </Link>
            </div>
            <div className="container flex right-0 relative w-16">
              <div className="group hidden items-center relative w-full md:flex lg:w-72">
                {isLogged ? (
                  <Link to="#" className="block" onClick={logout}>
                    Log out
                  </Link>
                ): (
                  <Link to="#" className="block" onClick={openModal}>
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {renderLoginForm()}
    </>
  );
}
