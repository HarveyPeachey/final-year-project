import {useEffect, useState} from 'react';
import './ImageUploader.css';
import Button from '../Button/Button'
import {useDropzone} from 'react-dropzone';

const ImageUploader = ( {handleHasImage, handleImageUpload} ) => {
  const [image, setImage] = useState([]);
  const [hasUploaded, setHasUploaded] = useState(false);
  const hasImage = image.length !== 0;

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setImage(Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])}))
      handleHasImage();
    }
  });

  const handleOnSubmit = (e) => {
    setHasUploaded(true);
    handleImageUpload(e, image);
  }

  const ImagePreview = () => (<img src={image.preview} alt=''/>);

  useEffect(() => () => {
    URL.revokeObjectURL(image);
  }, [image]);

  return (
    <>
    <ImagePreview/>
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <div {...getRootProps({className: `${!hasImage ? 'dropzone' : 'dropzone-hidden'}`})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop your image here, or click to select an image</p>
      </div>
     {!(hasImage && hasUploaded) && <Button text="Commune" />}
    </form>
    </>
  );
}

export default ImageUploader;
