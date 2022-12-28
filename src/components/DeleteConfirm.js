import './DeleteConfirm.css';
import Overlay from './Overlay.';

export default function DeleteConfirm(props) {
  const { active, message, cancelHandler, deleteHandler } = props;

  return (
    <Overlay active={active}>
      <div className='delete-confirm'>
        <span>{message}</span>
        <div className='control'>
          <button className='cancel-btn' onClick={cancelHandler}>Cancel</button>
          <button className='delete-btn' onClick={deleteHandler}>Delete</button>
        </div>
      </div>
    </Overlay>
  );
};