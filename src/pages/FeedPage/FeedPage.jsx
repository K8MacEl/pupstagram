import { useState, useEffect } from 'react'

import PostFeed from "../../components/PostFeed/PostFeed";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/Header/Header"
import AddPostForm from "../../components/AddPostForm/AddPostForm";

import { Grid } from "semantic-ui-react";

import tokenService from '../../utils/tokenService';

export default function FeedPage() {

  const [posts, setPosts] = useState([]); // this will be an array of objects!	
  const [loading, setLoading] = useState(true)
  // Wherever you store your state, 
  // this is where we will define the api calls, 
  // because when they finish we need to update state
  // to reflect whatever CRUD operation we just performed
  async function handleAddPost(postToSendToServer){
	console.log(postToSendToServer, " formData from addPost form")

	try {
		// Since we are sending a photo
		// we are sending a multipart/formdData request to express
		// so express needs to have multer setup on this endpoint!
		const response = await fetch('/api/posts', {
			method: 'POST',
			body: postToSendToServer, // < No jsonify because we are sending a photo
			headers: {
					// convention for sending jwts, tokenService is imported above
					Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage 
					//and and it to our api request
					// so the server knows who the request is coming from when the client is trying to make a POST
				}
		})

		const data = await response.json();
		//       res.status(201).json({ post }); this value is from express/posts/create controller
		console.log(data, ' response from post request! This from express')
		setPosts([data.post, ...posts])
	} catch(err){
		console.log(err.message)
		console.log('CHECK YOUR SERVER TERMINAL!!!!')
	}

  }

  useEffect(() => {
    // This useEffect is called when the page loads

    // Don't forget to call the function
    getPosts();
  }, []);

  // C(R)UD
  async function getPosts() {
    try {

		// This is going to express to get the posts
		// so this is the start of loading
	  setLoading(true)
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        },
      });

      const data = await response.json();
      // AFTER THIS WE HAVE THE DATA BACK FROM SERVER
      // CHECK THE DATA then update state!
	  setLoading(false)
      console.log(data);
      setPosts(data.posts);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPostForm  handleAddPost={handleAddPost}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
         {loading ? <h1>Loading.....</h1> : <PostFeed  posts={posts} /> } 
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
