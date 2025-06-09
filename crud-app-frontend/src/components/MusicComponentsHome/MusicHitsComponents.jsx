import { useState, useEffect } from "react";
import { Spinner, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const MusicHitsComponents = () => {
    const [musics, setMusics] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMusicHits = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:3000/api/music/?include=all");
            setMusics(data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data music.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMusicHits();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" />
            </div>
        );
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

  return (
    <>
    {musics.map((hits) => (
    <Col key={hits.id} className="card-hits-wrapper d-flex justify-content-center">
        <Link to={`/music/${hits.id}`} className="text-decoration-none">
            <div className="card-hits p-3 rounded-4 position-relative">
                <img src={`http://localhost:3000/${hits.image}`} 
                alt="" 
                className="img-fluid" />
                <h2>{hits.title}</h2>
                <p>{truncateText(hits.artists,10)}</p>
            </div>
        </Link>
    </Col>
    ))}
    
    </>
  )
}

export default MusicHitsComponents