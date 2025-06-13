import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Spinner, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import { Link } from "react-router-dom";

const ReviewFilmsComponent = () => {
  const { id } = useParams();
  const [review, setReview] = useState([]);
  const [film, setFilm] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ratinguser, setRatinguser] = useState(0);
  const [titleReview, setTitleReview] = useState('');
  const [plotReview, setPlotReview] = useState('');
  const [actorReview, setActorReview] = useState('');
  const [cinematographyReview, setCinematographyReview] = useState('');
  const [otherReview, setOtherReview] = useState('');
  const [spoiler, setSpoiler] = useState(false);
  
  const [bintangDropdownOpen, setBintangDropdownOpen] = useState(false);
  const [urutkanDropdownOpen, setUrutkanDropdownOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Untuk menangani status icon Bocoran
  // const [rating, setRating] = useState(review.rating); // Rating state initialized with default value
  // const totalStars = 5;

  // New state for like and dislike count and color change
  const [likeCount, setLikeCount] = useState(100);
  const [dislikeCount, setDislikeCount] = useState(13);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  // Referensi untuk tombol dropdown dan menu dropdown
  const bintangDropdownRef = useRef(null);
  const urutkanDropdownRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [noReview, setNoReview] = useState(false);

  
  
  const getReview = async () => {
    try {
      setLoading(true);
      const { data: film } = await axios.get(`http://localhost:3000/api/films/${id}`);
      const { data } = await axios.get(`http://localhost:3000/api/ulasan/film/${id}`);
      setReview(data.data || []); // Pastikan review selalu array, bahkan jika data.data undefined
      setFilm(film.data || {}); // Pastikan film selalu objek, bahkan jika film.data undefined
      if (!data.data || data.data.length === 0) {
        setNoReview(true);
      }
      console.log(film.data);
    } catch (error) {
      Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data review.", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Pastikan review terdefinisi sebelum mengakses length
  const totalReview = review ? review.length : 0;
  console.log(totalReview);

  useEffect(() => {
    getReview();
  }, []);
  

  if (loading) {
    return (
      <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!review) {
    return (
      <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center homepage-films">
        <h2>Tidak Ada Review</h2>
      </div>
    );
  }

  const handleRatingClick = (starValue) => {
    setRatinguser(starValue);
  };

  const handleSubmit = async () => {
    const ulasanData = {
      user_id: 1, // Assuming the user ID is 1 for now. This should be dynamically fetched
      film_id: id,
      title_review: titleReview,
      alur_review: plotReview,
      sinematografi_review: cinematographyReview,
      pemeran_review: actorReview,
      review_lain: otherReview,
      kategori: spoiler ? 1 : 2,
      rating: 2, 
      like_ulasan: 0, 
      dislike_ulasan: 0, 
    };

    console.log(ulasanData);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/ulasan/film/${id}`,
        ulasanData
      );
      console.log('Ulasan berhasil ditambahkan:', response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Gagal mengirim ulasan:', error);
    }
  };

  

  // const handleRating = (newRating) => {
  //   // setRating(newRating);
  // };

  // Fungsi untuk toggle dropdown Bintang
  const toggleBintangDropdown = () => {
    setBintangDropdownOpen(!bintangDropdownOpen);
  };

  // Fungsi untuk toggle dropdown Urutkan
  const toggleUrutkanDropdown = () => {
    setUrutkanDropdownOpen(!urutkanDropdownOpen);
  };

  // Menutup dropdown jika klik terjadi di luar tombol atau menu dropdown
  const handleClickOutside = (event) => {
    if (
      bintangDropdownRef.current &&
      !bintangDropdownRef.current.contains(event.target)
    ) {
      setBintangDropdownOpen(false); // Menutup dropdown Bintang
    }
    if (
      urutkanDropdownRef.current &&
      !urutkanDropdownRef.current.contains(event.target)
    ) {
      setUrutkanDropdownOpen(false); // Menutup dropdown Urutkan
    }
  };

  const handleLikeClick = () => {
    if (!likeClicked) {
      setLikeClicked(true); // Select like
      setDislikeClicked(false); // Deselect dislike
      setLikeCount(likeCount + 1); // Increase like count
      setDislikeCount(dislikeCount - (dislikeClicked ? 1 : 0)); // Decrease dislike count if it was selected
    } else {
      setLikeClicked(false); // Deselect like
      setLikeCount(likeCount - 1); // Decrease like count
    }
  };

  // Handle dislike click event
  const handleDislikeClick = () => {
    if (!dislikeClicked) {
      setDislikeClicked(true); // Select dislike
      setLikeClicked(false); // Deselect like
      setDislikeCount(dislikeCount + 1); // Increase dislike count
      setLikeCount(likeCount - (likeClicked ? 1 : 0)); // Decrease like count if it was selected
    } else {
      setDislikeClicked(false); // Deselect dislike
      setDislikeCount(dislikeCount - 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const options = {
      weekday: 'long',
      day: 'numeric',  
      month: 'short',  
      year: 'numeric'  
    };
  
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="reviewfilms">
        <div className="poster-section-review">
          <img
            className="rounded-5 film-poster"
            src={`http://localhost:3000/${film.image_poster}`}
            alt={film.title}
          />
          <div className="title-review">
            <p>{film.title}</p>
            <h2>Ulasan Penonton</h2>
          </div>
        </div>
        <div className="d-flex mb-4">
          <h3 className="h3-review-film text-start">{review ? review.length : 0} Ulasan</h3>

          <div className="buttons d-flex">
            <div className="dropdown btn-review-film" ref={bintangDropdownRef}>
                <button
                  className="btn-review"
                  type="button"
                  onClick={toggleBintangDropdown}
                >
                  Bintang
                </button>
                {bintangDropdownOpen && (
                  <ul className="dropdown-menu-review-film text-center">
                    <li>Unggulan</li>
                    <li>Tanggal Ulasan</li>
                    <li>Disukai Terbanyak</li>
                  </ul>
                )}
              </div>

              {/* Dropdown Urutkan */}
              <div className="dropdown btn-review-film" ref={urutkanDropdownRef}>
                <button
                  className="btn-review"
                  type="button"
                  onClick={toggleUrutkanDropdown}
                >
                  Urutkan
                </button>
                {urutkanDropdownOpen && (
                  <ul className="dropdown-menu-review-film text-center">
                    <li>Bintang 1</li>
                    <li>Bintang 2</li>
                    <li>Bintang 3</li>
                  </ul>
                )}
              </div>

              {/* Icon Bocoran */}
              <div
                className="icon-bocoran"
                onClick={() => setIsChecked(!isChecked)}
              >
                <i
                  className={`fa${isChecked ? "s" : "r"} fa-check-circle`} // Mengubah class icon berdasarkan status
                  style={{
                    fontSize: "15px",
                    color: isChecked ? "black" : "#29282F", // Mengubah warna icon saat dipilih
                    cursor: "pointer",
                  }}
                ></i>
                <span
                  style={{
                    color: isChecked ? "black" : "#29282F", // Warna teks berubah sesuai status
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  Bocoran
                </span>
              </div>

              {/* Tombol + Ulasan */}
              <div className="btn-ulasan">
                <button className="btn-plus-ulasan" type="button" onClick={handleShowModal}>
                  + Ulasan
                </button>
              </div>
            </div>
          </div>
          {noReview ? (
        <div className="w-100 min-vh-100 d-flex justify-content-center align-items-start homepage-films">
          <h3>Belum ada Review nih.. Jadi reviewer pertama di film {film.title}</h3>
        </div>
      ) : (
        <div>
          {review.map((item, i) => (
            <div key={i} className="reviewer-film mb-5 border p-3 rounded-4">
              {/* Rating bintang */}
              <div className="stars mb-3">
                {[...Array(5)].map((_, index) => {
                  const bintangRating = item.rating / 2; // Konversi 0–10 ke 0–5
                  const starIndex = index + 1;

                  let icon = "☆"; // kosong
                  let color = "gray";

                  if (bintangRating >= starIndex) {
                    icon = "★"; // penuh
                    color = "gold";
                  } else if (bintangRating >= starIndex - 0.5) {
                    icon = "⯪"; // setengah
                    color = "gold";
                  }

                  return (
                    <span key={index} style={{ fontSize: "24px", color }}>
                      {icon}
                    </span>
                  );
                })}
                <span style={{ marginLeft: "8px" }}>{item.rating} / 10</span>
              </div>

              {/* Isi ulasan */}
              <div className="reviewer-film-isi">
                <h1>{item.title_review}</h1>
                <div className="alur-film">
                  <h5>Alur</h5>
                  <p>{item.alur_review}</p>
                </div>
                <div className="sinematografi-film">
                  <h5>Sinematografi</h5>
                  <p>{item.sinematografi_review}</p>
                </div>
                <div className="pemeran-film">
                  <h5>Pemeran</h5>
                  <p>{item.pemeran_review}</p>
                </div>
                <div className="lainnya-film">
                  <h5>Lainnya</h5>
                  <p>{item.review_lain}</p>
                </div>

                {/* Info user & tanggal */}
                <div className="reviewer-film-users mt-3 d-flex">
                  <p><strong>{item.nama}</strong></p>
                  <p>{formatDate(item.created_at)}</p>
                </div>
              </div>
              <div className="like-dislike">
                  {/* Like and Dislike */}
                  <div className="like-dislike-buttons d-flex ">
                    <button
                      onClick={handleDislikeClick}
                      style={{
                        color: dislikeClicked ? "#2E388A" : "#2E388A",
                        fontSize: "15px",
                        cursor: "pointer",
                        border: "none",
                        background: "transparent",
                      }}
                    >
                      <i className={`fa${dislikeClicked ? "s" : "r"} fa-thumbs-down`} />
                      {dislikeCount}
                    </button>
                    <button
                      onClick={handleLikeClick}
                      style={{
                        color: likeClicked ? "#2E388A" : "#2E388A",
                        fontSize: "15px",
                        cursor: "pointer",
                        border: "none",
                        background: "transparent",
                      }}
                    >
                      <i className={`fa${likeClicked ? "s" : "r"} fa-thumbs-up`} />
                      {likeCount}
                    </button>
                    <p>| . Bermanfaat</p>
                  </div>
                </div>
            </div>
          ))}
        </div>
      )}

    <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Tambah Ulasan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between">
          <img
            src="http://localhost:3000/path-to-your-image.jpg"
            alt="Film Poster"
            style={{ width: '120px', height: '180px', objectFit: 'cover' }}
            className="rounded-3"
          />
          <div className="ml-3">
            <h4>The Nun II</h4>
            <p>R • 2022 • 1h 50m</p>
            <p>
              <small>Horror • Mystery • Thriller • Fantasy</small>
            </p>
            <div>
              <p>Bintang</p>
              <div className="stars">
                {/* {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <span
                      key={index}
                      style={{ fontSize: '30px', cursor: 'pointer' }}
                      onClick={() => handleRatingClick(starValue)}
                    >
                      {starValue <= rating ? '★' : '☆'}
                    </span>
                  );
                })} */}
              </div>
            </div>
          </div>
        </div>

        <Form className="mt-4">
          <Form.Group controlId="titleReview">
              <Form.Label>Title Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={titleReview}
                onChange={(e) => setTitleReview(e.target.value)}
              />
            </Form.Group>
          <Form.Group controlId="plotReview">
            <Form.Label>Plot</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={plotReview}
              onChange={(e) => setPlotReview(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="actorReview">
            <Form.Label>Pemeran</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={actorReview}
              onChange={(e) => setActorReview(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="cinematographyReview">
            <Form.Label>Sinematografi</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={cinematographyReview}
              onChange={(e) => setCinematographyReview(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="otherReview">
            <Form.Label>Lainnya</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={otherReview}
              onChange={(e) => setOtherReview(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="spoiler">
            <Form.Check
              type="checkbox"
              label="Apakah Ulasan Pengguna ini mengandung spoiler?"
              checked={spoiler}
              onChange={(e) => setSpoiler(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Batal
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Kirim
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default ReviewFilmsComponent;
