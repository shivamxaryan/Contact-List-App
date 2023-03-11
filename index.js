const express=require('express');
const path=require('path');
const  port='7000';

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList=[
    {
        name:'Shivam',
        number:'123242'
    },{
        name:'Keshav',
        number:'653456'
    },{
        name:'Manwar',
        number:'76345'
    }
]

// app.get('/',function(req,res){

//     Contact.find({},function(err,allcontacts){
//         if(err){
//             console.log('Error found in fetching data');
//             return;
//         }

//         return res.render('profile',{
//             title:'Contact List',
//             contact_list:allcontacts
//         });
//     });

// });

app.get('/',function(req,res){
    Contact.find({})
    .then(function(allcontacts){
        return res.render('profile',{
            title:'Contact List',
            contact_list:allcontacts
        });
    })

    .catch(function(err){
        console.log("Got error on fetching data from db",err);
    });
});

// app.post('/createcontact',function(req,res){
//     // contactList.push(req.body);

//     Contact.create({
//         name:req.body.name,
//         number:req.body.number
//     },function(err,newcontact){
//         if(err){
//             console.log('Error occured in create contact');
//             return;
//         }

//         console.log('*******',newcontact);
//         return res.redirect('back');
//     })
// });

app.post('/createcontact',function(req,res){
    Contact.create({
        name:req.body.name,
        number:req.body.number
    })
    //Using promise here
    .then(function(newcontact){
        console.log('*******',newcontact);
        return res.redirect('back');
    })
    .catch(function(err){
        console.log('Error occured in create contact', err);
    });
});



app.get('/deletecontact',function(req,res){
    console.log(req.query);
    let id=req.query.id;
    
    // Contact.findByIdAndDelete(id,function(err){
    //     if(err){
    //         console.log('Error in deleting data',err);
    //     }

    //     return res.redirect('back');
    // })

Contact.findByIdAndDelete(id)
    .then(function(){
        console.log("Successful in deleting the contact");
        return res.redirect('back');
    })
    .catch(function(err){
        console.log('Error in deleting data',err);
    });
    

});



app.listen(port,function(err){
    if(err){
        console.log("Error has been occured",err);
    }
    console.log("Server is running on Port:",port);
});