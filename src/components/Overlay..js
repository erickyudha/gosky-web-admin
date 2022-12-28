import './Overlay.css';

export default function Overlay(props) {
  const { active, children } = props;
  return (
    <span id="overlay" className={(active) ? 'active' : ''}>{children}</span>
  )
};