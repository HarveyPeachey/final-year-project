import './App.css';
import Header from '../Header/Header'
import MessageBox from '../MessageBox/MessageBox'
import ImageUploader from '../ImageUploader/ImageUploader'

const App = () => {

  const message = "Please place your mighty weapon of Rock before us";

  return (
    <div className="App">
      <Header/>
      <MessageBox message={message}/>
      <ImageUploader/>
    </div>
  );
}

export default App;
