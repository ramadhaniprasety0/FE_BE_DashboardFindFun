import { Container, Row, Col } from "react-bootstrap";
import CarouselComponent from "../components/CarouselItemsComponentsHome/CarouselHomePage";


// const NewsComponent = ({ hotsNews }) => {
//   return (
//     <>
//       {hotsNews.map((hots, index) => {
//         return (
//           <Col lg={12} key={index} className="mb-4">
//             <div className="news-card d-flex">
//               <img src={hots.image} alt="NewsBrand" className="img-brand" />
//               <div className="news-caption d-flex flex-column justify-content-between">
//                 <div>
//                   <img src={hots.brandnews} alt="" srcset="" />
//                   <h5>{hots.title}</h5>
//                   <p>{hots.desc}</p>
//                   <a href="#">Lihat Lebih Banyak</a>
//                 </div>
//                 <p className="text-white">{hots.time}</p>
//               </div>
//             </div>
//           </Col>
//         );
//       })}
//     </>
//   );
// };

const HomePage = () => {
  return (
    <div>
      <header className="w-100 min-vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <div className="d-flex flex-column align-items-center">
            <h1 className="montserrat-font fw-bold">
              Selamat datang di FindFun!
            </h1>
            <p>
              Tempat dimana para cinephile dan audiophile saling bertemu secara
              online
            </p>
            <a href="#homepage" className="btn-explore mt-3">
              Mulai Berksplorasi
            </a>
          </div>
        </Container>
      </header>
      <div className="homepage w-100 min-vh-100" id="homepage">
        <div>
          <Container>
            <Row className="header-box d-flex align-items-center">
              <h1 className="text-start">
                <b>Populer di FindFun</b>
              </h1>
              <CarouselComponent  className="rounded-4"/>
            </Row>
            <Row className="box-hits">
              <Col lg={12}>
                <h1 className="judul-hits">
                  <b>Musik Hits hari ini</b>
                </h1>
              </Col>

              {/* {musickHits.map((hits) => {
                return (
                  <Col key={hits.id} className="card-hits-wrapper">
                    <div className="card-hits p-3 rounded-4 position-relative">
                      <img src={hits.image} alt="" className="img-fluid" />
                      <a href={hits.path} className="link-icon">
                        <i className={hits.icon}></i>
                      </a>
                      <h2>{hits.title}</h2>
                      <p>{hits.desc}</p>
                    </div>
                  </Col>
                );
              })} */}
            </Row>
          </Container>
        </div>
        <div>
          <Container>
            <Row className="p-3 box-hits">
              <Col lg={12}>
                <h1 className="judul-hits">
                  <b>Film Terkini</b>
                </h1>
              </Col>
              {/* <PopularComponentFilm /> */}
            </Row>
          </Container>
        </div>
        <div>
          <Container>
            <Row className="box-hots-news p-3">
              <Col lg={12} className="mb-3">
                <h1>
                  <b>Berita hari ini</b>
                </h1>
              </Col>
              {/* <NewsComponent hotsNews={hotsNews} /> */}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
