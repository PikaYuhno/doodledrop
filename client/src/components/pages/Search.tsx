import React from 'react';
import Navbar from '../layouts/core/Navbar';
import '../../styles/landing/search.scss';
import pfp1 from '../../assets/pfp/pfp1.png';

class Search extends React.Component {  

    

    render() {
        return (
            <React.Fragment>
                <Navbar />

                <main>

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
                            <div className="media">
                                <div className="media-left">
                                    <div className="">
                                        <p className="image is-48x48">
                                            <img src={pfp1} className="is-rounded" alt="pfp"/>
                                        </p>
                                    </div>
                                </div>

                                <div className="media-content">
                                    <p className="is-size-3 has-text-centered"><strong>Name</strong></p>
                                </div>
                                
                                <div className="media-right">
                                    <button className="button">View</button>
                                </div>
                            </div>
                        </div>

                        
                        
                    </div>
                    
                </div>

                </main>

            </React.Fragment>
        );
    }
}


export default Search;
