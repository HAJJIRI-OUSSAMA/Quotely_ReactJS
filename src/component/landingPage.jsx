
import LandStyle from "../landingP.module.css";
import { Link } from "react-router-dom"

export function LandingPage() {
    return (
        <>

            <div className={LandStyle.body}>
                <header className={LandStyle.header}>
                    <Link className={LandStyle.logo} to={"/"}><div>.Quotely</div></Link>
                    <nav>
                        <Link className={LandStyle.logo} to={"/Home"}><button className={LandStyle.getStartedButton}>Get Started</button></Link>
                        <Link className={LandStyle.logo} to={"/Login"}><button className={LandStyle.getStartedButton}>Login</button></Link>
                    </nav>
                </header>


                <div className={LandStyle.welcome}>
                    Welcome To <span>Quotely</span>!
                </div>
                <div className={LandStyle.additionalText}>
                    Share your favorite quotes with the world through Quotely.

                </div>
                <div>by : Hajjiri Oussama & Aazzaoui Abdelali</div>
            </div>



            {/* <h1>Quote<span className="ly">ly</span></h1>
        <br />
        <br />
        <br />
        <br />
        <Link to={"/home"}><button className="addcat">Start</button></Link>
        <Link to={"/login"}><button className="addcatR">For Admins</button></Link>
         */}

        </>
    );
}