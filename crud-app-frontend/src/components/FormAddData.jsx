import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const FormAddData = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [release_year, setReleaseYear] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [status_film, setStatus] = useState("");
  const [netflix, setNetflix] = useState("");
  const [appletv, setAppletv] = useState("");
  const [hbogo, setHbogo] = useState("");
  const [bioskop, setBioskop] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [actor, setActor] = useState("");
  const [director, setDirector] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [dataFilms, setDataFilms] = useState([]);

  // Validasi film yang sudah ada
  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/films");
      setDataFilms(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle image file change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const filePreview = URL.createObjectURL(file);
      setPreviewImage(filePreview);
    }
  };

  // Tambah Data Film with file upload
  const handleAddData = async (e) => {
    e.preventDefault();
    
    // Validasi data
    const existingFilm = dataFilms.find(film => film.title.toLowerCase() === title.toLowerCase());
    if (existingFilm) {
      return Swal.fire('Gagal!', 'Film dengan judul tersebut sudah ada.', 'error');
    }

    if (!title || !description || !release_year || !rating || !genre || !duration || !actor || !director || !status_film) {
      return Swal.fire('Gagal!', 'Harap lengkapi semua bidang yang diperlukan.', 'error');
    }

    try {
      setSubmitting(true);
      
      // Create FormData object for file upload
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("release_year", release_year);
      formData.append("rating", rating);
      formData.append("genre", genre);
      formData.append("duration", duration);
      formData.append("actor", actor);
      formData.append("director", director);
      formData.append("status_film", status_film);
      formData.append("netflix", netflix);
      formData.append("appletv", appletv);
      formData.append("hbogo", hbogo);
      formData.append("bioskop", bioskop);
      
      // Append image file if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }
      
      await axios.post("http://localhost:3000/api/films", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log(JSON.formData);

      Swal.fire('Berhasil!', 'Film berhasil ditambahkan.', 'success');
      navigate("/dashboard/films");
    } catch (error) {
      console.error(error);
      console.error(error.response.data);
      Swal.fire('Gagal!', 'Terjadi kesalahan saat menambahkan film.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <div className="container">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="card-title m-0">Tambah Film Baru</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddData}>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Judul <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Masukkan judul film"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="release_year" className="form-label">Tahun Rilis <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    id="release_year"
                    value={release_year}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    min="1900"
                    max={currentYear + 5}
                    required
                    placeholder="Contoh: 2023"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Deskripsi <span className="text-danger">*</span></label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Masukkan deskripsi atau sinopsis film"
              ></textarea>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="genre" className="form-label">Genre <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                    placeholder="Contoh: Action, Drama, Comedy"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="rating" className="form-label">Rating <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    className="form-control"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                    placeholder="Skala 0-10"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">Durasi (menit) <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="1"
                    required
                    placeholder="Contoh: 120"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">Poster Film</label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <small className="text-muted">
                Format yang didukung: JPG, JPEG, PNG, GIF (max: 5MB)
              </small>
              {previewImage && (
                <div className="mt-2">
                  <p className="text-muted">Preview:</p>
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    style={{ height: '150px', objectFit: 'cover' }}
                    className="img-thumbnail"
                  />
                </div>
              )}
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="actor" className="form-label">Aktor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="actor"
                    value={actor}
                    onChange={(e) => setActor(e.target.value)}
                    placeholder="Nama aktor (pisahkan dengan koma)"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="director" className="form-label">Sutradara</label>
                  <input
                    type="text"
                    className="form-control"
                    id="director"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    placeholder="Nama sutradara"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="status_film" className="form-label">Status <span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    id="status_film"
                    value={status_film}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="">Pilih Tayang</option>
                    <option value="1">Tayang di Platform</option>
                    <option value="2">Tayang di Cinema</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="netflix" className="form-label">Link Netflix</label>
                  <input type="string" className="form-control" id="netflix" value={netflix} onChange={(e) => setNetflix(e.target.value)} placeholder="Masukkan link Netflix" />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="appletv" className="form-label">Link Apple TV</label>
                  <input type="string" className="form-control" id="appletv" value={appletv} onChange={(e) => setAppletv(e.target.value)} placeholder="Masukkan link Apple TV" />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="hbogo" className="form-label">Link Hbo Go</label>
                  <input type="string" className="form-control" id="hbogo" value={hbogo} onChange={(e) => setHbogo(e.target.value)} placeholder="Masukkan link Hbo Go" />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="bioskop" className="form-label">Link Penayangan Bioskop</label>
                  <input type="string" className="form-control" id="bioskop" value={bioskop} onChange={(e) => setBioskop(e.target.value)} placeholder="Masukkan link Penayangan" />
                </div>
              </div>
              
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => navigate("/dashboard/films")}
                disabled={submitting}
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="btn btn-add" 
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Film"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddData;