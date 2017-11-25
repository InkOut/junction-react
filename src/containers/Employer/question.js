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
        this.reloadScope("main",props);
    }

    reloadScope(v, props) {
        console.log("called", v, props.question);
        if (this.d)
            this.d.kill();
        this.d = new Scope();

        Timer.setNewTime(props.question.limitInSeconds);
        Timer.onEnd = () => props.question.limitInSeconds > 0 && this.d && this.d.notifyTimeIsUp();
        this.d.start(props.question.settings, props.id);
        this.d.onRendered = () => {
            console.log("timer start");
            Timer.start();
        };
        this.d.onFinished = (d) => {
            axios.post("http://interviewplus.azurewebsites.net/api/answers", {
                "interview_id": window.location.hash.slice(1),
                "question_id": props.question.id,
                "form_id": props.form_id,
                answer1: JSON.stringify(d),
                type: "none"
            }, {withCredentials: false})
                .then((d) => {
                    props.showNext();
                })


        }
    }

    componentWillReceiveProps(newprops) {
        console.log("newprops", newprops);
        this.state.question = newprops.question;

        this.setState({...newprops});

        this.reloadScope("props",newprops);
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
                        src={fakeData.apps.find(v => v.type == this.state.question.type).html + "?" + this.state.id + "#" + this.state.id}/>
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
