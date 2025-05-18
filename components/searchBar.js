import { useState } from 'react';
import yts from 'yt-search';
import axios from 'axios';

const SearchBar = ({ setResults, setLoading, setError }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // First try to search for videos
      const searchResults = await yts(query);
      if (searchResults.videos.length > 0) {
        const firstVideo = searchResults.videos[0];
        const videoUrl = `https://youtube.com/watch?v=${firstVideo.videoId}`;
        
        // Then fetch download info from API
        const apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${videoUrl}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.success) {
          setResults({
            ...response.data.result,
            title: firstVideo.title,
            thumbnail: firstVideo.thumbnail
          });
        } else {
          setError('Failed to get download information');
        }
      } else {
        setError('No videos found');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter YouTube URL or search term"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
