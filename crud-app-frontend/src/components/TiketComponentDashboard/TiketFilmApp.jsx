import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const TiketFilmApp = () => {
    const [tikets, setTikets] = useState([]);
    const [loading, setLoading] = useState(true);

    const getDataTiket = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:3000/api/tikets/bioskop");
            setTikets(data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data tiket.", "error");
            setLoading(false);
        }
    };

    useEffect(() => {
        getDataTiket();
    }, []);

    // Format showtime
    const formatShowtimes = (show_times) => {
        return show_times.split(',').map((showtime, index) => (
                <div key={index} className="btn btn-sm btn-outline-secondary">
                    {showtime.slice(0, 5)}
                </div>
        ));
    };

    const formatCurrency = (value, currency) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
          .format(value)
          .replace("Rp", currency);
      };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Data Tiket Film Bioskop</h2>
            {loading ? (
                <div className="d-flex">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className='table table-bordered'>
                        <thead className="thead-dark">
                            <tr>
                                <th>No</th>
                                <th>Judul Film</th>
                                <th>Poster</th>
                                <th>Director</th>
                                <th>Lokasi</th>
                                <th>Cinema</th>
                                <th>Waktu Tayang</th>
                                <th>Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tikets.length === 0 ? (
                                <tr>
                                    <td colSpan={8}>Tidak ada data tiket</td>
                                </tr>
                            ) : (
                                tikets.map((tiket, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{tiket.title}</td>
                                        <td>{tiket.image ? (
                                            <img 
                                                src={`http://localhost:3000/${tiket.image}`} 
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                alt={tiket.title} 
                                                className='img-thumbnail'
                                                onError={(e) => {
                                                    e.target.onerror = null; 
                                                    e.target.src = "https://via.placeholder.com/150"
                                                }}
                                            />
                                        ) : (
                                            <div className='bg-light rounded d-flex align-items-center justify-content-center' style={{ width: '50px', height: '50px' }}>
                                                <i className='bi bi-image text-muted'></i>
                                            </div>
                                        )}
                                        </td>
                                        <td>{tiket.director}</td>
                                        <td>{tiket.venue_name}</td>
                                        <td>{tiket.cinema_type}</td>
                                        <td className='d-flex flex-wrap gap-2 h-100'>
                                            {formatShowtimes(tiket.show_times)}
                                        </td>
                                        <td>{formatCurrency(tiket.price, "Rp")}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TiketFilmApp;
