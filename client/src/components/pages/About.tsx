import React from "react";
import Navbar from "../layouts/landing/Navbar";
import "../../styles/landing/about_contributors.scss";

class About extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="center">
                    <div className="content">
                        <h1 className="title">About Doodledrop</h1>
                            <p className="content">
                            On doodledrop users can share their Paintings, follow other users, and draw together.
                            You can write direct messages to your friends and family or write together in group chats.
                            It is also possible to earn badges by completing quests.
                            Follow your friend in order to stay in contact with them.
                            </p>
                    </div>
                </div>            
            </React.Fragment>
        );
    }
}

export default About;