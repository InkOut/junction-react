import React, {Component} from 'react';
import {Layout, Spin} from 'antd';
import {connect} from 'react-redux';
import {ColorChoser} from '../../../components/';
import Button from '../../../components/uielements/button';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import {Row, Col} from 'antd';
import basicStyle from '../../../config/basicStyle';
import axios from "axios";
import {Link} from 'react-router-dom';
import Input, {
    InputSearch,
    InputGroup,
    Textarea,
} from '../../../components/uielements/input';
import Modals from '../../../components/feedback/modal';
import fakeData from "./../../HRVacansy/CreateVacansy/fakeData";
import ModalStyle, {ModalContent} from './modal.style';
import WithDirection from '../../../config/withDirection';
import Response from "./Response";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const {Header, Content} = Layout;


class ShowResponse extends Component {
    constructor(props) {
        super(props);
        this.state = {myForms: [], ready: false};
        this.getEmployers();
    }

    async getEmployers() {
        axios.get("http://interviewplus.azurewebsites.net/api/interviews/" + window.location.hash.slice(1))
            .then(d => {
                this.setState({user: d.data, form_id: d.data.form_id});
                axios.get("http://interviewplus.azurewebsites.net/api/questions?form=" + d.data.form_id)
                    .then(d => {
                        this.setState({
                            questions: d.data.map(v => {
                                let r = JSON.parse(v.settings);
                                r.id = v.id;
                                return r;
                            })
                        });
                        return axios.get("http://interviewplus.azurewebsites.net/api/answers?interview_id=" + window.location.hash.slice(1))
                    })
                    .then(d => {
                        let answers = d.data;
                        this.setState({
                            ready: true,
                            answers
                        });

                    })

            })

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
                            Create Employer
                        </Button>,
                    ]}
                >
                    Name: <Input
                    onChange={(v) => {
                        this.setState({newName: v.nativeEvent.target.value})
                    }}
                    value={this.state.newName}/>
                </Modal>
                <Row gutter={0} justify="space-between" style={basicStyle.rowStyle}>
                    <Col md={18}>
                        <Layout className="isoNotepadWrapper">
                            <Content className="isoNoteEditingArea"
                                     style={{margin: "15px", padding: "15px", background: "white"}}>
                                {!this.state.ready ? (<Spin/>) : (

                                    this.state.answers.map(d => {

                                        let q = this.state.questions.find(q => q.id === d.question_id);
                                        let app = fakeData.apps.find(v => v.type == q.type);
                                        console.log(q, app);
                                        q.settings = {type: "response", data: JSON.parse(d.answer1)};

                                        return <Response question={q}/>

                                    })

                                )}

                            </Content>
                        </Layout>
                    </Col>
                    <Col md={6}>

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

export default ShowResponse;
