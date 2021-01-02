import React from "react";
import Navbar from "../layouts/landing/Navbar";
import SocialInfluencerImg from "../../assets/social_influencer.png";
import "../../styles/landing/landing.scss";

class About extends React.Component {
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
                            style={{display: "flex", alignItems: "center"}}
                        >
                            <div className="content">
                                <h1 className="title">About Doodledrop</h1>
                                <p className="content">
                                On Doodle drop users can share their Paintings, follow other users, and draw together.
                                You can write direct messages to your friends and family or write together in group chats.
                                It is also possible to earn badges by completing quests.
                                Follow your friend in order to stay in contact with them.
                                </p>
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

export default About;