import './App.css'
import Button from './components/Button/Button'
import TitleH1 from './components/TitleH1/TitleH1'
import Paragraph from './components/Paragraph/Paragraph'


function App() {

  return (
    <>
      <TitleH1 title="Поиск"/>
      <Paragraph 
        text="Введите название фильма, сериала или мультфильма для поиска и добавления в избранное."
        size={16}
      />
      <Button name="Искать"/>
    </>
  )
}

export default App
