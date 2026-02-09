import {useRef, useState, type ChangeEvent} from 'react';
import useForm from '../hooks/formHooks.ts';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const initValues = {title: '', description: ''};

  const doUpload = async () => {
    setUploading(true);
    const token = localStorage.getItem('token');
    if (!file || !token) {
      console.log('doUpload file or token falsy');
      return;
    }
    try {
      // TODO: implement real upload using API once available
      console.log('Simulating upload with file and metadata', {
        file,
        inputs,
        token,
      });
      // reset form (or redirect to home view)
      resetForm();
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const {handleInputChange, handleSubmit, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files);
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
    console.log(fileRef.current?.value);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <>
      <h2>Upload</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            ref={fileRef}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/320x240?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button type="submit">Start upload</button>
      </form>
      <button onClick={resetForm}>Reset</button>
      {uploading && <p>Uploading...</p>}
    </>
  );
};
export default Upload;