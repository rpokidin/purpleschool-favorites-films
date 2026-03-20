import { Outlet } from 'react-router-dom';
import Logo from '../../components/Logo/Logo'
import Nav from '../../components/Nav/Nav'
import styles from './HeaderLayouts.module.css'

export const HeaderLayouts = () => {

  return (
    <>
    <header className={styles['header']}>
      <div className={styles['header__wrapper']}>
        <Logo />
        <Nav />
      </div>
    </header>
    <div className='wrapper'>
      <Outlet />
    </div>
    </>
  )
}