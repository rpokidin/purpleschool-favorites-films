import styles from './TitleH1.module.css'

function TitleH1({ title }) {

  return (
    <h1 className={styles['h1']}>{title}</h1>
  )
}

export default TitleH1
