import './Header.css'

function Header({ children }) {

  return (
    <header>
      <div className='wrapper'>{children}</div>
    </header>
  )
}

export default Header
