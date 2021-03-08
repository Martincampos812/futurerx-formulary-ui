import { Button, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import Avatar from '../Frx-components/avatar/Avatar';
import sampleAvtar from '../../../mocks/sample.svg';
import './FrxTaskList.scss';
interface FrxTaskListState {
    items: any;
}

interface FrxTaskListProps {
    isVisible: boolean;
    isLocked: boolean;
}

const Items = [
    {
        title: "Parent task name",
        isVisible: true,
        isLocked: false,
        subTasks: [
            { isVisible: true, isLocked: false, title: 'Subtask number 1', color: '#80C483' },
            { isVisible: false, isLocked: true, title: 'Subtask number 2', color: '#80C483' },
            { isVisible: true, isLocked: false, title: 'Subtask number 3', color: '#F4AF64' }
        ]
    },
    {
        title: "Parent task name",
        isVisible: true,
        isLocked: false,
        subTasks: [
            { isVisible: true, isLocked: false, title: 'Subtask number 1', color: '#80C483' },
        ]
    }
]
class FrxTaskList extends Component<FrxTaskListProps, FrxTaskListState>{
    state = {
        items: []
    }

    componentDidMount() {
        this.setState({
            items: Items
        })
    }

    createListItem = (type: string, data: any, index?: number) => {
        switch (type) {
            case 'parent': return (<>
                {data.map((item: any, index: number) => (
                    <>
                        <ListItem className="title-root">
                            <ListItemText
                                className="title"
                                primary={item.title}
                            />
                            <ListItemAvatar className="titleAvatar">
                                <Avatar alt="Remy Sharp" src={sampleAvtar} />
                            </ListItemAvatar>
                            {
                                item.isLocked &&
                                <ListItemIcon className="titleIcon-lock">
                                    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.9 3.99969H6V2.79969C6 1.35119 5.3325 0.499695 4 0.499695C2.667 0.499695 2 1.35119 2 2.79969V3.99969H1C0.7235 3.99969 0.5 4.3227 0.5 4.5992V8.49969C0.5 8.77419 0.714 9.06919 0.9755 9.15319L1.574 9.34669C1.89145 9.43923 2.21946 9.49065 2.55 9.49969H5.45C5.78042 9.49073 6.10829 9.43913 6.4255 9.3462L7.0235 9.15269C7.2855 9.06919 7.5 8.77419 7.5 8.49969V4.5992C7.5 4.3227 7.176 3.99969 6.9 3.99969ZM5 3.99969H3V2.59919C3 1.87669 3.3985 1.49969 4 1.49969C4.6015 1.49969 5 1.87669 5 2.59919V3.99969Z" fill="#707683" />
                                    </svg>

                                </ListItemIcon>
                            }
                            {
                                item.isVisible &&
                                <ListItemIcon className="titleIcon-eye">
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.49869 2.99943C6.49869 3.79385 5.82649 4.43786 4.99728 4.43786C4.16808 4.43786 3.49588 3.79385 3.49588 2.99943C3.49588 2.20499 4.16808 1.56099 4.99728 1.56099C5.82649 1.56099 6.49869 2.205 6.49869 2.99943ZM5 0.00439453C4.14146 0.00820286 3.25155 0.217211 2.40913 0.61737C1.78365 0.92672 1.17408 1.36317 0.64495 1.90188C0.385067 2.17687 0.0535917 2.57505 0 2.99989C0.00633333 3.3679 0.401083 3.82214 0.64495 4.09792C1.14114 4.61547 1.73483 5.03974 2.40913 5.38274C3.19473 5.764 4.06427 5.98351 5 5.99572C5.85936 5.99185 6.74907 5.78044 7.59055 5.38274C8.21603 5.07339 8.82591 4.63663 9.35505 4.09792C9.61493 3.82293 9.9464 3.42474 10 2.99989C9.99367 2.63189 9.59892 2.17764 9.35505 1.90186C8.85886 1.38431 8.26485 0.96037 7.59055 0.617353C6.80537 0.236386 5.93368 0.0183862 5 0.00439453ZM4.99937 0.748128C6.30036 0.748128 7.35499 1.75641 7.35499 3.00022C7.35499 4.24402 6.30036 5.2523 4.99937 5.2523C3.69838 5.2523 2.64374 4.24401 2.64374 3.00022C2.64374 1.75641 3.69838 0.748128 4.99937 0.748128Z" fill="#707683" />
                                    </svg>
                                </ListItemIcon>
                            }
                        </ListItem>
                        {this.createListItem('subTasks', item.subTasks, index)}
                        <div className="ss-rectangle"></div>
                    </>
                ))}
                {/* <div className="newTask" onClick={() => {
                    this.setState({ items: [...this.state.items, Items[0]] })
                }}
                >+ add new task</div> */}
            </>)


            case 'subTasks': return (
                <>
                    <div className="subTaskTitle">SUBTASKS</div>
                    {data.map((item: any) => (
                        <ListItem className="subTask-root" data-color={item.color}>
                            <ListItemText
                                className="title"
                                primary={item.title}
                            />
                            <ListItemAvatar className="titleAvatar">
                                <Avatar alt="Remy Sharp" src={sampleAvtar} />
                            </ListItemAvatar>
                            {
                                item.isLocked &&
                                <ListItemIcon className="titleIcon-lock">
                                    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.9 3.99969H6V2.79969C6 1.35119 5.3325 0.499695 4 0.499695C2.667 0.499695 2 1.35119 2 2.79969V3.99969H1C0.7235 3.99969 0.5 4.3227 0.5 4.5992V8.49969C0.5 8.77419 0.714 9.06919 0.9755 9.15319L1.574 9.34669C1.89145 9.43923 2.21946 9.49065 2.55 9.49969H5.45C5.78042 9.49073 6.10829 9.43913 6.4255 9.3462L7.0235 9.15269C7.2855 9.06919 7.5 8.77419 7.5 8.49969V4.5992C7.5 4.3227 7.176 3.99969 6.9 3.99969ZM5 3.99969H3V2.59919C3 1.87669 3.3985 1.49969 4 1.49969C4.6015 1.49969 5 1.87669 5 2.59919V3.99969Z" fill="#707683" />
                                    </svg>

                                </ListItemIcon>
                            }
                            {
                                item.isVisible &&
                                <ListItemIcon className="titleIcon-eye">
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.49869 2.99943C6.49869 3.79385 5.82649 4.43786 4.99728 4.43786C4.16808 4.43786 3.49588 3.79385 3.49588 2.99943C3.49588 2.20499 4.16808 1.56099 4.99728 1.56099C5.82649 1.56099 6.49869 2.205 6.49869 2.99943ZM5 0.00439453C4.14146 0.00820286 3.25155 0.217211 2.40913 0.61737C1.78365 0.92672 1.17408 1.36317 0.64495 1.90188C0.385067 2.17687 0.0535917 2.57505 0 2.99989C0.00633333 3.3679 0.401083 3.82214 0.64495 4.09792C1.14114 4.61547 1.73483 5.03974 2.40913 5.38274C3.19473 5.764 4.06427 5.98351 5 5.99572C5.85936 5.99185 6.74907 5.78044 7.59055 5.38274C8.21603 5.07339 8.82591 4.63663 9.35505 4.09792C9.61493 3.82293 9.9464 3.42474 10 2.99989C9.99367 2.63189 9.59892 2.17764 9.35505 1.90186C8.85886 1.38431 8.26485 0.96037 7.59055 0.617353C6.80537 0.236386 5.93368 0.0183862 5 0.00439453ZM4.99937 0.748128C6.30036 0.748128 7.35499 1.75641 7.35499 3.00022C7.35499 4.24402 6.30036 5.2523 4.99937 5.2523C3.69838 5.2523 2.64374 4.24401 2.64374 3.00022C2.64374 1.75641 3.69838 0.748128 4.99937 0.748128Z" fill="#707683" />
                                    </svg>
                                </ListItemIcon>
                            }
                        </ListItem>
                    ))}
                    <div className="subTasknew" onClick={() => {
                        if (index!==undefined) {
                            var _temp: any = this.state.items
                            _temp[index].subTasks = [..._temp[index].subTasks, { isVisible: true, isLocked: false, title: 'Subtask number ' + (_temp[index].subTasks.length+1), color: '#F4AF64' }]
                            this.setState({ items: _temp })
                        }
                    }}>+ add new subtask</div>
                </>
            )
        }
    }
    render() {
        let { items } = this.state
        return (<List className="FrxTasklist-root">
            {this.createListItem('parent', items)}
        </List >);
    }
}

export default FrxTaskList;