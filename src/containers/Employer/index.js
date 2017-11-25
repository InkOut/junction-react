import React, {Component} from 'react';
import {Layout} from 'antd';
import {connect} from 'react-redux';
import noteActions from '../../redux/notes/actions';
import {ColorChoser} from '../../components/';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../config/basicStyle';
import fakeData from "./../HRVacansy/CreateVacansy/fakeData";
import Input, {
    InputSearch,
    InputGroup,
    Textarea,
} from '../../components/uielements/input';
import Question from "./question";
import {Scope} from "../../iFrameAPI/scope";
import axios from "axios";
import Topbar from '../Topbar/Topbar';

const {changeNote, addNote, editNote, deleteNote, changeColor} = noteActions;
const {Header, Content} = Layout;


class Employer extends Component {
    constructor(props) {
        super(props);
        this.state = {questions: [], actual: 0};
        this.updateNote = this.updateNote.bind(this);
        this.getQuestions();
    }

    updateNote(event) {
        const {editNote, selectedId} = this.props;
        editNote(selectedId, event.target.value);
    }

    showSettings(id) {
        this.setState({
            selectedId: id,
            activeTypeApp: this.state.questions[id].type,
            question: this.state.questions[id],
            app: fakeData.apps.find(v => v.type == this.state.questions[id].type)
        });
    }

    getQuestions() {
        axios.get("http://interviewplus.azurewebsites.net/api/interviews/" + window.location.hash.slice(1))
            .then(d => {
                this.setState({user: d.data, form_id: d.data.form_id});
                axios.get("http://interviewplus.azurewebsites.net/api/questions?form=" + d.data.form_id)
                    .then(d => {
                        this.setState({
                            ready: true, questions: d.data.map(v => {
                                let r = JSON.parse(v.settings);
                                r.id = v.id;
                                return r;
                            })
                        });

                    })
            })

    }

    createQuestion(app) {
        this.state.questions.push({
            type: app.type,
            question: {type: "text", value: "Новый вопрос"},
            settings: app.settings.map(v => ({name: v.name, value: ""}))
        });
        this.setState({
            questions: this.state.questions
        });
        this.showSettings(this.state.questions.length - 1)
    }

    stopQuestion() {

        //
    }

    render() {
        const {url} = this.props.match;
        return (<div style={{background: "#f2f2f2", height: "100vh"}}>
                <Topbar url={url}/>
                <div style={{padding: '80px 0 0', background: "white"}} className="isomorphicNoteComponent">
                    <Row gutter={0} justify="space-between" style={basicStyle.rowStyle}>
                        <Col md={20} push={2}>
                            {this.state.ready ? <Question
                                question={this.state.questions[this.state.actual]}
                                form_id={this.state.form_id}
                                showNext={() => this.setState({actual: this.state.actual + 1})}

                            /> : null}

                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}


export default Employer;
