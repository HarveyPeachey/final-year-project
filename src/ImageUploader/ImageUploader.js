import {useEffect, useState} from 'react';
import './ImageUploader.css';
import Button from '../Button/Button'
import {useDropzone} from 'react-dropzone';

const ImageUploader = () => {
  const [image, setImage] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setImage( Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])}));
    }
  });

  const ImagePreview = () => (<img src={image.preview} alt=''/>);

  useEffect(() => () => {
    URL.revokeObjectURL(image.preview);
  }, [image]);

  return (
    <>
    <ImagePreview/>
    <form>
      <div {...getRootProps({className: `${image.length === 0 ? 'dropzone' : 'dropzone-hidden'}`})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop your image here, or click to select an image</p>
      </div>
     <Button text="Commune"/>
    </form>
    </>
  );
}

export default ImageUploader;
