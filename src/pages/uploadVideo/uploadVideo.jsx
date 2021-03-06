import React, {Component} from "react";
//
// export default class UploadVideo extends Component {
//
//     render() {
//         console.log(123)
//
//         return (
//             <div style={{margin: '0 auto', width:' 30%'}}>
//                 upload Video
//             </div>
//         );
//     }
// }

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
            formData.append('files[]', file);
        });
        this.setState({
            uploading: true,
        });

        const result = await fileUpload(this.state.fileList[0].name, 'POST')
        if (result.code === 200) {
            this.setState({
                uploading: false,
            })
            message.success('success')
        } else {
            message.error('error')
        }
    };

    render() {
        const {uploading, fileList} = this.state;
        const props = {
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
                return false;
            },
            fileList,
        };

        return (
            <>
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
            </>
        );
    }
}
