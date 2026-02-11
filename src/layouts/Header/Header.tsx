import styles from './Header.module.css'
import type { HeaderProps } from './Header.props';

function Header({ children }: HeaderProps) {

  return (
    <header className={styles['header']}>
      <div className={styles['header__wrapper']}>{children}</div>
    </header>
  )
}

export default Header
