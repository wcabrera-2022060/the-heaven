import './Outstanding.css'
import IMG1 from '../../../img/Guatemala.jpg'
import IMG2 from '../../../img/Mexico.jpg'
import IMG3 from '../../../img/Uruguay.jpg'
import IMG4 from '../../../img/Argentina.jpg'
import IMG5 from '../../../img/Colombia.jpg'

export const Outstanding = () => {
    return (
        <>
            <div className="outstanding">
                <div className="outstandingItem">
                    <img src={IMG1} alt="" className="outstandingImg" />

                    <div className="overlay"></div>
                    <div className="outstandingTitles">
                        <h1>Guatemala</h1>
                        <h2>500 Hotels</h2>
                    </div>
                </div>
                <div className="outstandingItem">
                    <img src={IMG2} alt="" className="outstandingImg" />
                    <div className="overlay"></div>
                    <div className="outstandingTitles">
                        <h1>México</h1>
                        <h2>300 Hotels</h2>
                    </div>
                </div>
                <div className="outstandingItem">
                    <img src={IMG3} alt="" className="outstandingImg" />
                    <div className="overlay"></div>
                    <div className="outstandingTitles">
                        <h1>Uruguay</h1>
                        <h2>250 Hotels</h2>
                    </div>
                </div>
                <div className="outstandingItem">
                    <img src={IMG4} alt="" className="outstandingImg" />
                    <div className="overlay"></div>
                    <div className="outstandingTitles">
                        <h1>Argentina</h1>
                        <h2>362 Hotels</h2>
                    </div>
                </div>
                <div className="outstandingItem">
                    <img src={IMG5} alt="" className="outstandingImg" />
                    <div className="overlay"></div>
                    <div className="outstandingTitles">
                        <h1>Colombia</h1>
                        <h2>155 Hotels</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
