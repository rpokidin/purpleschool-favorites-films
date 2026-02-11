import styles from './TitleH1.module.css'
import type { TitleH1Props } from './TitleH1.props';

function TitleH1({ title }: TitleH1Props) {

  return (
    <h1 className={styles['h1']}>{title}</h1>
  )
}

export default TitleH1
