import React, {Component} from "react";
import './home.less'
import img1 from '../../res/images/img.png'
import {BackTop} from 'antd';

export default class Home extends Component {

    render() {
        console.log(123)

        return (
            <div style={{margin: '20px auto', width: '40%'}}>
                <span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <span className='title'>Guide</span>
                    <span className='content'>
                        the lip recognition system uses machine vision technology to continuously recognize the face from the image, judge the person who is talking, extract the continuous change characteristics of the person's mouth shape, then input the continuous change characteristics into the lip recognition model, recognize the pronunciation corresponding to the speech population type, and then calculate the natural language sentence with the greatest possibility according to the recognized pronunciation.
                    </span>
                    <span className='content'>
                        Lip recognition is not a recent technology. As early as 2003, Intel developed the lip recognition software audio visual speech recognition (AVSR), which enables developers to develop computers that can perform lip recognition; In 2016, Google deepmind's lip recognition technology can support 17500 words, and the recognition accuracy of news test set has reached more than 50%.
                    </span>
                    <div className='image'>
                    <img src={img1} alt="img1"/>
                    </div>
                    <span className='title'>survey</span>
                    <span className="content">
                        When the audio is damaged, audio visual recognition (AVR) is considered as another solution to complete the task of speech recognition. At the same time, it is also a visual recognition method used to verify the speaker in multi person scene. The method of AVR system is to use the information extracted from one mode to improve the recognition ability of another mode by filling in the missing information. See <a
                        href="https://paperswithcode.com/task/lipreading">https://paperswithcode.com/task/lipreading</a>

                    </span>
                    <span className='title'>problems and methods</span>
                    <span className="content">
                        The key problem of this work is to find out the corresponding relationship between audio and video streams. We propose a coupled 3D convolutional neural network architecture, which can map two modes into a representation space, and use the learned multimodal features to judge the corresponding relationship between audio-visual streams.
                    </span>
                    <span className="title">how to use 3D convolutional neural network</span>
                    <span className="content">
                        The proposed architecture will combine temporal information and spatial information to effectively find the correlation between temporal information of different modes. Our method uses a relatively small network architecture and smaller data sets, and is superior to the existing audio-visual matching methods in performance, while the existing methods mainly use CNN to represent features. We also prove that the effective pair selection method can significantly improve the performance.
                    </span>

                    <span className="title">Exploration</span>
                    <span className='content'>
                        <span style={{marginRight: '6px'}}>World Scientific:</span>
                        <a href="https://www.worldscientific.com/doi/10.1142/S0218001418560074">https://www.worldscientific.com/doi/10.1142/S0218001418560074</a>
                    </span>
                    <span className='content'>
                        <span style={{marginRight: '6px'}}>Real-time lip reading system:</span>
                        <a href="https://www.sciencedirect.com/science/article/abs/pii/S0031320310004516">https://www.sciencedirect.com/science/article/abs/pii/S003132031323</a>
                    </span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </span>
                <BackTop/>
            </div>
        );
    }
}
