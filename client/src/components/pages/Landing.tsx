import React from "react";
import Navbar from "../layouts/landing/Navbar";
import SocialInfluencerImg from "../../assets/social_influencer.png";
import "../../styles/landing/landing.scss";

class Landing extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />

                <div
                    className="container is-fluid"
                    style={{
                        overflow: "hidden",
                        height: "89.8vh",
                        alignItems: "center",
                        display: "flex",
                    }}
                    id="container"
                >
                    <div className="columns">
                        <div
                            className="column is-one-third"
                            style={{display: "flex", alignItems: "center"}}
                        >
                            <div className="content">
                                <h1 className="title">Social Media Platform</h1>
                                <p className="content">
                                    Doodledop is an open source social media platform on with you can share paintings, write with your friends and family and follow them in order to stay in contact.
                                </p>
                                <button className="button is-danger">
                                    Get Started
                                </button>
                            </div>
                        </div>
                        <div
                            className="column"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img src={SocialInfluencerImg} alt="a pic" />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Landing;
