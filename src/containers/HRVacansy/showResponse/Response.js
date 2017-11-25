import React, {Component} from 'react';
import fakeData from "../../HRVacansy/CreateVacansy/fakeData"
import {Scope} from "../../../iFrameAPI/scope";
import Button from '../../../components/uielements/button';
import axios from "axios";

class Response extends Component {
    constructor(props) {
        super(props);

        this.state = {question: props.question, id: props.id || Math.random()};
        console.log(this.state);
        this.reloadScope("main");
    }

    reloadScope(v) {
        console.log("called", v, this.state.question);
        if (this.d)
            this.d.kill();
        this.d = new Scope();

        this.d.start(this.state.question.settings, this.state.id);
        this.d.onRendered = () => {

        };
        this.d.onFinished = (d) => {

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
            </div>
        );
    }
}


export default Response;
