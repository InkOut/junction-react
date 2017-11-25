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

import ModalStyle, {ModalContent} from './modal.style';
import WithDirection from '../../../config/withDirection';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const {Header, Content} = Layout;


class MyForms extends Component {
    constructor(props) {
        super(props);
        this.state = {myForms: [], ready: false};
        this.getEmployers();
    }

    async getEmployers() {
        let data = await axios.get("http://interviewplus.azurewebsites.net/api/interviews?form_id=" + window.location.hash.slice(1), {

            headers: {"Content-Type": "application/json"}
        });
        data = data.data;
        this.setState({myEmployers: data, ready: true});
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
        axios.post("http://interviewplus.azurewebsites.net/api/interviewees?name=" + this.state.newName, {}, {withCredentials: true})
            .then((d) => {
                axios.post("http://interviewplus.azurewebsites.net/api/interviews", {
                    "interviewee_id": d.data,
                    "form_id": window.location.hash.slice(1)
                }, {withCredentials: true})
                    .then((d) => {
                        this.state.myEmployers.push({id: d.data, name: this.state.newName});
                        this.setState({myEmployers: this.state.myEmployers});
                    })
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
                                <Button onClick={() => {
                                    this.setState({visible: true, newName: ""})
                                }}>
                                    + Add Employer
                                </Button>
                                {!this.state.ready ? (<Spin/>) : (
                                    <table>
                                        {this.state.myEmployers.map(d => {
                                            return <tr>
                                                <td>{d.name}</td>
                                                <td>
                                                    <Link to={'./showEmployerResponse#' + d.id}>
                                                      <span className="isoMenuHolder" style={{}}>
                                                        <span className="nav-text">
                                                          Open
                                                        </span>
                                                      </span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        })}
                                    </table>
                                )}

                            </Content>
                        </Layout>
                    </Col>
                    <Col md={6}>
                        <Layout className="isoNotepadWrapper">
                            <Content className="isoNoteEditingArea"
                                     style={{margin: "15px", padding: "15px", background: "white"}}>
                                <h1>Hi! Do you want to share this vacancy?</h1>

                            </Content>
                        </Layout>
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
