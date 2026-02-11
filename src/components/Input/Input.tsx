import styles from './Input.module.css'
import type { InputStyle, InputProps } from './Input.props';

const Input = ({ ico = null, onChange, ...props}: InputProps) => {

  const inputStyle: InputStyle = {
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
      style={inputStyle}
      onChange={onChange}
      {...props}
      />
  )
}

export default Input
