import React, { useState, useEffect } from "react";
import { Row, Col, Avatar, Space, Tooltip } from "antd";
import "./PanelContent.css";
// import "../Comment/Comment.css";
// import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import commentImg from "../../../assets/icons/comment.png";
function Comment({ validations, getStatuColor, usersColor }) {
  const [newUsers, setNewUsers] = useState<any[]>([]);
  const {
    validation_name,
    notes_count,
    display_date,
    status,
    prefered_count,
    users,
  } = validations;

  // useEffect(() => {
  //   const newUsers: any[] = [...users];
  //   // console.log("new users ", newUsers);

  //   const colors: string[] = ["#1FDFF9", "#EA5050", "#BDDEB4"];
  //   newUsers.forEach((u, i) => {
  //     u["color"] = colors[i];
  //   });
  //   setNewUsers(newUsers);
  //   return;
  // }, [users]);
  return (
    <Row className="Comment-card2" align="middle">
      <Col xs={24} lg={12}>
        <Space size="large">
          <Avatar
            style={{
              backgroundColor: getStatuColor(status),
              verticalAlign: "middle",
            }}
          >
            {prefered_count}
          </Avatar>
          <span className="title2">{validation_name}</span>
        </Space>
      </Col>
      <Col xs={24} lg={5}>
        <Space size="large">
          <div className="multi-avatar">
            <Avatar.Group
              maxCount={3}
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            >
              {users.length > 0 ? (
                users.map((a) => {
                  return (
                    <Tooltip title={a.name} placement="top">
                      <Avatar
                        src={usersColor[a.name]?.logo}
                        style={{
                          background:
                            usersColor[a.name]?.logo === "empty-avatar"
                              ? usersColor[a.name]?.color
                              : "",
                        }}
                      ></Avatar>
                    </Tooltip>
                  );
                })
              ) : (
                <div className="no-avatar" />
              )}
            </Avatar.Group>
          </div>
          <span className="date2">{display_date}</span>
        </Space>
      </Col>
      <Col xs={24} lg={3} style={{ textAlign: "center" }}>
        <Space size="small">
          {notes_count}
          <img src="/images/comment.png" alt="" />
        </Space>
      </Col>
      <Col xs={24} lg={4} style={{ textAlign: "right" }}></Col>
    </Row>
  );
}

export default Comment;
