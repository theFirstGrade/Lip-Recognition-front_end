import React, {Component} from "react";
import {WebCamWebAPI} from "../../components/webCam/webCamera";
import Camera from "../../components/webCam/camera";

export default class LiveRecord extends Component {

    render() {
        return (
            <div style={{margin: '15px auto', width: ' 80%'}}>
                {/*  <WebCamWebAPI*/}
                {/*    fileTypes={fileTypes}*/}
                {/*    addFile={(imgObj) => {*/}
                {/*        // this.handleApplyPhoto(imgObj);*/}
                {/*    }}*/}
                {/*    onClose={() => {*/}
                {/*        this.setState({*/}
                {/*            PhotoUploadVisible: false*/}
                {/*        })*/}
                {/*    }}*/}
                {/*/>*/}
                <Camera/>
            </div>
        );
    }
}
