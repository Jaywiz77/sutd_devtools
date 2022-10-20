const express = require('express');
const cors = require('cors');
const e = require('express');
const app = express();

const fs = require('fs');

const readStore = () => {

    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);
    return data;
}
var data = readStore();

app.use(cors());
app.use(express.json());
var reset_data = [
    {'id':1,'name':'Jw','age':18,'gender':'Male','school':'SMU','edit':false,'imgId':0},
    {'id':2,'name':'Jh','age':18,'gender':'Male','school':'SMU','edit':false,'imgId':1},
    {'id':3,'name':'Aus','age':18,'gender':'Male','school':'SIT','edit':false,'imgId':2},
    {'id':4,'name':'Jy','age':18,'gender':'Female','school':'NTU','edit':false,'imgId':3},
    {'id':5,'name':'Yx','age':18,'gender':'Male','school':'SUTD','edit':false,'imgId':4},
    {'id':6,'name':'Hy','age':18,'gender':'Female','school':'NUS','edit':false,'imgId':5},
    {'id':7,'name':'Pam','age':18,'gender':'Female','school':'NUS','edit':false,'imgId':6},
    {'id':8,'name':'Jar','age':18,'gender':'Male','school':'NTU','edit':false,'imgId':7},
    {'id':9,'name':'Tf','age':18,'gender':'Male','school':'NUS','edit':false,'imgId':8},
    {'id':10,'name':'Lx','age':18,'gender':'Female','school':'NUS','edit':false,'imgId':9},
    {'id':11,'name':'Ada','age':18,'gender':'Female','school':'SMU','edit':false,'imgId':10}
];

const saveData = (data) =>{
    let stringify = JSON.stringify(data);
    fs.writeFileSync('data.json', stringify);
}


app.get('/api/getProfiles', (request, response) => {
    response.send(data);

});

app.get('/api/resetProfiles', (request, response) => {
    saveData(reset_data);
    data = reset_data;
    response.send(data);

});

app.post('/api/updateProfile', (request, response) => {
    var toUpdate = request.body;
    var index = data.findIndex(profile => {
            return profile.id === toUpdate.id;
          })
    if (index >= 0){
        data[index] = toUpdate; 
    } else {
        data[data.length] = toUpdate;
    }
    saveData(data);
    return 'success'
});

app.post('/api/editProfile', (request, response) => {
    var toEdit = request.body;
    data = data.filter(element => element.id !== toEdit.profileId);
    data.push(toEdit);
});

app.post('/api/deleteProfile', (request, response) => {
    var toDelete = request.body;
    data = data.filter(element => element.id !== toDelete.profileId)
    return 'success'
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});