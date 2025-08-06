import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGallery } from '../hooks/useGallery';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabaseClient';
import Modal from '../components/Modal';

// ADDED: Helper function to create thumbnail URLs from Supabase Storage
const getThumbnailUrl = (url) => {
  // This requests a 400x400 cropped, web-optimized version of the image.
  return `${url}?width=400&height=400&resize=cover&quality=75`;
};

const Gallery = () => {
  const { categoryName } = useParams();
  const decodedCategoryName = decodeURIComponent(categoryName || '');

  const [sortBy, setSortBy] = useState('latest');
  const [filterType, setFilterType] = useState('all'); 
  const [selectedMedia, setSelectedMedia] = useState(null);
  
  const { media, setMedia, loading, error } = useGallery(decodedCategoryName, sortBy, filterType);
  const { user } = useAuth();
  
  const uploaderEmail = 'karimsahib@gmail.com'; 
  const isUploader = user?.email === uploaderEmail;

  const handleDelete = async (itemToDelete) => {
    if (!window.confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
      return;
    }
    try {
      await supabase.storage.from('media').remove([itemToDelete.file_name]);
      await supabase.from('media_files').delete().eq('id', itemToDelete.id);
      setMedia(media.filter(item => item.id !== itemToDelete.id));
      setSelectedMedia(null);
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Error deleting file: ' + error.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download file.');
    }
  };
  
  const SortButton = ({ type, children }) => (
    <button onClick={() => setSortBy(type)} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${sortBy === type ? 'bg-navy text-white shadow-md' : 'bg-brand-dark-light text-brand-gray hover:bg-gray-700'}`}>{children}</button>
  );
  
  const FilterButton = ({ type, children }) => (
    <button onClick={() => setFilterType(type)} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filterType === type ? 'bg-navy text-white shadow-md' : 'bg-brand-dark-light text-brand-gray hover:bg-gray-700'}`}>{children}</button>
  );

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="font-titleArabic text-4xl md:text-5xl font-bold text-center mb-8 text-white" dir="rtl">
          {decodedCategoryName}
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <FilterButton type="all">All</FilterButton>
            <FilterButton type="image">Images</FilterButton>
            <FilterButton type="video">Videos</FilterButton>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">Sort by:</span>
            <SortButton type="latest">Latest</SortButton>
            <SortButton type="oldest">Oldest</SortButton>
          </div>
        </div>
        
        {loading && <div className="text-center p-12 text-white">Loading gallery...</div>}
        {error && <div className="text-center p-12 text-red-500">Error: {error}</div>}

        {!loading && !error && (
          <>
            {media.length === 0 ? (
              <div className="text-center p-12"><p className="text-brand-gray">No media found for the selected filter.</p></div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {media.map((item) => (
                  <div key={item.id} className="group bg-brand-dark-light rounded-lg shadow-lg overflow-hidden cursor-pointer relative aspect-w-1 aspect-h-1" onClick={() => setSelectedMedia(item)}>
                    {/* CHANGED: Use getThumbnailUrl for images. Added lazy loading. */}
                    <img 
                      src={item.type === 'image' ? getThumbnailUrl(item.file_url) : item.file_url} 
                      alt={item.caption_en || 'Gallery media'} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                      {item.type === 'video' && (
                        <svg className="h-16 w-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <Modal isOpen={!!selectedMedia} onClose={() => setSelectedMedia(null)}>
        {selectedMedia && (
          <div className="flex flex-col h-full">
            <div className="flex-grow flex items-center justify-center">
              <img src={selectedMedia.file_url} alt={selectedMedia.caption_en || ''} className="max-w-full max-h-[70vh] object-contain" />
            </div>
            <div className="flex-shrink-0 p-4 text-white">
              <p className="font-sans font-bold">{selectedMedia.caption_en}</p>
              <p className="font-arabic" dir="rtl">{selectedMedia.caption_ar}</p>
              <p className="text-sm text-brand-gray mt-2">{formatDate(selectedMedia.created_at)}</p>
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <button onClick={() => handleDownload(selectedMedia.file_url, selectedMedia.file_name)} className="flex-1 px-4 py-2 bg-navy hover:bg-navy-light text-white font-bold rounded-md transition-colors">Download</button>
                {isUploader && (
                  <button onClick={() => handleDelete(selectedMedia)} className="flex-1 px-4 py-2 bg-maroon hover:bg-maroon-dark text-white font-bold rounded-md transition-colors">Delete</button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Gallery;