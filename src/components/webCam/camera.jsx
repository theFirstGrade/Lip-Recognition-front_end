import React from 'react'
import {message, Button, Upload, Switch, Select, InputNumber} from 'antd'
import {fileUpload, imageUpload} from "../../api";
import Canvas2Image from "canvas2image";
import {UploadOutlined} from "@ant-design/icons";
import JSZip from 'jszip'
import test from '../../res/test.zip'
import JSZipUtils from "jszip-utils";
import img1 from '../../res/images/img_2.png'

const {Option} = Select;
const replaySpeedList = {'speed1': 0.25, 'speed2': 0.5, 'speed3': 0.75, 'speed4': 1.0}
export default class Camera extends React.Component {

    state = {
        fileList: [],
        mouth: [],
        feature: [],
        gabor: [],
        working: true,
        replaySpeed: replaySpeedList['speed4'],
        maxFrameNum: 0,
        currentFrame: 0
    }

    handlePhoto = () => {
        if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
            console.log('调用了')
            this.getUserMedia({
                video: {
                    width: 480,
                    height: 320
                }
            }, this.success, error);
        } else {
            alert('不支持访问用户媒体');
        }
        if (!navigator.mediaDevices) {
            message.warning("不支持访问用户媒体")
        }

        function error(error) {
            console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
        }
    }

    getUserMedia = (constraints, success, error) => {
        if (navigator.mediaDevices.getUserMedia) {
            //最新的标准API
            navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia) {
            //webkit核心浏览器
            navigator.webkitGetUserMedia(constraints, success, error)
        } else if (navigator.mozGetUserMedia) {
            //firfox浏览器
            navigator.mozGetUserMedia(constraints, success, error);
        } else if (navigator.getUserMedia) {
            //旧版API
            navigator.getUserMedia(constraints, success, error);
        }
    }


    success = (stream) => {
        let video = document.getElementById('video');

        //兼容webkit核心浏览器
        let CompatibleURL = window.URL || window.webkitURL;
        //将视频流设置为video元素的源
        console.log(stream);

        // video.src = CompatibleURL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    }

    onCloseDevice = () => {
        //关闭
        let video = document.getElementById('video')
        // video.src = null;
        // video.srcObject = null;
        // video.srcObject = null;
        // video.pause()
        // if(this.mediaStreamTrack){
        //     this.mediaStreamTrack.enabled = false
        // }
        // this.mediaStreamTrack && this.mediaStreamTrack.stop();
        video.srcObject.getTracks()[0].stop()
    }

    getImg = () => {
        console.log(1111111111111111)
        // const video = document.getElementById('cameraVideo') as HTMLVideoElement;
        // const canvas = document.getElementById('cameraCanvas') as HTMLCanvasElement;
        let video = document.getElementById('video')

        const canvas = document.getElementById('snap')
        if (canvas == null) {
            return;
        }

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight); // 把视频中的一帧在canvas画布里面绘制出来
        // const file = new Blob();
        // canvas.toBlob(async blob => {
        //     console.log(new File([blob], 'pic.jpg'))
        // const a = document.getElementById("a");
        // a.href = URL.createObjectURL(blob);
        // a.download = 'C:\\Users\\年级第一\\Desktop\\test01.jpg';
        //     let result = await imageUpload(new File([blob], 'pic.jpg'), 'POST')
        //     if (result.code === 200) {
        //         message.success('成功')
        //     } else {
        //         message.error('失败')
        //     }
        // })

        // let img = new Image(300, 300)

        let imgStr = canvas.toDataURL('image/png'); // 将图片资源转成字符串
        const base64Img = imgStr.split(';base64,').pop(); // 将图片资源转成base64格式
        const imgData = {
            base64Img
        };
        // img.src = imgStr
        // let image = Canvas2Image.convertToJPEG(canvas, video.videoWidth, video.videoHeight)

        let dataurl = canvas.toDataURL("image/png");
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let file = new File([u8arr], 'fypTest', {type: mime});


        this.setState({
            fileList: [file]
        }, async () => {
            const {fileList} = this.state;
            const formData = new FormData();
            fileList.forEach(file => {
                formData.append('file', file);
            });
            this.setState({
                uploading: true,
            });
            console.log(2222222222222222)
            const result = await imageUpload(formData, 'bPOST')
            // if (result) {
            //     console.log(result)
            //     let blob = new Blob([result], {type: "img/jpg"});
            //     let url = (URL).createObjectURL(blob);
            //     let captchaImg = document.getElementById('mouthImg')
            //     if (captchaImg) {
            //         // @ts-ignore
            //         captchaImg.src = url
            //         captchaImg.onload = function () {
            //             URL.revokeObjectURL(url)
            //         }
            //     }
            //     // this.setState({
            //     //     mouth: this.state.mouth.push(url)
            //     // },()=>{console.log(url)})
            // }
            const zip = new JSZip()
            // 参数originFileObj我传入的是File文件对象，在此为压缩包
            if (result) {
                zip.loadAsync(result).then((res) => {
                    // if (res.file('mouth.jpg') == null) return
                    console.log(res)
                    if (!res.files.mouth) return
                    res.file('mouth').async('blob').then((data) => {
                        let url = (URL).createObjectURL(data);
                        console.log(url)
                        let captchaImg = document.getElementById('mouthImg')
                        if (captchaImg) {
                            // @ts-ignore
                            const mouth = this.state.mouth
                            mouth.push(res.files.mouth)
                            this.setState({
                                mouth: mouth
                            }, () => {
                                console.log(this.state.mouth)
                            })
                            captchaImg.src = url
                            captchaImg.onload = function () {
                                URL.revokeObjectURL(url)
                            }
                        }
                    })

                    res.file('feature').async('blob').then((data) => {
                        let url = (URL).createObjectURL(data);
                        console.log(url)
                        let captchaImg = document.getElementById('featureImg')
                        if (captchaImg) {
                            // @ts-ignore
                            const feature = this.state.feature
                            feature.push(res.files.feature)
                            this.setState({
                                feature: feature
                            }, () => {
                                console.log(this.state.feature)
                            })
                            captchaImg.src = url
                            captchaImg.onload = function () {
                                URL.revokeObjectURL(url)
                            }
                        }
                    })

                    res.file('gabor').async('blob').then((data) => {
                        let url = (URL).createObjectURL(data);
                        console.log(url)
                        let captchaImg = document.getElementById('gaborImg')
                        if (captchaImg) {
                            // @ts-ignore
                            const gabor = this.state.gabor
                            gabor.push(res.files.gabor)
                            this.setState({
                                gabor: gabor,
                                maxFrameNum: this.state.maxFrameNum + 1
                            }, () => {
                                console.log(this.state.maxFrameNum)
                            })
                            captchaImg.src = url
                            captchaImg.onload = function () {
                                URL.revokeObjectURL(url)
                            }
                        }
                    })
                    // console.log('resFile', res, res.files['图片/4.png.json']) // 打印一！如下图
                    // console.log(res.file('图片/4.png.json')) // 打印二！如下图
                    // 可通过res.forEach((path, file) => {})获取所有文件，第一个参数为文件路径，第二个参数是jszip里的文件对象
                    // 或者可利用Object.keys(res.files)得到压缩包里的所有文件（包括文件夹）再循环获取其中的文件
                    // res.file('图片/')在获取文件夹时返回为空，可基此判断是否为文件夹
                    // 或者通过res.files['图片/']获得的对象里的dir参数为true判断为文件夹
                    // res.file('图片/4.png.json').async('blob').then((data) => {
                    //     console.log('data', data, new File([data], '4.png.json', {
                    //         type: 'application/json'
                    //     })) // 打印三！如下图 -- 为最终所得File对象
                    // })
                })
            }
        })
    };

    replay = () => {
        let mouthImg = document.getElementById('mouthImg')
        if (mouthImg) {
            if (this.state.mouth.length === 0) return
            let mouthIndex = 0
            let a = setInterval(() => {

                this.state.mouth[mouthIndex].async('blob').then((data) => {
                    let url = (URL).createObjectURL(data);

                    mouthImg.src = url
                    mouthImg.onload = () => {
                        URL.revokeObjectURL(url)
                    }
                    mouthIndex++
                    if (mouthIndex >= this.state.mouth.length) {
                        clearInterval(a)
                    }
                })
            }, 60 / this.state.replaySpeed)
        }

        let gaborImg = document.getElementById('gaborImg')
        if (mouthImg) {
            let gaborIndex = 0
            let a = setInterval(() => {

                this.state.gabor[gaborIndex].async('blob').then((data) => {
                    let url = (URL).createObjectURL(data);

                    gaborImg.src = url
                    gaborImg.onload = () => {
                        URL.revokeObjectURL(url)
                    }
                    gaborIndex++
                    if (gaborIndex >= this.state.gabor.length) {
                        clearInterval(a)
                    }
                })
            }, 60 / this.state.replaySpeed)
        }

        let featureImg = document.getElementById('featureImg')
        if (featureImg) {
            let featureIndex = 0
            let a = setInterval(() => {

                this.state.feature[featureIndex].async('blob').then((data) => {
                    let url = (URL).createObjectURL(data);

                    featureImg.src = url
                    featureImg.onload = () => {
                        URL.revokeObjectURL(url)
                    }
                    featureIndex++
                    if (featureIndex >= this.state.feature.length) {
                        clearInterval(a)
                    }
                })
            }, 60 / this.state.replaySpeed)
        }
    }

    start = () => {
        this.setState({
            working: true
        })
        let a = setInterval(() => {
            this.getImg()
            if (!this.state.working) {
                clearInterval(a)
            }
        }, 60)
    }

    stop = () => {
        this.setState({
            working: false
        })
    }

    handleCamera = (on) => {
        if (on) {
            this.handlePhoto()
        } else {
            this.onCloseDevice()
        }
    }

    handleChangeSpeed = (value) => {
        this.setState({
            replaySpeed: replaySpeedList[value]
        })
    }

    handleChangeFrame = (value) => {
        let mouthImg = document.getElementById('mouthImg')
        if (value > this.state.maxFrameNum) {
            value = this.state.maxFrameNum
        }
        this.setState({
            currentFrame: value
        }, () => {
            if (mouthImg) {
                console.log(this.state.maxFrameNum, value - 1)
                this.state.mouth[value - 1].async('blob').then((data) => {
                    let url = (URL).createObjectURL(data);
                    mouthImg.src = url
                    mouthImg.onload = () => {
                        URL.revokeObjectURL(url)
                    }
                })
            }
            let featureImg = document.getElementById('featureImg')
            if (featureImg) {
                this.state.feature[value - 1].async('blob').then((data) => {
                    let url = (URL).createObjectURL(data);
                    featureImg.src = url
                    featureImg.onload = () => {
                        URL.revokeObjectURL(url)
                    }
                })
            }
            let gaborImg = document.getElementById('gaborImg')
            if (gaborImg) {
                this.state.gabor[value - 1].async('blob').then((data) => {
                    let url = (URL).createObjectURL(data);
                    gaborImg.src = url
                    gaborImg.onload = () => {
                        URL.revokeObjectURL(url)
                    }
                })
            }
        })
    }

    render() {
        const {fileList} = this.state;

        const props = {
            accept: ".jpg",
            maxCount: 0,
            // onRemove: file => {
            //     this.setState(state => {
            //         const index = state.fileList.indexOf(file);
            //         const newFileList = state.fileList.slice();
            //         newFileList.splice(index, 1);
            //         return {
            //             fileList: newFileList,
            //         };
            //     });
            // },
            // beforeUpload: file => {
            //     this.setState(state => ({
            //         fileList: [...state.fileList, file],
            //     }));
            //     if (fileList.length >= 1) {
            //         message.error('Only ONE pic accepted')
            //     }
            //     return false;
            // },
            fileList,
        };

        return (
            <div style={{}} className='identify'>
                <div style={{height: '60%'}}>
                    <div style={{float: 'left', width: '50%'}}>
                        <video id='video' width="600" height="420" controls>
                        </video>
                        <div style={{display: 'none'}}>
                            <canvas id='snap' width="600" height="420">
                            </canvas>
                        </div>
                    </div>
                    <div style={{float: 'right', width: '50%', marginTop: 20}}>
                        <div style={{marginBottom: 15}}>
                            <span style={{
                                fontSize: 19,
                                marginRight: 10,
                                verticalAlign: 'middle'
                            }}>open the webcam:</span>
                            <Switch style={{}} checkedChildren="on" unCheckedChildren="off" onChange={(checked) => {
                                this.handleCamera(checked)
                            }}/>
                        </div>

                        <div style={{marginBottom: 15}}>
                            <span style={{
                                fontSize: 19,
                                marginRight: 10,
                                verticalAlign: 'middle'
                            }}>get the current frame:</span>
                            <div style={{display: 'inline-block'}}>
                                <Button onClick={() => this.getImg()}>Capture</Button>
                            </div>
                        </div>

                        <div style={{marginBottom: 15}}>
                            <span style={{
                                fontSize: 19,
                                marginRight: 10,
                                verticalAlign: 'middle'
                            }}>live record:</span>
                            <div style={{display: "inline-block", marginRight: 10}}>
                                <Button onClick={() => this.start()}>start</Button>
                            </div>
                            <div style={{display: "inline-block", marginRight: 10}}>
                                <Button onClick={() => this.stop()}>stop</Button>
                            </div>
                            <div style={{display: "inline-block"}}>
                                <Button onClick={() => this.replay()}>replay</Button>
                            </div>
                        </div>

                        <div style={{marginBottom: 15}}>
                            <span style={{
                                fontSize: 19,
                                marginRight: 10,
                                verticalAlign: 'middle'
                            }}>replay speed:</span>
                            <Select defaultValue="speed4" style={{width: 120}}
                                    onChange={(value) => this.handleChangeSpeed(value)}>
                                <Option value="speed1">0.25</Option>
                                <Option value="speed2">0.5</Option>
                                <Option value="speed3">0.75</Option>
                                <Option value="speed4">1.0</Option>
                            </Select>
                        </div>

                        <div style={{marginBottom: 15}}>
                            <span style={{
                                fontSize: 19,
                                marginRight: 10,
                                verticalAlign: 'middle'
                            }}>current Frame:</span>
                            <InputNumber min={1} max={this.state.maxFrameNum} value={this.state.currentFrame}
                                         onChange={(value) => {
                                             this.handleChangeFrame(value)
                                         }}/>
                            <span style={{marginLeft:5}}>(max is {this.state.maxFrameNum})</span>
                        </div>

                        <div>
                            <span style={{color: 'grey', fontSize: 16}}>#instructions:</span>
                            <br/>
                            <span>The live record may be affected by the processing speed of CPU/GPU. There might be some delay. </span>
                            <br/>
                            <span>If you need help using the live record, please click <a href="">here</a>.</span>
                        </div>

                    </div>
                </div>
                <div style={{height: '10%', clear: 'both', visibility: 'hidden'}}>
                    aa
                    <br/>
                    aa
                </div>
                <div style={{height: '30%', clear: 'both'}}>
                    <div style={{display: 'inline-block', marginRight: 10}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <img style={{width: 500, height: 317, border: '2px solid #1DA57A'}} id='mouthImg' src={img1}
                                 alt="no pics"/>
                            <div style={{margin: '10px auto', fontSize: 23, fontWeight: 500}}>mouth</div>
                        </div>
                    </div>
                    <div style={{display: 'inline-block', marginRight: 10}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <img style={{width: 500, height: 317, border: '2px solid #1DA57A'}} id='featureImg'
                                 src={img1} alt="no pics"/>
                            <div style={{margin: '10px auto', fontSize: 23, fontWeight: 500}}>feature</div>

                        </div>
                    </div>
                    <div style={{display: 'inline-block'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <img style={{width: 500, height: 317, border: '2px solid #1DA57A'}} id='gaborImg' src={img1}
                                 alt="no pics"/>
                            <div style={{margin: '10px auto', fontSize: 23, fontWeight: 500}}>gabor</div>

                        </div>
                    </div>
                </div>
                <div style={{display: 'none'}}>
                    <Upload {...props}>
                    </Upload>
                </div>

                {/*<a href="" id="a">click here to download your file</a>*/}
            </div>
        )
    }
}
