import React, { useContext, useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import useUserAuth from '../hooks/useUserAuth'
import { userUserStats } from '../hooks/useUserStats'
import { UserContext } from '../context/UserContext'
import ModalCarrito from '../components/Modal/ModalCarrito'


import Searcher from '../components/Searcher'

import UserNoLogin from '../assets/images/StaticImages/User_noLogin.svg'
import UserLogin from '../assets/images/StaticImages/User_Login.svg'
import shopCar from '../assets/images/StaticImages/carritoCompra.svg'
import Facebook from '../assets/images/Facebook.svg'
import Whatsapp from '../assets/images/Whatsapp.svg'
import Instagram from '../assets/images/Instagram.svg'
import TikTok from '../assets/images/TikTok.svg'
import AccesoryTec from '../assets/images/AccesoryTec.svg'

const PrimaryLayout = () => {
  const navigate = useNavigate()
  const {totalValor,setTotalValor} = useContext(UserContext)
  const [ModalOpen,setModalOpen] = useState(false)
  const [user,setUser]=useState({
    showMenu: false,
    image: UserNoLogin,
  })
  const {isAuth} = useUserAuth()

  useEffect(()=>{
    const asignarValor = async() =>{
        const {obtenerCarrito} = userUserStats()
        const valor = await obtenerCarrito()
        setTotalValor(valor)
    }
    asignarValor()
},[])
  useState(()=>{
    if (isAuth) {
      setUser({...user,image: UserLogin})
    }else{
      setUser({...user,image: UserNoLogin})
    }
  },[])
  
  const handleShowMenu = ()=>{
    const show= user.showMenu
    setUser({...user,showMenu:!show})
  }
  const handleRedirect = (page)=>{
    if (page==='logout') {
      localStorage.removeItem('datosUsuario')
      page='login'
    }
    navigate(`/${page}`)
  }
  const handleOpenModal = () =>{
    setModalOpen(true)
  }
  return (
    <>
        <header className='flex justify-between bg-[#17823C] h-[7.875ren] items-center px-4'>
            <section className='flex gap-3 items-center py-2'>
              <Link to="/"><img src={AccesoryTec} alt="Logo" className='rounded-full bg-white mr-4 h-[5rem] w-[5rem]' /></Link>
              <Searcher/>
            </section>
            <section>
              <span className='text-3xl text-white font-bold cursor-pointer' onClick={()=>navigate('/productos')}> | Nuestros productos | </span>
            </section>
            <section className='flex gap-3'>
              <div className='flex bg-[#138F84] items-center px-4 rounded-lg gap-4 text-white' onClick={handleOpenModal}>
                <img src={shopCar} alt='carrito' />
                <label className='text-4xl font-bold'>{totalValor.toFixed(2)}</label>
              </div>
              <div>
                <img src={user.image} alt="Usuario" onClick={handleShowMenu} className='cursor-pointer bg-white rounded-full p-2' />
                <div className='bg-[#17823C] absolute top-[96px] right-0 w-[200px] rounded-b-lg px-3'>
                  {user.showMenu && (
                    <ul className='cursor-pointer font-semibold text-[1.2rem] p-2 text-white'>
                      {isAuth ? (
                        <>
                        <li onClick={()=>handleRedirect('compras')}>Mis compras</li>
                        <li onClick={()=>handleRedirect('datos')}>Mis datos</li>
                        <li onClick={()=>handleRedirect('logout')}>Cerrar sesión</li>
                        </>
                      ):(
                        <>
                        <li onClick={()=>handleRedirect('register')}>Registrarse</li>
                        <li onClick={()=>handleRedirect('login')}>Ingresar</li>
                        </>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </section>
        </header>
        <ModalCarrito isOpen={ModalOpen} onClose={()=>{setModalOpen(false)}}/>
        <main>
            <Outlet/>
            
        </main>
        <footer className='bg-black grid grid-cols-3 px-10 py-4 text-white'>
          <section className='flex flex-col gap-3 items-center justify-center '>
            <h2 className='text-3xl text-center font-semibold underline '>Hecho por el Grupo 4:</h2>
            <ul className='text-1xl list-disc ml-2'>
              <li>Raul Villavicencio</li>
              <li>Quispe Felix Esthuardo</li>
              <li>Marcel Artica</li>
              <li>Miguel Gutierrez</li>
            </ul>
          </section>
          <section className=' flex flex-col col-span-2 items-center'>
            <div className='grid grid-cols-2 gap-20'>
              <div className='flex flex-col gap-5'>
                <div className='flex gap-5 items-center'>
                  <img src={Facebook} alt="Facebook" />
                  <h3 className='text-2xl'>@AccesoriosTec</h3>
                </div>
                <div className='flex gap-5 items-center'>
                  <img src={Whatsapp} alt="Whatsapp" />
                  <h3 className='text-2xl'>+51 111111111</h3>
                </div>
              </div>
              <div className='flex flex-col gap-5'>
                <div className='flex gap-5 items-center'>
                  <img src={Instagram} alt="Instagram" />
                  <h3 className='text-2xl'>@AccesoriosTec</h3>
                </div>
                <div className='flex gap-5 items-center'>
                  <img src={TikTok} alt="TikTok" />
                  <h3 className='text-2xl'>@AccesoriosTec</h3>
                </div>
              </div>
            </div>
            <div className='flex flex-col mt-5'>
              <h2>Puedes escribirnos al: </h2>
              <h3 className='ml-4'>accesoriosTec@proyecto.com</h3>
            </div>
          </section>
        </footer>
    </>
  )
}

export default PrimaryLayout