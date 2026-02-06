import TitleH1 from './components/TitleH1/TitleH1'
import Paragraph from './components/Paragraph/Paragraph'
import Header from './layouts/Header/Header'
import Logo from './components/Logo/Logo'
import Nav from './components/Nav/Nav'
import Search from './components/Search/Search'
import FilmList from './components/FilmList/FilmList'
import FilmCard from './components/FilmCard/FilmCard'
import styles from './index.module.css'
import Login from './components/Login/Login'

const data = [
  {
    id: 1,
    title: "Black Widow",
    imgUrl: "/public/film-pic/pic1.jpg",
  },
  {
    id: 2,
    title: "Shang Chi",
    imgUrl: "/public/film-pic/pic2.jpg",
  },
  {
    id: 3,
    title: "Loki",
    imgUrl: "/public/film-pic/pic3.jpg",
  }
]

function App() {

  return (
    <>
      <Header>
        <Logo/>
        <Nav/>
      </Header>
      <div className={styles['wrapper']}>
        <TitleH1 title="Вход"/>
        <Login/>
        <TitleH1 title="Поиск"/>
        <Paragraph 
          text="Введите название фильма, сериала или мультфильма для поиска и добавления в избранное."
        />
        <Search/>
        <FilmList>
          {data.length > 0
            ? data
                .sort((a, b) => b.id - a.id)
                .map(el => (
                  <FilmCard
                    key={el.id}
                    title={el.title}
                    imgUrl={el.imgUrl}
                  />
                ))
            : <p>Нет записей</p>
          }
        </FilmList>
      </div>
    </>
  )
}

export default App
 