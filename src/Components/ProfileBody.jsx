import React, { useEffect } from "react";
import { Row, Col, Divider, Card, Button } from "antd";
import UserAvatar from "./Avatar";
import { useSelector } from "react-redux";
import Api from "../utils/api";

const { Meta } = Card;

const ProfileBody = (props) => {
  const { reactToProfile } = Api();
  const profileData = useSelector((state) => state.profileData);
  useEffect(() => {
    console.log(props.id, profileData["user_id"]);
  }, []);

  const reactionHandler = (action) => {
    if (props.id === profileData["user_id"]) return;
    let val;
    if (action === 'like') val = props.likes
    else val = props.unlikes
    reactToProfile(props.id, action, parseInt(val)).then(res => {
      console.log(res);
    })
  }
  return (
    <div>
      <Card hoverable cover={<img style={{height: '300px'}} alt="" src={props.image !== ""? props.image: "https://icon-library.com/images/default-user-icon/default-user-icon-7.jpg" } />}>
        <Meta title={props.name} description={props.status} />
        <br />
        <div className="d-flex">
          <Button onClick={() => reactionHandler('like')}>{props.likes} Likes</Button>
          <Button onClick={() => reactionHandler('unlike')}>{props.unlikes} Unlikes</Button>
          {props.id !== profileData['user_id'] && <Button>Favourite</Button>}
        </div>
      </Card>
    </div>
  );
};

export default ProfileBody;