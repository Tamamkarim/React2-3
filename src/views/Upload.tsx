import { useState } from 'react';

const Upload = () => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 1500); // simulate upload
  };

  return (
    <div>
      <h2>Upload</h2>
      <button onClick={handleUpload}>Start Upload</button>
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default Upload;