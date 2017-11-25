import React, {Component} from 'react';
import fakeData from "../HRVacansy/CreateVacansy/fakeData"
import {Scope} from "../../iFrameAPI/scope";
import Button from '../../components/uielements/button';
import axios from "axios";
import {Row, Col} from 'antd';
import basicStyle from '../../config/basicStyle';
import Input, {
    InputSearch,
    InputGroup,
    Textarea,
} from '../../components/uielements/input';

class Prepare extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentWillReceiveProps(newprops) {
        console.log("newprops", newprops);

        this.setState({...newprops});

    }

    allowWebcam() {
        navigator.getUserMedia(
            // constraints
            {
                video: true,
                audio: true
            }, () => {

            }, () => {
                document.location.href = "https://google.com"
            }
        )
    }

    render() {

        return (
            <div>
                <Row gutter={0} justify="space-between" style={[basicStyle.rowStyle, {background: "white"}]}>
                    <Col md={7} offset={4}>
                        <h1>Hi! Be ready to be fast and honest</h1>
                        <p style={{fontSize: "14px"}}>
                            jkl ajdalkjsd lkjaskl askld asklj klasj lka jkl ajdalkjsd lkjaskl askld asklj klasj lka jkl
                            ajdalkjsd lkjaskl askld asklj klasj lka jkl ajdalkjsd lkjaskl askld asklj klasj lka jkl
                            ajdalkjsd lkjaskl askld asklj klasj lka
                            jkl ajdalkjsd lkjaskl askld asklj klasj lka
                        </p>

                    </Col>
                    <Col md={8} offset={2}>
                        <h1>We need more information about you</h1>
                        <div style={{flexDirection: "row", display: "flex", fontSize: "15px", fontWeight: "bold"}}>
                            Your Name: <Input
                            value={""}/>
                        </div>
                        <div style={{flexDirection: "row", display: "flex", fontSize: "15px", fontWeight: "bold"}}>
                            Your Email: <Input
                            value={""}/>
                        </div>
                        <Button type="primary" onClick={() => {
                            this.allowWebcam();
                        }}>
                            Allow webcam & GO
                        </Button>


                    </Col>
                </Row>

            </div>
        );
    }
}


export default Prepare;
