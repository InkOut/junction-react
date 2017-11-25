import React, {Component} from 'react';
import {timeDifference} from '../../../helpers/utility';
import Button from '../../../components/uielements/button';
import {InputSearch} from '../../../components/uielements/input';
import {NoteListWrapper} from './noteComponent.style';

function filterApps(apps, search) {
    search = search.toUpperCase();
    if (search) {
        return apps.filter(app => app.name.toUpperCase().includes(search));
    }
    return apps;
}

export class PluginList extends Component {
    constructor(props) {
        super(props);
        this.singleApp = this.singleApp.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = props.onClick;

        this.state = {
            search: '',
            apps: props.apps
        };
    }

    singleApp(app) {
        const {selectedId} = this.props;

        const activeClass = selectedId === app.type ? 'active' : '';
        return (
            <div className={`isoList ${activeClass}`} style={{textAlign: "right"}} key={app.type}>
                <div style={{
                    width: "100%",
                    fontFamily: "Lato",
                    marginLeft: "15px",
                    fontSize: "14px",
                    textAlign: "right",
                    color: "#182345"
                }} className="isoNoteText" onClick={() => this.onClick(app)}>
                    <h3 style={{
                        fontSize: "18px",
                        textAlign: "right",
                        color: "#182345"
                    }}> {app.name}</h3>
                    <span style={{
                        fontSize: "14px",
                        textAlign: "right",
                        color: "#182345"
                    }} className="">{app.description}</span>
                </div>
            </div>
        );
    }

    onChange(event) {
        this.setState({search: event.target.value});
    }

    render() {
        const {search} = this.state;
        const notes = filterApps(this.state.apps, search);
        return (
            <NoteListWrapper className="isoNoteListWrapper">
                <InputSearch
                    placeholder="Search Apps"
                    className="isoSearchNotes"
                    value={search}
                    onChange={this.onChange}
                />
                <div className="isoNoteList">
                    {notes && notes.length > 0 ? (
                        notes.map(app => this.singleApp(app))
                    ) : (
                        <span className="isoNotlistNotice">No App found</span>
                    )}
                </div>
            </NoteListWrapper>
        );
    }
}
