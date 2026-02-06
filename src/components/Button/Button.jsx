import styles from './Button.module.css'

function Button({ name }) {

  return (
    <button className={styles['btn']}>{name}</button>
  )
}

export default Button
