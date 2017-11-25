import React, {Component} from 'react';
import {Layout, Spin} from 'antd';
import {connect} from 'react-redux';
import {ColorChoser} from '../../../components/';
import Button from '../../../components/uielements/button';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import {Row, Col} from 'antd';
import basicStyle from '../../../config/basicStyle';
import axios from "axios";
import Input, {
    InputSearch,
    InputGroup,
    Textarea,
} from '../../../components/uielements/input';
import {Form} from "./form";
import Modals from '../../../components/feedback/modal';

import FlipMove from 'react-flip-move';
import ModalStyle, {ModalContent} from './modal.style';
import WithDirection from '../../../config/withDirection';
import {SingleCardWrapper, SortableCardWrapper} from './../../Shuffle/shuffle.style';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const {Header, Content} = Layout;


class MyForms extends Component {
    constructor(props) {
        super(props);
        this.state = {myForms: [], ready: false};
        this.getForms();
    }

    async getForms() {
        let data = await axios.get("http://interviewplus.azurewebsites.net/api/forms?hr=login", {

            headers: {"Content-Type": "application/json"}
        });
        data = data.data;
        this.setState({myForms: data, ready: true});
        console.log(data);
    }

    createForm() {
        this.setState({visible: true})
    }

    handleCancel() {
        this.setState({visible: false})
    }

    handleOk() {
        this.setState({visible: false});
        axios.post("http://interviewplus.azurewebsites.net/api/forms", {
            hr_login: "login",
            name: this.state.newName
        }, {withCredentials: false}).then((d) => {
            window.location.href = "/dashboard/createVacansy#" + d.data
        })
    }

    render() {

        return (
            <LayoutWrapper>
                <Modal
                    visible={this.state.visible}
                    title="Title"
                    onOk={() => this.handleOk()}
                    onCancel={() => this.handleCancel()}
                    footer={[
                        <Button key="back" size="large" onClick={() => this.handleCancel()}>
                            Cancel
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            size="large"
                            loading={this.state.loading}
                            onClick={() => this.handleOk()}
                        >
                            Create Form
                        </Button>,
                    ]}
                >
                    Name: <Input
                    onChange={(v) => {
                        this.setState({newName: v.nativeEvent.target.value})
                    }}
                    value={this.state.newName}/>
                </Modal>
                <div style={{
                    background: "blue",
                    color: "white",
                    textAlign: "center",
                    fontSize: "33pt",
                    lineHeight: "60px",
                    margin: "5px",
                    width: "60px",
                    position: "fixed",
                    bottom: "50px",
                    right: "50px",
                    height: "60px",
                    borderRadius: "100px"
                }} onClick={() => this.createForm()}>
                    +
                </div>
                <Row gutter={0} justify="space-between" style={basicStyle.rowStyle}>
                    <Col md={2}>

                    </Col>
                    <Col md={20}>
                        <Layout className="isoNotepadWrapper">
                            <Content className="isoNoteEditingArea" style={{margin: "15px"}}>
                                <SortableCardWrapper
                                    id="shuffle"
                                    className={`isomorphicSortableCardsHolder grid`}
                                >
                                    <div className="isoSortableCardsContainer">
                                        <FlipMove
                                            staggerDurationBy="30"
                                            duration={500}
                                            enterAnimation={this.state.enterLeaveAnimation}
                                            leaveAnimation={this.state.enterLeaveAnimation}
                                            typeName="ul"
                                        >
                                            {!this.state.ready ? (<Spin/>) : (
                                                this.state.myForms.map(d => {
                                                    return <Form
                                                        form={d}
                                                        onClick={(d) => window.location.href = "/dashboard/formEmployers#" + d}/>
                                                })
                                            )}
                                        </FlipMove>
                                    </div>
                                </SortableCardWrapper>

                            </Content>
                        </Layout>
                    </Col>
                    <Col md={2}>

                    </Col>
                </Row>
            </LayoutWrapper>
        );
    }
}

function mapStateToProps(state) {
    const {notes, selectedId, colors, seectedColor} = state.Notes.toJS();
    return {
        notes,
        selectedId,
        colors,
        seectedColor
    };
}

export default MyForms;
