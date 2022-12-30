import './Overlay.css';

export default function Overlay(props) {
  const {
    active = true,
    children = ''
  } = props;
  return (
    <span
      data-testid='overlay'
      id="overlay"
      className={(active) ? 'active' : ''}
    >{children}</span>
  )
};