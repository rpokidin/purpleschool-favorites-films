import './Input.css'

function Input({ ico = null, name = '', placeholder = '' }) {

  const inputStyle = {
    backgroundPosition: '16px center',
    backgroundRepeat: 'no-repeat',
    paddingLeft: '16px',
  }

  if (ico != null) {
    inputStyle.backgroundImage = `url(${ico})`;
    inputStyle.paddingLeft = '56px';
  }

  return (
    <input 
      type="text" 
      placeholder={placeholder}
      name={name} 
      style={inputStyle}
      />
  )
}

export default Input
