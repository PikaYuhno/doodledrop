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
                >
                    <div className="columns">
                        <div
                            className="column is-one-third"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <div className="content">
                                <h1 className="title">Social Media Platform</h1>
                                <p className="content">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nulla accumsan, metus
                                    ultrices eleifend gravida, nulla nunc varius
                                    lectus, nec rutrum justo nibh eu lectus. Ut
                                    vulputate semper dui. Fusce erat odio,
                                    sollicitudin vel erat vel, interdum mattis
                                    neque.
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
