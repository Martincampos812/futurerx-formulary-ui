import React from 'react';

class MemberInfo extends React.Component {
    render() {
        return(
            <div className="member-info-root">
                <div className="member-name">
                    Member name
                </div>
                <div className="member-status">
                    Active
                </div>
                <div className="member-lob">
                    Medicare
                </div>
                <div className="dev-status pending">
                    TODO: All pending
                </div>
            </div>
        );
    }
}

export default MemberInfo;