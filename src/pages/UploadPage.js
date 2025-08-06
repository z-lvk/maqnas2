import React, { useState } from 'react';
import { useUploader } from '../hooks/useUploader';
import { useAuth } from '../hooks/useAuth';

const categories = [
  'مقناص محمية المرزوم',
  'مقناص منقوليا',
  'مقناص تلال العين'
];

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [captionEn, setCaptionEn] = useState('');
  const [captionAr, setCaptionAr] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  
  const { user } = useAuth();
  const { uploading, error, success, uploadMedia } = useUploader();

  const processFile = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleFileChange = (event) => { processFile(event.target.files[0]); };
  const handleDragOver = (event) => { event.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (event) => { event.preventDefault(); setIsDragging(false); };
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    processFile(event.dataTransfer.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uploadSuccess = await uploadMedia({ file, caption_en: captionEn, caption_ar: captionAr, user, category });
    if (uploadSuccess) {
      setFile(null);
      setPreviewUrl(null);
      setCaptionEn('');
      setCaptionAr('');
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="font-title text-4xl md:text-5xl font-bold text-center mb-8 text-white">Upload Media</h1>
      <div className="max-w-2xl mx-auto bg-brand-dark-light p-8 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-brand-gray">Category</label>
              <select 
                id="category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full bg-brand-dark border-gray-600 rounded-md shadow-sm text-white focus:ring-navy focus:border-navy"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-brand-gray">Media File</label>
              <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md transition-colors ${isDragging ? 'border-navy-light bg-navy' : ''}`}>
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <div className="flex text-sm text-gray-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-brand-dark rounded-md font-medium text-navy-light hover:text-indigo-400 focus-within:outline-none"><span>Upload a file</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,video/*" /></label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Images and videos of any size</p>
                </div>
              </div>
            </div>
            {previewUrl && (
              <div className="text-center">
                <h3 className="text-lg font-medium text-white mb-2">Preview</h3>
                {file.type.startsWith('image') ? <img src={previewUrl} alt="Preview" className="max-h-60 mx-auto rounded-lg" /> : <video src={previewUrl} controls className="max-h-60 mx-auto rounded-lg" />}
              </div>
            )}
            <div>
              <label htmlFor="caption-en" className="block text-sm font-medium text-brand-gray">English Caption</label>
              <input type="text" id="caption-en" value={captionEn} onChange={(e) => setCaptionEn(e.target.value)} className="mt-1 block w-full bg-brand-dark border-gray-600 rounded-md shadow-sm text-white focus:ring-navy focus:border-navy" />
            </div>
            <div>
              <label htmlFor="caption-ar" className="block text-sm font-medium text-brand-gray">Arabic Caption</label>
              <input type="text" id="caption-ar" value={captionAr} onChange={(e) => setCaptionAr(e.target.value)} dir="rtl" className="mt-1 block w-full bg-brand-dark border-gray-600 rounded-md shadow-sm text-white focus:ring-navy focus:border-navy" />
            </div>
          </div>
          <div className="mt-8">
            <button type="submit" disabled={uploading || !file} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-light disabled:opacity-50 disabled:cursor-not-allowed">
              {uploading ? 'Uploading...' : 'Upload Now'}
            </button>
          </div>
          {success && <p className="mt-4 text-center text-green-400">Upload successful!</p>}
          {error && <p className="mt-4 text-center text-red-400">Error: {error}</p>}
        </form>
      </div>
    </div>
  );
};
export default UploadPage;