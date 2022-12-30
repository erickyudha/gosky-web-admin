import './DeleteConfirm.css';
import Overlay from './Overlay.';

export default function DeleteConfirm(props) {
  const {
    active = true,
    message = '',
    cancelHandler,
    deleteHandler,
  } = props;

  return (
    <Overlay active={active}>
      <div className='delete-confirm'>
        <span data-testid='dc-message'>{message}</span>
        <div className='control'>
          <button data-testid='dc-cancel' className='cancel-btn' onClick={cancelHandler}>Cancel</button>
          <button data-testid='dc-delete' className='delete-btn' onClick={deleteHandler}>Delete</button>
        </div>
      </div>
    </Overlay>
  );
};