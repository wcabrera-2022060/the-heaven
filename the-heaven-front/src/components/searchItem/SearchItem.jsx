import './SearchItem.css'
import CardHotel from '../../img/Hotel1.jpg'
import CardHotel1 from '../../img/Hotel5.jpg'
import CardHotel2 from '../../img/Hotel6.jpg'
import CardHotel3 from '../../img/Hotel7.jpg'
import CardHotel4 from '../../img/Hotel8.jpg'
import { Link } from 'react-router-dom'

export const SearchItem = () => {
    return (
        <>
            <div className="searchItem">
                <img src={CardHotel} alt="" className="sIImg" />
                <div className="sIDesc">
                    <h1 className="sITitle">
                        The Westin Camino Real
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                    </h1>
                    <span className="sISubtitle">Apartment with pool</span>
                    <span className="sIFeatures">
                        Large room with a double bed
                    </span>
                    <span className="sICancelOp">
                        <i className="fa-solid fa-check"></i>Free cancellation
                    </span>
                    <span className="sICancelOpSubtitle">
                        <i className="fa-solid fa-check"></i>No advance payment
                        -
                        <small className="pay">
                            You will pay at the accommodation
                        </small>
                    </span>
                </div>
                <div className="sIDetails">
                    <div className="sIRating">
                        <span>Excellent</span>
                        <small className="comments">1600 comments</small>
                    </div>
                    <div className="sIDetailTexts">
                        <span className="sIPrice">$722</span>
                        <span className="sIOpIVA">Includes IVA</span>
                        <Link to="The-Westin-Camino-Real">
                            <button className="sICheckButton">
                                See availability
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="searchItem">
                <img src={CardHotel1} alt="" className="sIImg" />
                <div className="sIDesc">
                    <h1 className="sITitle">
                        Porta Hotel Antigua
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                    </h1>
                    <span className="sISubtitle">
                        Marvel at the majestic volcanoes
                    </span>
                    <span className="sIFeatures">Room with spa service</span>
                    <span className="sICancelOp">
                        <i className="fa-solid fa-check"></i>Free cancellation
                    </span>
                    <span className="sICancelOpSubtitle">
                        <i className="fa-solid fa-check"></i>No advance payment
                        -
                        <small className="pay">
                            You will pay at the accommodation
                        </small>
                    </span>
                    <span className="sIOf">
                        There are only 6 rooms left at this price on our website
                    </span>
                </div>
                <div className="sIDetails">
                    <div className="sIRating">
                        <span>Fantastic</span>
                        <small className="comments">1800 comments</small>
                    </div>
                    <div className="sIDetailTexts">
                        <span className="sIPrice">$100</span>
                        <span className="sIOpIVA">Includes IVA</span>
                        <button className="sICheckButton">
                            See availability
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="searchItem">
                <img src={CardHotel2} alt="" className="sIImg" />
                <div className="sIDesc">
                    <h1 className="sITitle">
                        Camino Real Antigua
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                    </h1>
                    <span className="sISubtitle">
                        Enjoy the great views that Antigua Guatemala has
                    </span>
                    <span className="sIFeatures">Large room and garden</span>
                    <span className="sICancelOp">
                        <i className="fa-solid fa-check"></i>Free cancellation
                    </span>
                    <span className="sICancelOpSubtitle">
                        <i className="fa-solid fa-check"></i>No advance payment
                        -
                        <small className="pay">
                            You will pay at the accommodation
                        </small>
                    </span>
                    <span className="sIOf">
                        There are only 2 rooms left at this price on our website
                    </span>
                </div>
                <div className="sIDetails">
                    <div className="sIRating">
                        <span>Fantastic</span>
                        <small className="comments">3800 comments</small>
                    </div>
                    <div className="sIDetailTexts">
                        <span className="sIPrice">$60</span>
                        <span className="sIOpIVA">Includes IVA</span>
                        <button className="sICheckButton">
                            See availability
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="searchItem">
                <img src={CardHotel3} alt="" className="sIImg" />
                <div className="sIDesc">
                    <h1 className="sITitle">
                        Barceló Guatemala City
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                    </h1>
                    <span className="sISubtitle">
                        Marvel at the luxurious rooms
                    </span>
                    <span className="sIFeatures">Room with spa service</span>
                    <span className="sICancelOp">
                        <i className="fa-solid fa-check"></i>Free cancellation
                    </span>
                    <span className="sICancelOpSubtitle">
                        <i className="fa-solid fa-check"></i>No advance payment
                        -
                        <small className="pay">
                            You will pay at the accommodation
                        </small>
                    </span>
                </div>
                <div className="sIDetails">
                    <div className="sIRating">
                        <span>Well</span>
                        <small className="comments">900 comments</small>
                    </div>
                    <div className="sIDetailTexts">
                        <span className="sIPrice">$112</span>
                        <span className="sIOpIVA">Includes IVA</span>
                        <button className="sICheckButton">
                            See availability
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="searchItem">
                <img src={CardHotel4} alt="" className="sIImg" />
                <div className="sIDesc">
                    <h1 className="sITitle">
                        Hyatt Centric
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                        <i className="fa-solid fa-star r"></i>
                    </h1>
                    <span className="sISubtitle">
                        Ideal hotel when visiting Guatemala City
                    </span>
                    <span className="sIFeatures">
                        They offer air conditioning and refrigerator
                    </span>
                    <span className="sICancelOp">
                        <i className="fa-solid fa-check"></i>Free cancellation
                    </span>
                    <span className="sICancelOpSubtitle">
                        <i className="fa-solid fa-check"></i>No advance payment
                        -
                        <small className="pay">
                            You will pay at the accommodation
                        </small>
                    </span>
                </div>
                <div className="sIDetails">
                    <div className="sIRating">
                        <span>Excellent</span>
                        <small className="comments">799 comments</small>
                    </div>
                    <div className="sIDetailTexts">
                        <span className="sIPrice">$421</span>
                        <span className="sIOpIVA">Includes IVA</span>
                        <button className="sICheckButton">
                            See availability
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
