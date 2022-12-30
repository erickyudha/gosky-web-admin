import './Alert.css'

export default function Alert(props) {
  const {
    active,
    type,
    message,
  } = props;

  return (
    <span
      data-testid='alert'
      className={`alert ${type} ${(active) ? 'active' : ''}`}>
      {message}
    </span>
  )
}