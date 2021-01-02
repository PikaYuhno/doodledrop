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
                            style={{display: "flex", alignItems: "center"}}
                        >
                            <div className="content">
                                <h1 className="title">Contributors</h1>
                                <p className="content">
                                    <table>
                                        <tr>
                                            <td>
                                                Muaz Ahmed
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Thomas Boigner
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Shervin Ettefagh
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Karl-Gabriel Jimenez
                                            </td>
                                        </tr>
                                    </table>
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

export default Landing;