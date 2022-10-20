import React,{useEffect} from 'react';
import styled from 'styled-components';
import Profile_card from './profile.js'
import addImg from '../img/add.png'

const CardWrapper = styled.div`
    height:100%;
    width:450px;
    min-width:50%;
    display:flex;
    flex-flow:row wrap;
    justify-content:center;
    border-radius:5px;
    margin-bottom:5px;

`;
const Card = styled.div`

    width:150px;
    height:230px;
    margin:8px;
    border:0px solid white;
    border-radius:3px;
    display:flex;
    box-shadow:4px 4px darkblue;
    flex-direction:column;
    align-items:center;
    background-color:white;
    cursor: pointer;
    &:hover{
        background-color:#e0e0e0;
        box-shadow:2px 2px darkblue;
    }
`;

const AddBtn = styled.img`
    width:50%;
    margin-top:50%;
    
`

const ResetBtn = styled.button`
    width:80%;
    height:2em;
    background-color:white;
    border:0px solid white;
    border-radius:3px;
    box-shadow:4px 4px darkblue;
    margin-top:5px;
    margin-bottom:10px;
    cursor:pointer;
    &:hover{
        background-color:#e0e0e0;
        box-shadow:2px 2px darkblue;
    }
`



const data = [
]

export default function CrudUi() {

    const [profiles,updateProfiles] = React.useState(data);
    async function fetchText(url) {
        let response = await fetch(url);
    
        if (response.status === 200) {
            let data = await response.json();
            updateProfiles(data);
        }
    }
    useEffect(()=>{
        fetchText('http://localhost:3001/api/getProfiles');    
    },[]);

    useEffect(()=>{
        // console.log(profiles);
    },[profiles]);

    const addProfileCard = () => {
        var newProfile = {'id':profiles[profiles.length-1].id + 1,'name':'','age':18,'gender':'','school':'','edit':true,'imgId':11};
        updateProfiles([...profiles,newProfile]);
        console.log(profiles);
    }

    const resetProfiles = () =>{
        fetchText('http://localhost:3001/api/resetProfiles');   
    }

  return (
    <CardWrapper>
    {profiles.map(profile => <Profile_card key={profile.id} profile={profile} updateProfiles={updateProfiles}/>)}
    <Card onClick={addProfileCard}>
        <AddBtn src={addImg}/>
    </Card>
    <ResetBtn onClick={resetProfiles}>Reset</ResetBtn>
    <p style={{width:"80%",fontSize:12}}>Images taken from <a href="https://dribbble.com/vaneltia/about">vaneltia</a> </p>
    </CardWrapper>
  );
}



