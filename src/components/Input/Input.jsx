import styles from './Input.module.css'

function Input({ 
  ico = null, 
  name = '', 
  placeholder = '',
  value = '',
  onChange = () => {},
}) {

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
      className={styles['input-default']}
      type="text" 
      placeholder={placeholder}
      name={name} 
      style={inputStyle}
      value={value}
      onChange={onChange}
      />
  )
}

export default Input
