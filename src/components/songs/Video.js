import React, {Component} from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";

const styles = () => ({
    videoResponsive: {
        overflow: "hidden",
    }
});

class YoutubeEmbed extends Component {
    render() {
        const {embedId} = this.props
        return (
            <div className="videoResponsive">
                <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${embedId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </div>
        )
    }
}

export default connect(null, null)(withStyles(styles)(YoutubeEmbed));
