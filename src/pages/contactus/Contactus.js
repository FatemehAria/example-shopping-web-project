import React from "react";
import { Card } from "react-bootstrap";

const Contactus = () => {
  return (
    <div>
      <Card className='w-75 mx-auto mt-5'>
        <Card.Header className='bg-secondary fw-semibold text-light'>Conatct Us</Card.Header>
        <Card.Body>
          <Card.Text className="w-75 mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam eveniet doloremque, praesentium fugit provident delectus. Necessitatibus eius consequuntur illo ea?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus delectus tenetur rerum reprehenderit quasi. Numquam error voluptates quo sapiente sint, ratione dicta harum facilis! Odio adipisci sed provident deserunt delectus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim impedit corrupti magnam? Dignissimos molestiae a asperiores laborum quia temporibus eveniet doloribus, voluptatem exercitationem officiis molestias nemo nihil voluptas totam cumque culpa animi iste suscipit omnis pariatur et. Quae, molestias cum.
          </Card.Text>
          <Card.Link href="#">shopping@gmail.com</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Contactus;
