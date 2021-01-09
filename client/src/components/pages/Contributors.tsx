import React from "react";
import Navbar from "../layouts/landing/Navbar";
import "../../styles/landing/about_contributors.scss";

class Landing extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                    <div className="center">
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
            </React.Fragment>
        );
    }
}

export default Landing;