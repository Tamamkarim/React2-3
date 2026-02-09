import {useRef, useState, type ChangeEvent} from 'react';
import useForm from '../hooks/formHooks.ts';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const initValues = {title: '', description: ''};

  const doUpload = async () => {
    setUploading(true);
    setError('');
    setSuccessMessage('');
    const token = localStorage.getItem('token');
    if (!file || !token) {
      console.log('doUpload file or token falsy');
      setError('Please choose a file and make sure you are logged in.');
      setUploading(false);
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
      setSuccessMessage('Upload completed (simulated).');
    } catch (error) {
      console.log((error as Error).message);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
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
    <section className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-lg border border-stone-500/70 bg-stone-700/40 p-6 shadow"
      >
        <h2 className="text-xl font-semibold">Upload media</h2>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="title">
            Title
          </label>
          <input
            className="rounded-md border border-stone-400 bg-stone-700/60 px-3 py-2 text-stone-50 outline-none transition focus:border-stone-200 focus:ring-2 focus:ring-stone-300/40"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="description">
            Description
          </label>
          <textarea
            className="min-h-[120px] rounded-md border border-stone-400 bg-stone-700/60 px-3 py-2 text-sm text-stone-50 outline-none transition focus:border-stone-200 focus:ring-2 focus:ring-stone-300/40"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="file">
            File
          </label>
          <input
            className="block w-full cursor-pointer rounded-md border border-dashed border-stone-400 bg-stone-700/40 px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-stone-500 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-stone-600"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            ref={fileRef}
          />
        </div>
        <div className="mt-2 flex gap-3">
          <button
            className="rounded-md bg-stone-500 px-4 py-2 text-sm font-semibold text-stone-50 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-500/60"
            type="submit"
            disabled={!file || uploading}
          >
            {uploading ? 'Uploading...' : 'Start upload'}
          </button>
          <button
            className="rounded-md border border-stone-400 px-4 py-2 text-sm font-semibold text-stone-100 transition hover:bg-stone-600/60"
            type="button"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </form>

      <aside className="flex flex-col items-center gap-4 rounded-lg border border-stone-500/70 bg-stone-700/40 p-6 text-sm shadow">
        <p className="font-medium text-stone-100">Preview</p>
        <img
          className="h-auto w-full max-w-xs rounded-md border border-stone-500/60 bg-stone-800 object-contain"
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/320x240?text=Choose+image'
          }
          alt="preview"
        />
        <p className="text-xs text-stone-300/80">
          Choose an image or video file to see a preview before uploading.
        </p>
      </aside>
      {error && (
        <p className="mt-3 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
      {successMessage && (
        <p className="mt-3 text-sm text-emerald-400">{successMessage}</p>
      )}
    </section>
  );
};
export default Upload;