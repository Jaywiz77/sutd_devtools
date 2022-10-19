import React,{useEffect} from 'react';
import styled from 'styled-components';
import Profile_card from './profile.js'
import addImg from '../img/add.png'

const CardWrapper = styled.div`
    height:100%;
    width:50%;
    display:flex;
    flex-flow:row wrap;
    justify-content:center;

`;
const Card = styled.div`

    width:150px;
    height:230px;
    margin:8px;
    border:0px solid white;
    border-radius:3px;
    display:flex;
    box-shadow:2px 2px grey;
    flex-direction:column;
    align-items:center;
    background-color:white;
    cursor: pointer;
    &:hover{
        background-color:#e0e0e0;
    }
`;

const AddBtn = styled.img`
    width:50%;
    margin-top:50%;
    
`



const data = [
]

export default function CrudUi() {

    const [profiles,updateProfiles] = React.useState(data);
    async function fetchText() {
        let response = await fetch('http://localhost:3001/api/getProfiles');
    
        if (response.status === 200) {
            let data = await response.json();
            updateProfiles(data);
        }
    }
    useEffect(()=>{
        fetchText();    
    },[]);

    useEffect(()=>{
        // console.log(profiles);
    },[profiles]);

    const addProfileCard = () => {
        var newProfile = {'id':profiles[profiles.length-1].id + 1,'name':'','age':18,'gender':'','school':'','edit':true,'imgId':11};
        updateProfiles([...profiles,newProfile]);
        console.log(profiles);
    }

  return (
    <CardWrapper>
    {profiles.map(profile => <Profile_card key={profile.id} profile={profile} updateProfiles={updateProfiles}/>)}
    <Card onClick={addProfileCard}>
        <AddBtn src={addImg}/>
    </Card>
    </CardWrapper>
  );
}



