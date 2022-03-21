const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const hashPassword = require('../util/hashPassword');

const config = require('../env/configJWT');
const usersFilePath = path.join(__dirname, "../models/users.json");
const {bearer} = require('../env/twitterKeys');

module.exports = apiController = {
    leerData: () => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        return users;
    },
    login: (req, res) => {
        console.log(req.body)
        let users = apiController.leerData();
        let userLogged = users.find(usr => usr.userName === req.body.user || usr.email === req.body.user);
        console.log(userLogged)
        let pass = userLogged.password;
        delete userLogged.password;
        let token = jwt.sign({data: userLogged}, config.SECRET,{expiresIn: 1800});
        
        hashPassword.compare(req.body.password, pass)?res.status(200).json({
            message:"Login successfully",
            token: token,
            userData: userLogged
        }):res.status(401).json({
            message:"Wrong credentials"});
    },
    register: (req, res) => {
        console.log(req.body);
        
        let users = apiController.leerData();
        let userDuplicated = users.find(usr => usr.userName === req.body.userName || usr.email === req.body.email);
        console.log(userDuplicated);
        if (userDuplicated !==undefined) {
            return res.status(409).json({
                message: "Username or email in use"
            })
        }
        let hashPasswd = hashPassword.hash(req.body.password);
        delete req.body.password;
        let newUser = {
            ...req.body,
            password: hashPasswd
        };
        
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8",);
        
        res.status(201).json({
            data: newUser,
            message: "User created",
            created: true
        });
    },
    searchTwitts: (req, res) => {
        let word =req.query.search;
        let config = {
            method: 'get',
            url: `https://api.twitter.com/1.1/search/tweets.json?result_type=popular&lang=es&q=${word}`,
            headers: { 'Authorization': `Bearer ${bearer}` }
        }
        axios(config)
            .then(response=> {
                console.log(response.data);
                res.status(200).json(response.data);
            });
    }
    
}