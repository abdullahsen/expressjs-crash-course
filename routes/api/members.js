const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('./../../Members');

//Get all members
router.get('/',(req,res)=> {
    res.json(members);
})

//Get single member
router.get('/:id', (req,res) => {
    const isFound = members.some(member=>member.id===parseInt(req.params.id));

    if (isFound){
        //Filter method creates new array
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg:`No member with the id of ${req.params.id}`});
    }
    
    //Alternative for filter method
    //members.filter(function(member){
    // return member.id === parseInt(req.params.id);   
    //})
})

//Create member
router.post('/', (req,res)=>{
    const newMember = {
        id:uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.email || !newMember.name){
       return res.status(400).json({msg:'Please insert email and name'});
    }

    members.push(newMember);
    res.json(members);
})

//Update member
router.put('/:id', (req,res) => {
    const isFound = members.some(member=>member.id===parseInt(req.params.id));

    if (isFound){
        const updatedMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)){
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.email = updatedMember.email ? updatedMember.email : member.email;
                res.json({msg: 'Member updated', member});
            }
        })
    }else{
        res.status(400).json({msg:`No member with the id of ${req.params.id}`});
    }
})

router.delete('/:id', (req,res) => {
    const isFound = members.some(member=>member.id===parseInt(req.params.id));

    if (isFound){
        res.json({msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))}); 
    }else{
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }

})



module.exports = router;