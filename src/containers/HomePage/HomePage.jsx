import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <>
            <div className="cintainer">
                <div className="container_content">
                    <div className="container_content_p">
                        <h1>Lets Build Your Path To Healthy Life</h1>
                        <Link to='/PersonalMenu'>
                            <div className="text">
                                <span>🔥click here to start your process🔥</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="about_me_outline">
                <div className="about_me_container">
                    <div className="about_me_container_content">
                        <h1>About Me</h1>
                    </div>
                </div>
                <div>
                    <p>
                        All my life I tried to handle my meals! So I decided to use my development skills to make a free planner for myself. <br />
                        Here you can build your menu and count your calories ✅ <br />
                        Now, I have chosen to share with you a product I developed! <br />
                        Have fun 🔥💪🏽
                    </p>
                </div>
            </div>
        </>
    );
}

export default HomePage;