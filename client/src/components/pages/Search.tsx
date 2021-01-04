import React from 'react';
import Navbar from '../layouts/core/Navbar';

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
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                    
                    <div className="section">

                        <div className="box">
                            <div className="level">
                                <div className="level-left">
                                    <p className="image-is-128">

                                    </p>
                                    <p>Name</p>
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
