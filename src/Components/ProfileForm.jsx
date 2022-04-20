import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { saveProfile, saveId, loaded, loading } from "../actions";
import AuthProvider from "../auth/auth";
import Api from "../utils/api";
import firebase from "firebase/app";
import "firebase/storage";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ProfileForm = ({ setVisible }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [form] = Form.useForm();
  const profileData = useSelector((state) => state.profileData);
  const { signOut, user } = AuthProvider();
  const { addUser, getUser, updateUser } = Api();
  const dispatch = useDispatch();

  useEffect(() => {
    const { name, gender, status, image } = profileData;
    console.log(profileData);
    form.setFieldsValue({
      name: name,
      gender: gender,
      status: status,
    });

    setImageUrl(image);
  }, []);

  useEffect(() => {
    if (user) {
      getUser(user.uid).then((res) => {
        const { name, status, gender } = res;
        console.log(res);
        form.setFieldsValue({
          name: name,
          gender: gender,
          status: status,
        });
      });
    }
  }, [user]);

  const onNameChange = (e) => {
    console.log(e.target.value);
  };

  const onStatusChange = (e) => {
    console.log(e.target.value);
  };

  const onGenderChange = (value) => {
    console.log(value);
  };

  const onImageChange = (e) => {
    console.log(e);
    let file = e.file;
    console.log(file);
    setImageUploading(true);
    const ref = firebase.storage().ref(`/images/${file.name}`);
    const uploadTask = ref.put(e.file.originFileObj);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        console.log(url);
        setImageUrl(url);
        setImageUploading(false);
        message.info("Image has been uploaded.");
      });
    });
  };

  const onFinish = (values) => {
    if (imageUploading) {
      message.success("Wait image is getting uploaded.");
      return;
    }
    console.log(values);
    const { name, gender, status } = values;
    const data = {
      name,
      gender,
      status,
      image: imageUrl,
    };
    if (name !== "" && gender !== "" && status !== "") {
      updateUser(data).then((res) => {
        console.log(res);
      });
      setVisible(false);
    }
    dispatch(saveProfile(data));
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {};

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input onChange={onNameChange} />
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Input onChange={onStatusChange} />
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
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        {/* <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button> */}
        <Button onClick={() => signOut()}>Logout</Button>
      </Form.Item>
    </Form>
  );
};
export default ProfileForm;
