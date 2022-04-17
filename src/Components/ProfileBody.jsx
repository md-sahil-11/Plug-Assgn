import React from "react";
import { Row, Col, Divider, Card, Button } from "antd";
import UserAvatar from "./Avatar";

const { Meta } = Card;

const ProfileBody = () => {
  return (
    <div>
      <Card
        hoverable
        // style={{ width: 240 }}
        cover={
          <img
            alt=""
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
        <br />
        <div className="d-flex">
          <Button>{0} Likes</Button>
          <Button>{0} Unlikes</Button>
          <Button>Favourite</Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfileBody;

// <div className="status-body">
//   <Row>
//     <Col span={6}>
//       <UserAvatar />
//     </Col>
//     <Col span={18}>
//         <p>
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati dolorem beatae, tempora placeat quas deleniti corporis vero dolore assumenda! Placeat incidunt nostrum ipsam quidem beatae!
//         </p>
//         <Divider />
//     </Col>
//   </Row>
// </div>
