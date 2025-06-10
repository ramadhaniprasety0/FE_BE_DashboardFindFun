import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PopularComponentMusic = ({ limit = 10 }) => {
  const [musics, setMusics] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchLatestMusic = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/popular-latest?limit=${limit}`);
        if (!response.ok) {
          // Penanganan error yang lebih baik
          let errorMessage;
          if (response.status === 404) {
            errorMessage = "Data musik tidak ditemukan";
          } else {
            try {
              const errorData = await response.json();
              errorMessage = errorData.error || `Gagal mengambil data: ${response.status}`;
            } catch (e) {
              errorMessage = `Gagal mengambil data: ${response.status}`;
            }
          }
          throw new Error(errorMessage);
        }
        const data = await response.json();
        if (data && data.success) {
          setMusics(data.data); 
        } else {
          throw new Error(data.error || "Format data dari API tidak sesuai");
        }
      } catch (err) {
        console.error("Error fetching latest music:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestMusic();
  }, [limit]); 

  if (loading) {
    return <div className="text-center mt-3">Memuat musik populer...</div>;
  }

  if (error) {
    return <div className="text-center mt-3 text-danger">Error: {error}</div>;
  }

  if (!musics || musics.length === 0) { // Periksa juga !musics
    return <div className="text-center mt-3">Tidak ada musik untuk ditampilkan.</div>;
  }

  return (
    <div className="horizontal-scroll-wrapper">
      <div className="horizontal-scroll-content">
        {musics.map((music) => ( 
          <div key={music.id} className="music-popular-item-scroll">
            <Link
              to={`/Music/${music.id}`} 
              className="text-decoration-none"
            >
              <div className="music-popular-card">
                <img
                  src={music.image || 'https://placehold.co/280x266/EBF4FA/1F2937?text=No+Image'} 
                  alt={music.title || "Gambar Musik"}
                  className="music-popular-image"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/280x266/EBF4FA/1F2937?text=Error';}}
                />
                <div className="music-popular-info"> 
                  <p className="music-popular-title">{music.title || "Judul Tidak Ada"}</p>
                  {/* Perhatikan: Model getAllComplete Anda menghasilkan 'artists' (jamak) */}
                  <p className="music-popular-artist">{music.artists || music.artist || "Artis Tidak Ada"}</p>
                  <div className="music-popular-controls">
                    <div className="icon-group-left">
                      <i className="fa-solid fa-download"></i>
                      <i className="fa-regular fa-heart"></i>
                      <i className="fa-solid fa-ellipsis"></i>
                    </div>
                    <div className="icon-group-right">
                      <div className="play-button">
                        <i className="fa-solid fa-play"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularComponentMusic;
