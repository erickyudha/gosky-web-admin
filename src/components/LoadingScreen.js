import Overlay from "./Overlay.";
import './LoadingScreen.css';

export default function LoadingScreen(props) {
  const { active } = props;

  return (
    <Overlay active={active}>
      <img className='loading-spinner' alt='loading-spinner' src="/loading.svg" />
    </Overlay>
  )
}