import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadMedia = async ({ file, caption_en, caption_ar, user, category }) => {
    try {
      setUploading(true);
      setError(null);
      setSuccess(false);

      if (!file) throw new Error('You must select a file to upload.');
      if (!user) throw new Error('You must be logged in to upload.');
      if (!category) throw new Error('You must select a category.');

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
      if (!publicUrl) throw new Error('Could not get public URL.');

      const { error: insertError } = await supabase
        .from('media_files')
        .insert({
          file_name: fileName,
          file_url: publicUrl,
          type: file.type.startsWith('image') ? 'image' : 'video',
          caption_en: caption_en,
          caption_ar: caption_ar,
          user_id: user.id,
          category: category,
        });
      if (insertError) throw insertError;
      
      setSuccess(true);
      return true;
    } catch (error) {
      setError(error.message);
      console.error(error);
      return false;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, error, success, uploadMedia };
};