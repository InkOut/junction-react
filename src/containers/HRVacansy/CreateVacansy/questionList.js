import React, {Component} from 'react';
import {timeDifference} from '../../../helpers/utility';
import Button from '../../../components/uielements/button';
import {InputSearch} from '../../../components/uielements/input';
import {NoteListWrapper} from './noteComponent.style';

function filterNotes(notes, search) {
    search = search.toUpperCase();
    if (search) {
        return notes.filter(note => note.note.toUpperCase().includes(search));
    }
    return notes;
}

export default class questionList extends Component {
    constructor(props) {
        super(props);
        this.singleNote = this.singleNote.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            search: '',
            notes: props.notes
        };
    }

    componentWillReceiveProps(newprops) {
        this.setState({notes: newprops.notes});
    }


    singleNote(note, i) {
        const {selectedId, deleteNote, changeNote, colors} = this.props;

        const activeClass = selectedId === i ? 'active' : '';
        const onChange = () => changeNote(i);
        const onDelete = () => deleteNote(i);
        return (
            <div style={{padding: "0 20px"}} className={`isoList ${activeClass}`} key={i}>
                <div className="isoNoteText" onClick={onChange}>
                    <h3 style={{
                        fontSize: "18px",
                        textAlign: "left",
                        wordWrap: "break-word",
                        color: "#182345"
                    }}>{note.question.value}</h3>
                    <span style={{
                        fontSize: "14px",
                        textAlign: "left",
                        color: "#182345"
                    }}
                          className="isoNoteCreatedDate">
                        {note.type}
                    </span>
                </div>
                <Button
                    className="isoDeleteBtn"
                    icon="close"
                    type="button"
                    style={{}}
                    onClick={onDelete}
                />
            </div>
        );
    }

    onChange(event) {
        this.setState({search: event.target.value});
    }

    render() {
        const {search} = this.state;
        const notes = filterNotes(this.state.notes, search);
        return (
            <NoteListWrapper className="isoNoteListWrapper">
                <h2 style={{"padding": "25px"}}>
                    Questions
                </h2>
                <div className="isoNoteList">
                    {notes && notes.length > 0 ? (
                        notes.map((note, i) => this.singleNote(note, i))
                    ) : (
                        <span className="isoNotlistNotice">No question created</span>
                    )}
                </div>
            </NoteListWrapper>
        );
    }
}
