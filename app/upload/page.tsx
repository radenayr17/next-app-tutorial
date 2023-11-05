'use client';
import React, { useState } from 'react';
import { CldUploadWidget, CldUploadWidgetResults, CldImage } from 'next-cloudinary';

interface CloudinaryResult {
  public_id: string;
}

const uploadPreset: string = process.env.UPLOAD_PRESET || 'fruzyzlb';

const UploadPage = () => {
  const [publicId, setPublicId] = useState<string>('');

  const handleUpload = ({ event, info }: CldUploadWidgetResults, widget: any) => {
    if (event !== 'success') return;

    const result: CloudinaryResult = info as CloudinaryResult;

    setPublicId(result.public_id);
  };

  return (
    <>
      {publicId && <CldImage src={publicId} width={270} height={180} alt="cloudinary image" />}
      <CldUploadWidget
        uploadPreset={uploadPreset}
        onUpload={handleUpload}
        options={{ sources: ['local'], multiple: false }}
      >
        {({ open }) => (
          <button className="btn  btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
