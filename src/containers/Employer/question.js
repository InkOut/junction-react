import React, {Component} from 'react';
import fakeData from "../HRVacansy/CreateVacansy/fakeData"
import {Scope} from "../../iFrameAPI/scope";
import Button from '../../components/uielements/button';
import axios from "axios";
import {Timer} from "../../Timer";

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {question: props.question, id: props.id || Math.random()};
        this.reloadScope("main");
    }

    reloadScope(v) {
        console.log("called", v, this.state.question);
        if (this.d)
            this.d.kill();
        this.d = new Scope();
        Timer.setNewTime(this.state.question.limitInSeconds);
        this.d.start(this.state.question.settings, this.state.id);
        this.d.onRendered = () => {
            console.log("timer start");
            Timer.start();
        };
        this.d.onFinished = (d) => {
            axios.post("http://interviewplus.azurewebsites.net/api/answers", {
                "interview_id": window.location.hash.slice(1),
                "question_id": this.state.question.id,
                "form_id": this.props.form_id,
                answer1: JSON.stringify(d),
                type: "none"
            }, {withCredentials: false})
                .then((d) => {
                    this.props.showNext();
                })


        }
    }

    componentWillReceiveProps(newprops) {
        console.log("newprops", newprops);
        this.state.question = newprops.question;

        this.setState({question: newprops.question});

        this.reloadScope("props");
    }

    stopQuestion() {
        this.d.notifyTimeIsUp();
        //this.setState({actual: this.state.actual + 1})
    }

    render() {

        return (
            <div>
                <h1>{this.state.question.question.value}</h1>
                <iframe style={{width: "100%", height: "520px", border: "0"}} id={"app" + this.state.id}
                        src={fakeData.apps.find(v => v.type == this.state.question.type).html + "#" + this.state.id}/>
                <Button type="primary" onClick={() => {
                    this.stopQuestion();
                }}>
                    Следующий вопрос
                </Button>
            </div>
        );
    }
}


export default Question;
