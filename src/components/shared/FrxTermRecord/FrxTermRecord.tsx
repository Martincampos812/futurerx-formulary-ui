import { Button, TextareaAutosize } from '@material-ui/core';
import { DatePicker } from 'antd';
import React from 'react';
import CustomDatePicker from '../Frx-components/date-picker/CustomDatePicker';
import NotesList from "../FrxNotesList/FrxNotesList";
import './FrxTermRecord.scss';

interface Props {
    isNotesPopup: boolean;
    close: any;
}
interface State {

}

export default class FrxTermRecord extends React.Component<Props, State>{
    state = {
        date: {},
    }

    textAreaStyles = {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        display: "block"
    };

    render() {
        const { isNotesPopup } = this.props
        return (
            <div className="FrxTermRecord-root">
                {isNotesPopup && <>
                    <NotesList
                        title=""
                        items={[{
                            id: 1,
                            content: "Member no longer has transportation barrier. Post-dated barrier term, called in late.",
                            heading: "George Smith",
                            timeAgo: "09/21/2020",
                            avatar: "https://via.placeholder.com/150",
                            category: "Summary"
                        },
                        {
                            id: 2,
                            content: "Updated member transportation barrier.",
                            heading: "Raghu Rao",
                            timeAgo: "09/18/2020",
                            avatar: "https://via.placeholder.com/150",
                            category: "Summary"
                        }]}
                        type=""
                        notesListClasses={{}}
                    />
                    <div className="noteEdit-area">
                        <TextareaAutosize
                            style={this.textAreaStyles}
                            aria-label="add note"
                            rowsMin={3}
                            placeholder="Add note"
                            className="textArea"
                        />
                        <Button className="saveNote">
                            Save Note
                    </Button>
                    </div>
                </>}
                {!isNotesPopup && <div className="termRecord-root">
                    <div className="form">
                        <div className="form-row">
                            <div className="label">Term date<span>*</span></div>
                            <div className="formField">
                                <CustomDatePicker
                                    onChange={(date: any, dateString: any) => { this.setState({ date: date }) }}
                                    value={this.state.date}
                                    placeholder="Add term date"
                                    className="FrxGenericSearch-root__form__datepicker"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="label">Term note<span>*</span></div>
                            <div className="formField">
                                <TextareaAutosize
                                    style={this.textAreaStyles}
                                    aria-label="add note"
                                    rowsMin={3}
                                    placeholder="Add a custom note to help other users understand why this barrier is being termed."
                                    className="textArea"
                                />
                            </div>
                        </div>
                        <div className="buttonRow">
                            <Button onClick={this.props.close}>Cancel</Button>
                            <Button onClick={this.props.close}>Save</Button>
                        </div>
                    </div>
                    <div className="notes">
                        <NotesList
                            title=""
                            items={[{
                                id: 1,
                                content: "Member no longer has transportation barrier. Post-dated barrier term, called in late.",
                                heading: "George Smith",
                                timeAgo: "09/21/2020",
                                avatar: "https://via.placeholder.com/150",
                                category: "Summary"
                            },
                            {
                                id: 2,
                                content: "Updated member transportation barrier.",
                                heading: "Raghu Rao",
                                timeAgo: "09/18/2020",
                                avatar: "https://via.placeholder.com/150",
                                category: "Summary"
                            },
                            {
                                id: 3,
                                content: "Updated member transportation barrier.",
                                heading: "Raghu Rao",
                                timeAgo: "09/18/2020",
                                avatar: "https://via.placeholder.com/150",
                                category: "Summary"
                            }]}
                            type=""
                            notesListClasses={{}}
                        />
                    </div>
                </div>}

            </div>
        )
    }
}