const pool = require("./database");
const { compareSync } = require('bcrypt');

module.exports = {
    create: ( data , callBack)=>{
        pool.query(
            `insert into emp_users(name,phone,address,create_at,update_at)
                values(?,?,?,now(),now())`,
            [
                data.name,
                data.phone,
                data.address
            ],
            (error,results)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(results);
            }
        );
    },
    getAllUsers: (callBack)=>{
        pool.query(
            `select * from emp_users`,(error,results)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(results);
            }
        )
    },
    getUserById: (id,callBack)=>{
        pool.query(
            `select * from emp_users where id=?`,[id],(error,results)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(results);
            }
        )
    },
    userUpdate: (body,callBack)=>{
        pool.query(
            `update emp_users set name=?,phone=?,address=?,update_at=now() where id=?`,[
                body.name,
                body.phone,
                body.address,
                body.id
            ],(error,results)=>{
                if(error){
                    return callBack(error);
                }

                return callBack(results);
            }
        )
    },
    userDelete: (id,callBack)=>{
        pool.query(
            `delete from emp_users where id=?`,[id],
            (error,results)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(results);
            }
        )
    },
    getAuth: (name,callBack)=>{
        pool.query(
            `select * from emp_users where name = ?`,[name],(error,results)=>{
            if(error){
                return callBack(error);
            }   
            // console.log(results[0]);
            // console.log(" results")
            // console.log(results);
            return callBack(null,results[0]);

            }
        )
    }

}




























// const data = require('./database.js');

// class DataModel{
//     static user(req,res){
//         data.pool.query(`select * from emp_users`,(err,res)=>{
//             if(err){
//                 return console.log(err);
//             }
//             var userApi=JSON.parse(JSON.stringify(res));
//             console.log(userApi);
//             //return JSON.stringify(res);
//             //return user;
//         })
//         //console.log(userApi);
//         return(userApi);
//         // var user1= JSON.parse(user);
//         // user = CircularJSON.stringify(user);
//         // JSON.parse(user);
//        // res.send(user1);
//     }

//     static user_id(req,res){
//         data.pool.query(`select * from emp_users where id=?`,[req.params.id],(err,result)=>{
//             if(err){
//                 return err;
//             }
//             res.send(JSON.parse(JSON.stringify(result)));
//         })
//     }


//     static emp(req,res){
//         data.pool.query(`select * from emp_details_table`,(err,res)=>{
//             if(err){
//                 return console.log(err);
//             }
//             var emp=JSON.parse(JSON.stringify(res));
//             return res.send(emp);
//         })
//     }
//     static salary(req,res){
//         data.pool.query(`select * from emp_salary_table`,(err,res)=>{
//             if(err){
//                 return console.log(err);
//             }
//             var salary=JSON.parse(JSON.stringify(res));
//             return res.send(salary);
//         })
//     }
// }

// module.exports.DataModel=DataModel;




