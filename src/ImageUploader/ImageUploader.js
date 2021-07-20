import './ImageUploader.css';
import Button from '../Button/Button'

const ImageUploader = () => {
  return (
    <form>
     <label for="img">Select image:</label>
     <input type="file" id="img" name="img" accept="image/*" />
     <Button text="Commune"/>
    </form>
  );
}

export default ImageUploader;
