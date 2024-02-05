import { useState } from "react";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchCharactersByName, fetchCreatorsByName, fetchSeriesByTitle } from "../../libs/utils";
import DataSearchFetcher from "../../Components/DataTools/DataSearchFetcher";
import Container from "../../Components/CardsLayout/Container";
import Grid from "../../Components/CardsLayout/Grid";
import Card from "../../Components/CardsLayout/Card";
import SearchBar from "../../Components/SearchBar";
import "../../App.css";
import "./Explore.css";

const IMG_FANTASTIC = "portrait_fantastic";

const Explore = () => {

    const [characters, setCharacters] = useState([]);
    const [series, setSeries] = useState([]);
    const [creators, setCreators] = useState([]);
    const [error, setError] = useState();
    const [toggleState, setToggleState] = useState(1);
    const [loading, setLoading] = useState(false);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const handleCharacterClick = async (e, args) => {
        e.preventDefault();
        if (args === "") return [];
        try {
            setLoading(true);
            const result = await DataSearchFetcher(fetchCharactersByName, args);
            return result;
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
       
    };

    const handleSeriesClick = async (e, args) => {
        e.preventDefault();
        if (args === "") return [];
        try {
            setLoading(true);
            const result = await DataSearchFetcher(fetchSeriesByTitle, args);
            return result;
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
       
    };
    
    const handleCreatorClick = async (e, args) => {
        e.preventDefault();
        if (args === "") return [];
        try {
            setLoading(true);
            const result = await DataSearchFetcher(fetchCreatorsByName, args);
            return result;
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    
    const characterCards = characters.map(({ id, name, thumbnail }) => (
        <Card
            name={name}
            key={id}
            category={"character"}
            id={id}
            thumbnail={`${thumbnail.path}/${IMG_FANTASTIC}.${thumbnail.extension}`}
        />
    )); 

    const seriesCards = series.map(({ id, title, thumbnail }) => (
        <Card
            name={title}
            key={id}
            category={"series"}
            id={id}
            thumbnail={`${thumbnail.path}/${IMG_FANTASTIC}.${thumbnail.extension}`}
        />
    )); 

    const creatorCards = creators.map(({ id, fullName, thumbnail }) => (
        <Card
            name={fullName}
            key={id}
            category={"creator"}
            id={id}
            thumbnail={`${thumbnail.path}/${IMG_FANTASTIC}.${thumbnail.extension}`}
        />
    )); 
    

    return(
        <div className="home">
            <br />
            <div className="tabs-container">
                {[1, 2, 3, 4, 5].map((index) => (
                    <React.Fragment key={index}>
                        <input
                            type="radio"
                            className="tabs__radio"
                            name="tabs-example"
                            id={`tab${index}`}
                            onClick={() => toggleTab(index)}
                        ></input>
                        <label
                            htmlFor={`tab${index}`}
                            className={
                                toggleState === index ? "tabs__label active-tab" : "tabs__label"
                            }
                        >
                            {index === 1 
                                ? "Characters" 
                                : index === 2 
                                ? "Comics" 
                                : index === 3 
                                ? "Series" 
                                : index === 4 
                                ? "Events" 
                                : index === 5 
                                ? "Creators"
                                : null
                            }
                        </label>
                    </React.Fragment>
                ))}
            </div>

            <div className={toggleState === 1 ? "tabs__content" : null}>
                {toggleState === 1 && ( 
                    <React.Fragment>
                        <SearchBar
                            handleClick={handleCharacterClick}
                            placeholder={"Search character or team..."}
                            setResults={setCharacters}
                            setError={setError}
                        />

                        <Container>
                            <Grid>
                            
                            {loading ? (
                                <div className="loading-container">
                                    <ClipLoader
                                        color={'#F0131E'}
                                        loading={loading}
                                        size={50}
                                        aria-label="Loading Grid"
                                        data-testid="loader"
                                    />
                                </div>
                            ) : (
                                characterCards
                            )}

                            </Grid>
                        </Container>
                    </React.Fragment>
                )}  
            </div>

            <div className={toggleState === 3 ? "tabs__content" : null}>
                {toggleState === 3 && ( 
                    <React.Fragment>
                        <p className="creator-paragraph">Enter the complete name of the title to find a comic series:</p>
                        <SearchBar
                            handleClick={handleSeriesClick}
                            placeholder={"Search a comic series..."}
                            setResults={setSeries}
                            setError={setError}
                        />

                        <Container>
                            <Grid>
                            
                            {loading ? (
                                <div className="loading-container">
                                    <ClipLoader
                                        color={'#F0131E'}
                                        loading={loading}
                                        size={50}
                                        aria-label="Loading Grid"
                                        data-testid="loader"
                                    />
                                </div>
                            ) : (
                                seriesCards
                            )}

                            </Grid>
                        </Container>
                    </React.Fragment>
                )}  
            </div>

            <div className={toggleState === 5 ? "tabs__content" : null}>
                {toggleState === 5 && ( 
                    <React.Fragment>
                        <p className="creator-paragraph">Enter the complete first, last, or full name to find creators:</p>
                        <SearchBar
                            handleClick={handleCreatorClick}
                            placeholder={"Search creators..."}
                            setResults={setCreators}
                            setError={setError}
                        />
                        <Container>
                            <Grid>
                            {loading ? (
                                <div className="loading-container">
                                    <ClipLoader
                                        color={'#F0131E'}
                                        loading={loading}
                                        size={50}
                                        aria-label="Loading Grid"
                                        data-testid="loader"
                                    />
                                </div>
                            ) : (
                                creatorCards
                            )}
                            </Grid>
                        </Container>
                    </React.Fragment>
                )}
            </div>
            <br />
            <br/>
        </div>
    )
}
export default Explore;