import React, {Component} from "react";
import './about.less'
import Andrew from '../../res/images/Andrew.jpg'
import YanXu from '../../res/images/YanXu.jpeg'

export default class About extends Component {

    render() {
        console.log(123)

        return (
            <div style={{margin: '20px auto', width: '40%'}}>
                <span className='title'>Developers</span>
                <img style={{marginBottom: "10px"}} src={Andrew} alt=""/>
                <span className='subtitle'>
                        name: Andrew Abel
                    </span>
                <span className='subtitle'>
                        interests: Computer Vision, Natural language Processing, Embedded & real-time systems
                    </span>
                <span className='subtitle'>
                        responsibilities: He is the leader of this project.
                    </span>
                <img style={{marginBottom: "10px", marginTop: 40}} src={YanXu} alt=""/>
                <span className='subtitle'>
                        name: Yan Xu
                    </span>
                <span className='subtitle'>
                        interests: Computer Vision, Natural language Processing, Embedded & real-time systems
                    </span>
                <span className='subtitle'>
                        responsibilities: He is the leader of this project.
                    </span>
                <img style={{marginBottom: "10px", marginTop: 40}} src={YanXu} alt=""/>
                <span className='subtitle'>
                        name: Yan Xu
                    </span>
                <span className='subtitle'>
                        interests: Computer Vision, Natural language Processing, Embedded & real-time systems
                    </span>
                <span className='subtitle'>
                        responsibilities: He is the leader of this project.
                    </span>
                <img style={{marginBottom: "10px", marginTop: 40}} src={YanXu} alt=""/>
                <span className='subtitle'>
                        name: Yan Xu
                    </span>
                <span className='subtitle'>
                        interests: Computer Vision, Natural language Processing, Embedded & real-time systems
                    </span>
                <span className='subtitle'>
                        responsibilities: He is the leader of this project.
                    </span><img style={{marginBottom: "10px", marginTop: 40}} src={YanXu} alt=""/>
                <span className='subtitle'>
                        name: Yan Xu
                    </span>
                <span className='subtitle'>
                        interests: Computer Vision, Natural language Processing, Embedded & real-time systems
                    </span>
                <span className='subtitle'>
                        responsibilities: He is the leader of this project.
                    </span>
            </div>
        );
    }

}
