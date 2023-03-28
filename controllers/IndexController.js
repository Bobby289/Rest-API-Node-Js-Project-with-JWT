const { create,getAllUsers,getUserById,userUpdate,userDelete, getAuth } = require('../models.js');
const { genSaltSync,hashSync, compareSync } = require('bcrypt');
const { phone } = require('phone');
const { sign } = require('jsonwebtoken');
module.exports = {
    createUser : (req,res)=>{
        const body =req.body;
        //const salt = genSaltSync(10);
        //body.phone=hashSync(body.phone,salt);
        //console.log(isMobilePhone(body.phone));
        console.log((phone(body.phone,{country:'IN'})).isValid);
        if(!(phone(body.phone,{country:'IN'})).isValid){
            return res.status(400).json({
                status : 400,
                message : "Invalid mobile number or not in mobile number format"
            })
        }
        create(body,(results,error)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status:500,
                    message:"Database connection error"
                });
            }
            return res.status(200).json({
                status:201,
                message:"data successfully loaded",
                data : results
            })
        });
    },
    getAllUsers : (req,res)=>{
        getAllUsers((results,error)=>{
            if(!error){
                return res.status(200).json({
                    status: 200,
                    message: results
                });
            }
                console.log(error);
                return res.status(404).json({
                    status:404,
                    message:"Something went wrong :("
                });
        })
    },
    getUserById:(req,res)=>{
        let id = req.params.id;
        getUserById(id,(results,error)=>{
            if(error){
                console.log(error);
                return res.json({
                    status: 400 ,
                    message: "something went wrong"
                });
            }
            if(Object.keys(results).length==0){
                return res.status(404).json({
                    status : 404,
                    message: "Record Not Found"
                })
            }
            return res.status(200).json({
                status:200,
                message:"Data Found",
                data : results
            })
        })
    },
    userUpdate:(req,res)=>{
        const body=req.body;
        userUpdate(body,(results,error)=>{
            if(error){
                console.log(error);
                return;
            }
            if(!results){
                return res.status(304).json({
                    status : 304,
                    message : `Data is not modified`
                });
            }
            return res.status(200).json({
                status:201,
                message:"Data Updated",
                data: results
            })
        })
    },
    userDelete:(req,res)=>{
        let id = req.params.id;
        userDelete(id,(results,error)=>{
            if(error){
                console.log(error);
                return;
            }
            if(!results){
                return res.status(404).json({
                    status: 404,
                    message: "Record Not Found"
                })
            }
            return res.status(200).json({
                status:200,
                message: "Record Deleted"
            })
        })
    },
    getAuth : (req,res)=>{
        const body = req.body;
        getAuth(body.name,(error,results)=>{
            if(error){
                console.log(error);
            }
            if(!results){
                return res.status(401).json({
                    status : 401,
                    message: "Invalid ID or Name"
                })
            }
            // console.log(typeof String(body.id));
            // console.log(typeof String(results.id));
            // var result = compareSync("1","1");
            const result = (body.id==results.id);
            console.log(result);
            //String(body.id)
            //String(results.id)
            if(result){
                results.id=undefined;
                const jsontoken = sign({result:results},process.env.KEY,{ expiresIn : "1h"});
                return res.status(200).json({
                    status : 200,
                    message : "Login Successfully",
                    token : jsontoken
                })
            }
            else{
                return res.status(401).json({
                    status : 401,
                    message : "Invalid ID or Name"
                })
            }
        })
    }
}














// var data = require('../database');
// var model = require('../models.js');
// class IndexController{
//     static user(req,res){
//         res.send(model.DataModel.user(req,res));
//     }
//     static user_id(req,res){
//         model.DataModel.user_id(req,res);
//     }
// }

// module.exports.IndexController=IndexController;