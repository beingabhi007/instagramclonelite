import React, {useState, useEffect} from 'react';
import './App.css';
import Post from "./Post"
import { db, auth } from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';


function getModalStyle() {
  const top = 50; 
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  
 const classes = useStyles();
 const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]) 
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user , setUser] = useState(null)

  // Tis hook is for tracking whether user is logged in or not.
  useEffect(()=> {
   const unsubscribe = auth.onAuthStateChanged( (authUser) => {
      if(authUser)
      {
         //user is logged in
         console.log(authUser); 
         setUser(authUser);
       
      if(authUser.displayName){
        //donot update username
      } 
      else 
      {
        return authUser.updateProfile({
          displayName: username
        })
      }
    }
      else 
      {
        // user has logged out 
        setUser(null);
      }
    })

  return () => {
    unsubscribe();
  }
    
  }, [user, username])


  useEffect( ()=> { 
   
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])

 const signUp = (event) => {
   event.preventDefault();
   
   auth.createUserWithEmailAndPassword(email,password) 
   .then((authUser) => {
     authUser.user.updateProfile({
       displayName: username,
     })
   })
   .catch((error) => {
     alert(error.message);
   })
 }

    const signIn = (event) => {
      event.preventDefault();

      auth.signInWithEmailAndPassword(email, password)
      .catch( (error) => alert(error.message))
      setOpenSignIn(false);
    }   

  return (
    <div className="app">
    
    
  {/* modal for signup */}

    <Modal
        open={open}
        onClose={() => { setOpen(false) }}
      >
      <div style={modalStyle} className={classes.paper}>
     <form className="app__signup">
      <center>
      <img className="app__headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instaLogo"
     /> 
     </center>
     <Input
       placeholder="username"
       type="text" 
       value={username}
       onChange={ (e) => {setUsername(e.target.value)}}
     />
     <Input
       placeholder="email"
       type="text" 
       value={email}
       onChange={ (e) => {setEmail(e.target.value)}}
     /> 
     <Input
      placeholder="password"
      type="password"
      value={password}
      onChange={ (e) => { setPassword(e.target.value) }} 
     />
     <Button type="submit" onClick={signUp} >Sign Up</Button>
      
      </form>
      </div>
      </Modal>

    {/* Modal for Signin  */} 

    <Modal
        open={openSignIn}
        onClose={() => { setOpenSignIn(false) }}
      >
      <div style={modalStyle} className={classes.paper}>
     <form className="app__signup">
      <center>
      <img className="app__headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instaLogo"
     /> 
     </center>
     <Input
       placeholder="email"
       type="text" 
       value={email}
       onChange={ (e) => {setEmail(e.target.value)}}
     /> 
     <Input
      placeholder="password"
      type="password"
      value={password}
      onChange={ (e) => { setPassword(e.target.value) }} 
     />
     <Button type="submit" onClick={signIn} >Sign In</Button>
      
      </form>
      </div>
      </Modal>

     <div className="app__header">
     <img className="app__headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instaLogo"
     /> 
     {user ? (
     <Button onClick={ () => { auth.signOut() }}>Logout</Button> 
     ):(
     <div className="app__loginContainer">
     <Button onClick={() => { setOpenSignIn(true) }} >Sign In</Button>
     <Button onClick={() => { setOpen(true) }} >Sign Up</Button>
     </div>  
     )}
     </div>
     <div className="app__posts">
     {

posts.map( ({ id, post }) => {
return  <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
})
}
     </div>    
     
         
     {user?.displayName ? (
    <ImageUpload username={user.displayName} />
    ) : (
      <h3 style={{textAlign: "center"}} >You need to login to Post something.</h3>
     ) }    

      </div>
  );
}

export default App;
