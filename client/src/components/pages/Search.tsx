import React from 'react';
import Navbar from '../layouts/core/Navbar';
import '../../styles/landing/search.scss';
import pfp1 from '../../assets/pfp/pfp1.png';

class Search extends React.Component {  

    

    render() {
        return (
            <React.Fragment>
                <Navbar />

                <div className="hero">
                    <div className="hero-body">
                        <p className="title is-1 has-text-centered">Search</p>
                    </div>
                </div>
                

                <div className="container is-max-desktop">
                    

                    <div className="control has-icons-left">
                        <input name="search" className="input input-is-large input-is-rounded" type="text" placeholder="Search"></input>
                        <span className="icon is-large is-left">
                            <i className="fa fa-search"></i>
                        </span>
                    </div>
                    
                    <div className="section">

                        <div className="box">
                            <div className="level">
                                <div className="level-left">
                                    <div className="level-item">
                                        <p className="image is-48x48">
                                            <img src={pfp1} className="is-rounded" alt="pfp"/>
                                        </p>
                                    </div>
                                    
                                    <div className="level-item">
                                        <p className="is-size-4">Name</p>
                                    </div>
                                </div>
                                
                                <div className="level-right">
                                    <button className="button">View</button>
                                </div>
                            </div>
                        </div>

                        <div className="box">
                            <div className="level">
                                <div className="level-left">
                                    <p className="image is-48x48">
                                        <img src="https://media.discordapp.net/attachments/688406676805517575/790910951427145768/Punpun.png" className="is-rounded" alt="pfp"/>
                                    </p>
                                </div>
                                <div className="level-item">
                                    <p>Ich</p>
                                </div>
                                <div className="level-right">
                                    <button className="button">View</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

            </React.Fragment>
        );
    }
}


export default Search;
