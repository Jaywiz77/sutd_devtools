import * as React from 'react';
import styled from 'styled-components';

const imgs = [
    'https://cdn.dribbble.com/users/1044993/screenshots/15164458/media/438492641181751fa1470525fc592241.png',
    'https://cdn.dribbble.com/users/1044993/screenshots/15020120/media/0700ec21d15ad3038602bfca3cd5b57d.png',
    'https://cdn.dribbble.com/users/1044993/screenshots/14392603/media/3af3a23806d49fb4d6585a4eded5ebc6.png',
    'https://cdn.dribbble.com/users/1044993/screenshots/6323042/geisha_dribbble.png?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/1044993/screenshots/6058636/media/3262fde71012048bbf38e49eeab3b616.png',
    'https://cdn.dribbble.com/users/1044993/screenshots/10687246/media/cd05468212dd1200e485684177249993.png',
    'https://cdn.dribbble.com/users/1044993/screenshots/7153316/media/d15e25e278ae373fff58646a654f3d77.png',
    'https://cdn.dribbble.com/users/1044993/screenshots/15244435/media/50e14a21dfc26abc183fe98e0552ded7.png?compress=1&resize=1000x750&vertical=top',
    'https://cdn.dribbble.com/users/1044993/screenshots/17146297/media/07d6b0b6aa9ffbe9af7adb9885c46dfb.png',
    'https://cdn.dribbble.com/users/1044993/screenshots/7836149/media/9fa76859ae905b4d44691714e7413b05.png?compress=1&resize=1000x750&vertical=top',
    'https://cdn.dribbble.com/users/1044993/screenshots/6268123/lady-mariachi_dribbble.png?compress=1&resize=400x300&vertical=top',
    'https://cdn.dribbble.com/users/1044993/screenshots/5288556/media/0b1df0a531dde08353f2ba24422fc827.png?compress=1&resize=800x600&vertical=top'
]

const Card = styled.div`

    width:150px;
    height:230px;
    margin:8px;
    border:0px solid white;
    border-radius:5px;
    display:flex;
    box-shadow:4px 4px darkblue;
    flex-direction:column;
    align-items:center;
    background-color:white;
    &:hover{
        box-shadow:4px 4px pink;
    }

`;

const Profile = styled.img`
    width:100%;
    margin-bottom:5px;
    border-radius:5px 5px 0px 0px;

    
`

const EditBtn = styled.button`
    width:40%;
    margin:1px;
    text-align:center;
    background-color:lightblue;
    border:0;
    cursor:pointer;
    &:hover{
        background-color:skyblue;
    }
`


const CompleteBtn = styled.button`
    width:40%;
    margin:1px;
    text-align:center;
    background-color:lightgreen;
    border:0;
    &:hover{
        background-color:limegreen;
    }

`

const DeleteBtn = styled.button`
    width:40%;
    margin:1px;
    text-align:center;
    background-color:pink;
    border:0;
    cursor:pointer;
    &:hover{
        background-color:#e579a3;
    }
`

const InputBox = styled.input`
    width:70%;
    text-align:center;
`


export default function Profile_card(props) {
    const {profile,updateProfiles} = props;
    const [info,updateInfo] = React.useState(profile);

    const onNameChange = (e) => {
        updateInfo({...info,name:e.target.value});
    }

    const onAgeChange = (e) => {
        updateInfo({...info,age:e.target.value});
    }

    const onGenderChange = (e) => {
        updateInfo({...info,gender:e.target.value});
    }

    const onSchoolChange = (e) => {
        updateInfo({...info,school:e.target.value});
    }

    const updateProfile = () => {

        updateProfiles(prevState => {
            const newState = prevState.map(obj => {
              // if id equals profile id, update country property
              
              if (obj.id === profile.id) {
                return {...info,edit:false};
              }
      
              //otherwise return object as is
              return obj;
            });
      
            return newState;
          });

          postData('http://localhost:3001/api/updateProfile', {...info,edit:false})
            .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
    };

    const editProfile = () => {
        updateProfiles(prevState => {
            const newState = prevState.map(obj => {
              // if id equals profile id, update country property
              
              if (obj.id === profile.id) {
                return {...profile,edit:true};
              }
      
              //otherwise return object as is
              return obj;
            });
      
            return newState;
          });

        //   postData('http://localhost:3001/api/editProfile', {...profile,edit:false})
        //   .then((data) => {
        //       console.log(data); // JSON data parsed by `data.json()` call
        //   });
    };
    
    const deleteProfile = () => {
        updateProfiles((current) =>
            current.filter(element => element.id !== profile.id)
          );
        const toDelete = {'profileId':profile.id};
        postData('http://localhost:3001/api/deleteProfile', toDelete)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
    };    

        // Example POST method implementation:
    async function postData(url, data) {
        // Default options are marked with *
        const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers:{'Accept':'application/json','Content-Type':'application/json'},
        body:JSON.stringify(data)})
        const returned = await response.json();
        console.log(returned);
    }



    return profile.edit == false ? (
        <Card >
            <Profile src={imgs[profile.imgId]}/>
            <label>{profile.name}</label>
            <label>{profile.age}</label>
            <label>{profile.gender}</label>
            <label>{profile.school}</label>
            <div style={{display:'flex',width:"100%",justifyContent:"center"}}>
            <EditBtn onClick={editProfile}>Edit</EditBtn>
            <DeleteBtn onClick={deleteProfile}>Delete</DeleteBtn>
            </div>
            
        </Card>
        
    ) : (<Card>
        <Profile src={imgs[info.imgId]}/>
        <InputBox name='name' placeholder="name" value={info.name} onChange={onNameChange}/>
        <InputBox name='age' placeholder="age" value={info.age} onChange={onAgeChange}/>
        <InputBox name='gender'placeholder="gender" value={info.gender} onChange={onGenderChange}/>
        <InputBox name='school' placeholder="school" value={info.school} onChange={onSchoolChange}/>
        <div style={{display:'flex',width:"100%",justifyContent:"center"}}>
        <CompleteBtn onClick={updateProfile}>Done</CompleteBtn>
        </div>
        
    </Card>)
};
