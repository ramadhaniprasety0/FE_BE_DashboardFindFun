import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { data, Link, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
const MusicApp = () => {
  const [dataMusic, setDataMusic] = useState([]);
  const [loading, setLoading] = useState(false);

  //    Mengambil Data Music
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:3000/api/music?include=all"
      );
      setDataMusic(data.data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Gagal!",
        "Terjadi kesalahan saat mengambil data music.",
        "error"
      );
      setLoading(false);
    }
  };

  //    Hapus Music
  const handleDeleteMusic = async (id, title) => {
    Swal.fire({
      title: `Hapus music "${title}"?`,
      text: "Apakah Anda yakin ingin menghapus music ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8E97FD",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/music/${id}`);
          await Swal.fire("Terhapus!", "Music berhasil dihapus.", "success");
          getData(); // refresh data
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Gagal!",
            "Terjadi kesalahan saat menghapus music.",
            "error"
          );
        }
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="music-management">
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover responsive="sm">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Poster</th>
                <th>Judul</th>
                <th>Lirik</th>
                <th>Genre</th>
                <th>Artis</th>
                <th>Album</th>
                <th>Rating</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataMusic.length === 0 ? (
                <tr>
                  <td colSpan="13" className="text-center">
                    Tidak ada data music
                  </td>
                </tr>
              ) : (
                dataMusic.map((music, index) => (
                  <tr key={music.id}>
                    <td>{index + 1}</td>
                    <td>
                      {music.image ? (
                        <img
                          src={`http://localhost:3000/${music.image}`}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                          alt={music.title}
                          className="img-thumbnail"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/50x50?text=No+Image";
                          }}
                        />
                      ) : (
                        <div
                          className="bg-light rounded d-flex align-items-center justify-content-center"
                          style={{ width: "50px", height: "50px" }}
                        >
                          <i className="bi bi-music text-muted"></i>
                        </div>
                      )}
                    </td>
                    <td>{music.title}</td>
                    <td>{truncateText(music.lirik, 10)}</td>
                    <td>
                      {music.genre1 + ", " + music.genre2 + ", " + music.genre3}
                    </td>
                    <td>{truncateText(music.artists, 10)}</td>
                    <td>{truncateText(music.albums, 10)}</td>
                    <td className="text-center">
                      <span className="badge bg-warning">
                        {music.rating || 0}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex gap-2">
                        <Button
                          className="btn-update"
                          variant="outline-secondary"
                          size="sm"
                        >
                          <Link
                            to={`/dashboard/editmusic/${music.id}`}
                            title="Edit Music"
                          >
                            <i className="bi bi-pencil text-secondary"></i>
                          </Link>
                        </Button>
                        <Button
                          className="btn-delete"
                          variant="outline-danger"
                          size="sm"
                        >
                          <Link
                            onClick={() =>
                              handleDeleteMusic(music.id, music.title)
                            }
                            title="Delete Music"
                          >
                            <i className="bi bi-trash text-danger"></i>
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MusicApp;
