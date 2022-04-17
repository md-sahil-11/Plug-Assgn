import React from "react";
import { Form, Input, Button, Select, Upload } from "antd";
// import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// const props = {
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   onChange({ file, fileList }) {
//     if (file.status !== 'uploading') {
//       console.log(file, fileList);
//     }
//   },
// };

const ProfileForm = () => {
  const [form] = Form.useForm();

  const onNameChange = (e) => {
    console.log(e.target.value)
  }

  const onStatusChange = (e) => {
    console.log(e.target.value)
  }

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        return;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        return;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
    }
  };

  const onImageChange = (e) => {
    console.log(e.fileList[0]);
  }

  const onFinish = (values) => {
    console.log('here' + values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input onChange={onNameChange} />
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Input onChange={onStatusChange}/>
      </Form.Item>
      <Form.Item name="image" label="Image">
        <Upload onChange={onImageChange}>
          <Button>Upload New</Button>
        </Upload>
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
export default ProfileForm;
