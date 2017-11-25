import React, {Component} from 'react';
import {timeDifference} from '../../../helpers/utility';
import Button from '../../../components/uielements/button';
import {NoteListWrapper} from './noteComponent.style';

import Async from '../../../helpers/asyncComponent';
import Input, {
    InputSearch,
    InputGroup,
    Textarea,
} from '../../../components/uielements/input';
import CodeMirror, {CodeMirrorToolbar} from './../../AdvancedUI/codeMirror/codeMirror.style';

const Editor = (props) => <Async
    load={import(/* webpackChunkName: "forms-editor" */ '../../../components/uielements/editor')}
    componentProps={props}/>;

function filterNotes(notes, search) {
    search = search.toUpperCase();
    if (search) {
        return notes.filter(note => note.note.toUpperCase().includes(search));
    }
    return notes;
}

export class SettingsComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props, "this is props");

        this.onChanged = props.onChange;
        this.onChange = this.onChange.bind(this);
        this.state = {
            search: '',
            settings: props.settings,
            app: props.app
        };
    }

    componentWillReceiveProps(newprops) {
        this.setState({app: newprops.app, settings: newprops.settings});
        console.log("componentWillReceiveProps", "new", newprops);
    }

    textArea(v) {
        let o = this.state.settings.find(s => s.name == v.name);
        console.log("o", o);
        return (<div>
            <h3>{v.say}</h3>
            <Input
                type="textarea"
                autosize={{minRows: 2, maxRows: 50}}
                onChange={(v) => {
                    console.log(v.nativeEvent.target);
                    o.value = v.nativeEvent.target.value;
                    this.setState({settings: this.state.settings});
                    this.onChange();
                }} value={o.value}/>
        </div>)
    }

    input(v) {
        let o = this.state.settings.find(s => s.name == v.name);
        console.log("o", o);
        return (<div>
            <h3>{v.say}</h3>
            <Input
                onChange={(v) => {
                    console.log(v.nativeEvent.target);
                    o.value = v.nativeEvent.target.value;
                    this.setState({settings: this.state.settings});
                    this.onChange();
                }} value={o.value}/>
        </div>)
    }

    code(v) {
        let o = this.state.settings.find(s => s.name == v.name);
        console.log("o", o);
        return (<div>
            <h3>{v.say}</h3>

            <CodeMirror
                options={{lineNumbers: true, theme: 'hopscotch'}}
                onChange={(v) => {
                    console.log(v);
                    o.value = v;
                    this.setState({settings: this.state.settings});
                    this.onChange();
                }} value={o.value}/>
        </div>)
    }

    onChange() {
        this.onChanged(this.state.settings);
    }

    render() {
        console.log("actual state", this.state);
        return (this.state.app.settings.map(v => this[v.type](v)));
    }
}
