import React, { useEffect, useState } from "react";
import { Row, Col, Divider, Card, Button } from "antd";
import UserAvatar from "./Avatar";
import { useSelector } from "react-redux";
import Api from "../utils/api";

const { Meta } = Card;

const ProfileBody = (props) => {
  const [liked, setLiked] = useState([]);
  const [unLiked, setUnLiked] = useState([]);
  const { reactToProfile } = Api();
  const profileData = useSelector((state) => state.profileData);
  useEffect(() => {
    console.log(props.id, profileData["user_id"]);
  }, []);

  const reactionHandler = (action) => {
    if (props.id === profileData["user_id"]) return;
    console.log(liked)
    let val;
    if (action === 'like'){
      console.log(liked);
      val = props.likes
    }
    else{
      val = props.unlikes
      if (props.id in unLiked) return;
      
    } 
    if (action === 'like') {
      if (liked.indexOf(props.id) > -1) {
        // console.log('hereeeee')
        return;
      }
      let l = liked
      l.push(props.id)
      setLiked(l)
    } 
    else {
      let l = unLiked
      l.push(props.id)
      setUnLiked(l)
      setUnLiked([...unLiked, props.id])
    }
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