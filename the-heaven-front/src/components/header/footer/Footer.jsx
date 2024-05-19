import './Footer.css'

export const Footer = () => {
  return (
    <div className="footer">
      <div className="info">
        <div>
          <p className="titleF">The Heaven</p>
          <p className="iF">
                        Descubre las mejores estancias en destinos de ensueño,
                        donde cada detalle está cuidadosamente diseñado para tu
                        comodidad y placer.
          </p>
        </div>
        <div>
          <a href="https://www.facebook.com/">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://github.com/">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://gt.linkedin.com/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
      <div className="textF">
        <div>
          <h4>Company</h4>
          <a href="">About </a>
          <a href="">Our Services </a>
          <a href="">Privacy Policy</a>
          <a href="">Affiliate </a>
        </div>
        <div>
          <h4>Help</h4>
          <a href="">Support </a>
          <a href="">Questions </a>
          <a href="">Reservation </a>
          <a href="">Contact Us </a>
        </div>
        <div>
          <h4>Community</h4>
          <a href="">Facebook </a>
          <a href="">Instagram </a>
          <a href="">GitHub </a>
          <a href="">Linkedin </a>
        </div>
        <div>
          <h4>
            <i className="fa-solid fa-location-dot"></i> Location
          </h4>

          <a href="">
                        Centro Educativo Técnico Laboral KINAL <br /> Centro 6A
                        Avenida 13-54, Cdad. de Guatemala 01007
          </a>
        </div>
      </div>
      <div className="copyright">
        <h4>Copyright (c) The Heaven - 2024. All rights reserved.</h4>
      </div>
    </div>
  )
}
