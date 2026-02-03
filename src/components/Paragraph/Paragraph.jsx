import './Paragraph.css'

function Paragraph({ text, size = 16 }) {

  return (
    <p style={{
      fontSize: `${size}px`,
    }}>{text}</p>
  )
}

export default Paragraph
