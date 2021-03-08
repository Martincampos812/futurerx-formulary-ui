import React, { Component } from "react";
import { Input, Select } from "antd";

class AddNewTag extends Component<any, any> {
  render() {
    const { Option } = Select;
    const {
      categories,

      tagName,
      tagDesc,
      tagCategories,

      handleChange,
      handleCategoryChange,
    } = this.props;
    return (
      <div className="bordered p-10">
        <div>
          <label className="input-label">name</label>
          <br />
          <Input
            className="input-style"
            onChange={handleChange}
            value={tagName}
            name="name"
          />
        </div>
        <div>
          <label className="input-label">category</label>
          <br />
          <div className="select-box">
            <Select
              mode="tags"
              className="select-style"
              placeholder=""
              onChange={handleCategoryChange}
              dropdownStyle={{ zIndex: 9999 }}
              value={tagCategories}
            >
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.name}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <label className="input-label">description</label>
          <br />
          <Input
            className="input-style"
            onChange={handleChange}
            value={tagDesc}
            name="desc"
          />
        </div>
      </div>
    );
  }
}

export default AddNewTag;
