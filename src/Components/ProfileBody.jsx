import React, { useEffect } from "react";
import { Row, Col, Divider, Card, Button } from "antd";
import UserAvatar from "./Avatar";
import { useSelector } from "react-redux";

const { Meta } = Card;

const ProfileBody = (props) => {
  const profileData = useSelector((state) => state.profileData);
  useEffect(() => {
    console.log(props.id, profileData["user_id"]);
  }, []);
  return (
    <div>
      <Card hoverable cover={<img alt="" src={props.image !== ""? props.image: "https://icon-library.com/images/default-user-icon/default-user-icon-7.jpg" } />}>
        <Meta title={props.name} description={props.status} />
        <br />
        <div className="d-flex">
          <Button>{props.likes} Likes</Button>
          <Button>{props.unlikes} Unlikes</Button>
          <Button>Favourite</Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfileBody;