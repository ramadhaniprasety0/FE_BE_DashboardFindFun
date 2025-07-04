import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPlus, FaTrash } from "react-icons/fa";

const AddTiketKonser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([""]);
  const [music, setMusic] = useState([]);
  const [formData, setFormData] = useState({
    nama_konser: "",
    deskripsi_acara: "",
    lokasi: "",
    tanggal: "",
    jenis_tiket: [
      { jenis_tiket: "VIP", harga: "" },
      { jenis_tiket: "GOLD", harga: "" },
      { jenis_tiket: "SILVER", harga: "" },
    ],
    image: null,
  });

  // Fetch artists data for dropdown
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/artists");
        setArtists(response.data.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
        setError("Gagal mengambil data artis");
      }
    };

    const fetchMusic = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/music");
        setMusic(response.data.data);
      } catch (error) {
        console.error("Error fetching music:", error);
        setError("Gagal mengambil data musik");
      }
    };

    fetchArtists();
    fetchMusic();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTiketChange = (index, field, value) => {
    const updatedTiket = [...formData.jenis_tiket];
    updatedTiket[index] = {
      ...updatedTiket[index],
      [field]: field === "harga" ? value : value,
    };
    setFormData({
      ...formData,
      jenis_tiket: updatedTiket,
    });
  };

  const addJenisTiket = () => {
    setFormData({
      ...formData,
      jenis_tiket: [...formData.jenis_tiket, { jenis_tiket: "", harga: "" }],
    });
  };

  const removeJenisTiket = (index) => {
    if (formData.jenis_tiket.length > 1) {
      const updatedTiket = formData.jenis_tiket.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        jenis_tiket: updatedTiket,
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Tidak dapat menghapus",
        text: "Minimal harus ada satu jenis tiket",
        confirmButtonText: "OK",
      });
    }
  };

  // Fungsi untuk menambah artis
  const handleAddArtist = () => {
    setSelectedArtists([...selectedArtists, ""]);
  };

  // Fungsi untuk menghapus artis
  const handleRemoveArtist = (index) => {
    if (selectedArtists.length > 1) {
      const updatedArtists = selectedArtists.filter((_, i) => i !== index);
      setSelectedArtists(updatedArtists);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Tidak dapat menghapus",
        text: "Minimal harus ada satu artis",
        confirmButtonText: "OK",
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validasi form
    if (!formData.nama_konser || !formData.lokasi || !formData.tanggal) {
      setError("Nama konser, lokasi, dan tanggal wajib diisi");
      setLoading(false);
      return;
    }

    // Validasi jenis tiket
    const invalidTiket = formData.jenis_tiket.some(
      (tiket) => !tiket.jenis_tiket || !tiket.harga
    );
    if (invalidTiket) {
      setError("Setiap jenis tiket harus memiliki nama dan harga");
      setLoading(false);
      return;
    }

    // Validasi artis
    const invalidArtist = selectedArtists.some(artist => !artist);
    if (invalidArtist) {
      setError("Setiap artis harus dipilih");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      formDataToSend.append("nama_konser", formData.nama_konser);
      formDataToSend.append("deskripsi_acara", formData.deskripsi_acara);
      formDataToSend.append("lokasi", formData.lokasi);
      formDataToSend.append("tanggal", formData.tanggal);
      formDataToSend.append(
        "jenis_tiket",
        JSON.stringify(formData.jenis_tiket)
      );
      formDataToSend.append("selected_artists", JSON.stringify(selectedArtists));
      console.log(selectedArtists);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.post("http://localhost:3000/api/konser", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Tiket konser berhasil ditambahkan");
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Tiket konser berhasil ditambahkan",
      }).then(() => {
        navigate("/dashboard/konser");
      });
    } catch (error) {
      console.error("Error adding concert ticket:", error);
      setError(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menambahkan tiket konser"
      );
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan saat menambahkan tiket konser",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card className="shadow-sm">
        <Card.Header as="h5" className="text-white" style={{ backgroundColor: "#8e97fd" }}>
          Tambah Tiket Konser
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Konser *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nama_konser"
                    value={formData.nama_konser}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal *</Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Deskripsi Acara</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="deskripsi_acara"
                value={formData.deskripsi_acara}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Lokasi *</Form.Label>
              <Form.Control
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Poster Konser</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Form.Text className="text-muted">
                Format yang didukung: JPG, JPEG, PNG, GIF (Max: 2MB)
              </Form.Text>
            </Form.Group>

            <h5 className="mt-4">Artis</h5>
            <p className="text-muted small">
              Pilih artis yang akan tampil di konser
            </p>

            <Row className="mb-3">
              <Col md={12} className="d-flex justify-content-end align-items-center mb-2">
                <button className="btn btn-add" size="sm" onClick={handleAddArtist}>
                  <FaPlus className="me-1" /> Tambah Artis
                </button>
              </Col>
              
              {selectedArtists.map((artistId, index) => (
                <Col md={4} key={index} className="mb-3">
                  <Form.Group>
                    <Form.Label>Artis {index + 1}</Form.Label>
                    <div className="d-flex">
                      <Form.Select
                        value={artistId}
                        onChange={(e) => {
                          const newArtists = [...selectedArtists];
                          newArtists[index] = e.target.value;
                          setSelectedArtists(newArtists);
                        }}
                        required
                      >
                        <option value="">Pilih Artis</option>
                        {artists.map((artist) => (
                          <option key={artist.id} value={artist.id}>
                            {artist.name}
                          </option>
                        ))}
                      </Form.Select>
                      {index > 0 && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="ms-2 btn-delete"
                          onClick={() => handleRemoveArtist(index)}
                        >
                          <i className="bi bi-trash text-danger"></i>
                        </Button>
                      )}
                    </div>
                  </Form.Group>
                </Col>
              ))}
            </Row>

            <h5 className="mt-4">Jenis Tiket</h5>
            <p className="text-muted small">
              Tambahkan jenis tiket dan harganya
            </p>

            <Col className="d-flex justify-content-end align-items-center mb-2">
            
            <button  onClick={addJenisTiket} className="mb-4 btn btn-add">
              <FaPlus className="me-2" /> Tambah Jenis Tiket
            </button>
            </Col>

            {formData.jenis_tiket.map((tiket, index) => (
              <Row key={index} className="mb-3 align-items-end ">
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Jenis Tiket {index + 1}</Form.Label>
                    <Form.Control
                      type="text"
                      value={tiket.jenis_tiket}
                      onChange={(e) =>
                        handleTiketChange(index, "jenis_tiket", e.target.value)
                      }
                      placeholder="Nama jenis tiket"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Harga (Rp)</Form.Label>
                    <Form.Control
                      type="number"
                      value={tiket.harga}
                      onChange={(e) =>
                        handleTiketChange(index, "harga", e.target.value)
                      }
                      placeholder="Harga tiket"
                      min="0"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline-danger"
                    onClick={() => removeJenisTiket(index)}
                    className="mb-0  btn-delete"
                  >
                    <i className="bi bi-trash text-danger"></i>
                  </Button>
                </Col>
              </Row>
            ))}

           

            <div className="d-flex justify-content-end gap-2 mb-1" style={{marginTop: "80px"}}>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard/konser")}
              >
                Kembali
              </button>
              <button className="btn btn-add" type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan Tiket Konser"}
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddTiketKonser;
