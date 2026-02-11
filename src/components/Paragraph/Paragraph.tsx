import styles from './Paragraph.module.css'
import type { ParagraphProps } from './Paragraph.props';

function Paragraph({ text, size = 16 }: ParagraphProps) {

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
