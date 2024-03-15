import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import ProfilePostDisplay from "../../components/ProfilePostDisplay/ProfilePostDisplay";
import PageHeader from "../../components/Header/Header";

import tokenService from "../../utils/tokenService";

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // username comes from the params, defined
  // in the app.js routes  <Route path="/:username" ele
  const { username } = useParams();
  // username should be whatever is in the url
  // localhost:8000/jim => username should be jim
  console.log(username);

  useEffect(() => {
    getProfileInfo()
  }, [username]);

  async function getProfileInfo(){
    try {
      setLoading(true)
      const response = await fetch(`/api/users/${username}`, {
        method: 'GET',
        headers: {
					// convention for sending jwts, tokenService is imported above
					Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage 
					//and and it to our api request
					// so the server knows who the request is coming from when the client is trying to make a POST
				}
      })
      console.log(response.ok)
        //.ok property comes from fetch, and it checks the status code, since profile not found
      // is a 404 the code throws to the fetch block
      if(!response.ok) {throw new Error('Whatever you put in here goes to the catch block')}
      // this is recieving and parsing the json from express
      const data = await response.json();
      console.log("this is data-->", data)
      setLoading(false)
      setPosts(data.data)
      setProfileUser(data.user)
      setError(''); // set error back to blank after successful fetch


    } catch(err){
      console.log(err.message)
      setError('Profile Does Not Exist! Check the Terminal!')
      setLoading(false)
    }
  }


  if(error){
    return(
      <>
        <PageHeader />
        <h1>{error}</h1>
      </>
    )
  }

  if(loading){
    return (
      <>
        <PageHeader />
        <h1>Loading....</h1>
      </>
    )
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <ProfilePostDisplay />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
