import { useState } from 'react';
import './App.css';
import Header from '../Header/Header'
import MessageBox from '../MessageBox/MessageBox'
import ImageUploader from '../ImageUploader/ImageUploader'

const App = () => {
  const [message, setMessage] = useState('Please place your mighty weapon of Rock before us:');
  const isLoading = message === 'The Rock gods are convening, please wait for their verdict...';

  const handleHasImage = () => {
    setMessage('Now commune with the Rock gods!');
  }

  const handleImageUpload = (e, image) => {
    setMessage('The Rock gods are convening, please wait for their verdict...');
    e.preventDefault();
    console.log(image);
  }

  return (
    <div className="App">
      <Header/>
      <MessageBox message={message} isLoading={isLoading}/>
      <ImageUploader handleHasImage={handleHasImage} handleImageUpload={handleImageUpload}/>
    </div>
  );
}

export default App;
