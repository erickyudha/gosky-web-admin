import './Alert.css'

export default function Alert(props) {
  const {
    active,
    type,
    message,
  } = props;

  return (
    <span className={`alert ${type} ${(active) ? 'active' : ''}`}>
      {message}
    </span>
  )
}