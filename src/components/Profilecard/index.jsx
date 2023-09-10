import { Button, Card } from "react-bootstrap";
import { constants } from '../../js/constants';
import useGetProfile from "../../hooks/useGetProfile";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Profilecard(){
    const { profilename } = useParams();
    console.log(profilename);
    const url = `${constants.BASE_URL}${constants.PROFILES}/${profilename}`;
    const { profile } = useGetProfile(url);

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={profile.avatar} />
            <Card.Body>
                <Card.Title>{profile.name}</Card.Title>
                <Card.Text>
                    Mail: {profile.email}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}