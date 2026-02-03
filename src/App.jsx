import TitleH1 from './components/TitleH1/TitleH1'
import Paragraph from './components/Paragraph/Paragraph'
import Header from './layouts/Header/Header'
import Logo from './components/Logo/Logo'
import Nav from './components/Nav/Nav'
import Search from './components/Search/Search'


function App() {

  return (
    <>
      <Header>
        <Logo/>
        <Nav/>
      </Header>
      <div className='wrapper'>
        <TitleH1 title="Поиск"/>
        <Paragraph 
          text="Введите название фильма, сериала или мультфильма для поиска и добавления в избранное."
        />
        <Search/>
      </div>
    </>
  )
}

export default App
