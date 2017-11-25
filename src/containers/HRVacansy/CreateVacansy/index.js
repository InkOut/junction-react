import React, {Component} from 'react';
import {Layout} from 'antd';
import {connect} from 'react-redux';
import noteActions from '../../../redux/notes/actions';
import NoteList, {PluginList} from './pluginList';
import QuestionList from './questionList';
import {ColorChoser} from '../../../components/';
import Button from '../../../components/uielements/button';
import IntlMessages from '../../../components/utility/intlMessages';
import NoteComponentWrapper from './noteComponent.style';
import {Row, Col} from 'antd';
import basicStyle from '../../../config/basicStyle';
import fakeData from "./fakeData";
import {SettingsComponent} from "./settingsComponent";
import Input, {
    InputSearch,
    InputGroup,
    Textarea,
} from '../../../components/uielements/input';
import axios from "axios";

const {changeNote, addNote, editNote, deleteNote, changeColor} = noteActions;
const {Header, Content} = Layout;


class CreateVacansy extends Component {
    constructor(props) {
        super(props);
        this.state = {questions: []};
        setTimeout(this.resize, 1000);

    }

    resize() {
        document.getElementById("logoBack").style.width = document.getElementById("questions").offsetWidth + 49 + "px";
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

    createQuestion(app) {
        this.state.questions.push({
            type: app.type,
            question: {type: "text", value: "New Question"},
            settings: app.settings.map(v => ({name: v.name, value: ""}))
        });
        this.setState({
            questions: this.state.questions
        });
        this.showSettings(this.state.questions.length - 1)
    }

    uploadQuestions() {
        axios.put("http://interviewplus.azurewebsites.net/api/questions?form_id=" + window.location.hash.slice(1),
            this.state.questions.map(q => {
                return {form_id: window.location.hash.slice(1), settings: JSON.stringify(q), app_id: "name"}
            })
        ).then(console.log)
    }

    render() {

        const {
            notes,
            selectedId,
            changeNote,
            deleteNote,
            addNote,
            colors,
            seectedColor,
            changeColor
        } = this.props;
        const selectedNote =
            selectedId !== undefined
                ? notes.filter(note => note.id === selectedId)[0]
                : null;
        return (
            <NoteComponentWrapper style={{padding: "0"}} className="isomorphicNoteComponent">
                <Row gutter={0} justify="space-between" style={basicStyle.rowStyle}>
                    <Col md={4} id="questions">
                        <div className="isoNoteListSidebar">
                            <QuestionList
                                notes={this.state.questions}
                                selectedId={selectedId}
                                changeNote={id => this.showSettings(id)}
                                deleteNote={deleteNote}
                                colors={colors}
                            />
                        </div>
                    </Col>
                    <Col md={14} offset={1} style={{paddingTop: "50px"}}>
                        <Layout className="isoNotepadWrapper">
                            <Header className="isoHeader">
                                {this.state.selectedId !== undefined ? (
                                    <div>
                                        <h3>Question:
                                            <Input
                                                onChange={(v) => {
                                                    this.state.questions[this.state.selectedId].question.value = v.nativeEvent.target.value;
                                                    console.log(this.state.questions);
                                                    this.setState({
                                                        questions: this.state.questions,
                                                        question: this.state.questions[this.state.selectedId]
                                                    })
                                                }}
                                                value={this.state.questions[this.state.selectedId].question.value}/>
                                        </h3>
                                        <h3>Limit in seconds:
                                            <Input
                                                onChange={(v) => {
                                                    this.state.questions[this.state.selectedId].limitInSeconds = v.nativeEvent.target.value;
                                                    console.log(this.state.questions);
                                                    this.setState({
                                                        questions: this.state.questions,
                                                        question: this.state.questions[this.state.selectedId]
                                                    })
                                                }}
                                                value={this.state.questions[this.state.selectedId].limitInSeconds }/>
                                        </h3>
                                    </div>
                                ) : (
                                    ''
                                )}
                                <Button style={{float: "left"}} onClick={() => {
                                    this.uploadQuestions()
                                }}>Загрузить</Button>
                            </Header>
                            <Content className="isoNoteEditingArea" style={{margin: "15px"}}>
                                {this.state.selectedId !== undefined ? (
                                    <div>
                                        <SettingsComponent
                                            onChange={(v) => {
                                                console.log(JSON.stringify(this.state.questions));
                                                console.log(v);
                                            }}
                                            app={fakeData.apps.find(a => a.type === this.state.activeTypeApp)}
                                            settings={this.state.questions[this.state.selectedId].settings}
                                        />
                                    </div>
                                ) : (
                                    ''
                                )}
                                {/*{selectedId !== undefined ? <span>{`created at ${selectedNote.createTime}`}</span> : ''}*/}
                            </Content>
                        </Layout>
                    </Col>
                    <Col offset={1} md={4}>
                        <div className="isoNoteListSidebar">
                            <PluginList
                                apps={fakeData.apps}
                                onClick={v => this.createQuestion(v)}
                                selectedId={selectedId}
                                changeNote={changeNote}
                                deleteNote={deleteNote}
                                colors={colors}
                            />
                        </div>
                    </Col>
                </Row>
            </NoteComponentWrapper>
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

export default CreateVacansy;
