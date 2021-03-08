import React from "react";
import { Row, Col, Avatar, Space } from "antd";
import "./ListItem.css";

function Comment({ child, getStatuColor }) {
  return (
    <Row className="Comment-card" align="middle">
      <Col span={24}>
        <Space size="large">
          {/**/}
          <span
            style={{
              color: getStatuColor(child.validation_status),
            }}
          >
            &#11044;
          </span>
          <span className="title">{child.validation_name}</span>
        </Space>
      </Col>
    </Row>
  );
}

export default Comment;
