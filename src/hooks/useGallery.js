import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// CHANGED: Added 'filterType' to the parameters
export const useGallery = (categoryName, sortBy, filterType) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryName) return;

    const fetchMedia = async () => {
      try {
        setLoading(true);
        setError(null);
        let query = supabase.from('media_files').select('*');
        
        // Filter by the category name
        query = query.eq('category', categoryName);

        // CHANGED: Conditionally filter by media type ('image' or 'video')
        // If the filterType is 'all', we don't add this filter.
        if (filterType === 'image' || filterType === 'video') {
          query = query.eq('type', filterType);
        }

        // Sort by creation date
        const isAscending = sortBy === 'oldest';
        query = query.order('created_at', { ascending: isAscending });

        const { data, error } = await query;
        if (error) throw error;
        if (data) setMedia(data);

      } catch (err) {
        setError(err.message);
        console.error("Error fetching media:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
    // CHANGED: Added 'filterType' to the dependency array
  }, [categoryName, sortBy, filterType]);

  return { media, setMedia, loading, error };
};