import styles from './Button.module.css'
import type { ButtonProps } from './Button.props'

const Button = ({ children, className, ...props }: ButtonProps) => {

  return (
    <button className={styles['btn']} {...props}>
      {children}
    </button>
  )
}

export default Button
