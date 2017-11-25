import React, {Component} from 'react';
import {SingleCardWrapper, SortableCardWrapper} from './../../Shuffle/shuffle.style';

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {form: props.form};

    }


    render() {

        return (
            <SingleCardWrapper className={"isoSingleCard card grid"}
                               onClick={() => this.props.onClick(this.state.form.id)}>
                <div style={{fontSize: "30px", color: "#000000", fontFamily: "Lato"}}>{this.state.form.name}</div>
            </SingleCardWrapper>
        );
    }
}


