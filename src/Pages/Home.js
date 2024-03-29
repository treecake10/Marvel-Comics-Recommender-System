import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { fetchHomepageComicEvents } from "../libs/utils";
import Button from "../Components/Button";
import GridLoader from "react-spinners/GridLoader";

const Home = () => {

    const [comicEventData, setComicEventData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {
                const eventData = await fetchHomepageComicEvents();
                setComicEventData(eventData); 
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }

        };

        fetchData();

    }, []);
    
    return(
        <div className="home">
            <div className="body">
                <div className="col">
                    <h2>Comics Just For You</h2>
                    <p>Sign in or create an account. Select your favorite characters, comics, series, events, and creators.<br/><br/>Get a recommended reading list tailored to your interests! </p>
                    <Link to="/authentication?type=getStarted">
                        <Button
                            className="button"
                            text="Get Started"
                        />
                    </Link>
                </div>
                <div className="col">
                    {loading? (
                        <div className="loading-container">
                        <GridLoader
                            color={'#F0131E'}
                            loading={loading}
                            size={60}
                            aria-label="Loading Grid"
                            data-testid="loader"
                        />
                        </div>
                    ) : (
                        comicEventData.map((item, index) => (
                            <div key={index} className="card">
                                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={`Image ${index}`} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
export default Home;