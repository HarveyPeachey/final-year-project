import logo from '../logo.svg';
import './MessageBox.css';

const MessageBox = ({ message, isLoading }) => {
  return (
    <>
      <p className="MessageBox">{message}{isLoading && <img src={logo} className="loading" alt="logo" />}</p>
    </>
  );
}

export default MessageBox;
