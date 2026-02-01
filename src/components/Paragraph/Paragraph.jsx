import './Paragraph.css'

function Paragraph({ text, size }) {

  return (
    <p style={{
      fontSize: `${size}px`,
    }}>{text}</p>
  )
}

export default Paragraph
