import React, {Component} from "react";
import {Upload, Button, message} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {fileUpload, reqLogin} from "../../api";

export default class UploadVideo extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    };

    handleUpload = async () => {
        const {fileList} = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        });
        this.setState({
            uploading: true,
        });

        const result = await fileUpload(formData, 'POST')
        if (result.code === 200) {
            this.setState({
                uploading: false,
            })
            message.success('success Upload ' + this.state.fileList[0].name)
        } else {
            message.error('error')
        }
    };

    render() {
        const {uploading, fileList} = this.state;
        const props = {
            accept:".mp4",
            maxCount: 0,
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                if(fileList.length>=1){
                    message.error('Only ONE Video accepted')
                }
                return false;
            },
            fileList,
        };

        return (
            <>
                <div style={{margin: '20px auto', width: '30%'}}>
                    <span>
                    Please Select Your Video of Speaking.
                    </span></div>
                <div align = 'center'>
                    <span style ={{color:'red'}}>
                    Note: Only .mp4 is accepted
                    </span>
                </div>

                <div align = 'center'>
                    <Upload {...props}>
                    <Button icon={<UploadOutlined/>}>Select File</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{marginTop: 16}}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
                </div>
            </>
        );
    }
}