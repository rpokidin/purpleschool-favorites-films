import styles from './Paragraph.module.css'

function Paragraph({ text, size = 16 }) {

  return (
    <p 
      className={styles['paragraph']}
      style={{
        fontSize: `${size}px`,
      }}
    >{text}</p>
  )
}

export default Paragraph
