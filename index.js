const Joi = require('joi');//schema validation
const express = require('express');
const app=express();
app.use(express.json());//adding a piece of middleware
const genres=[
    {id:1,name: 'comedy'},
    {id:2,name: 'romantic'},
    {id:3,name: 'action'},
    ];
app.get('/api/genres',(req,res)=>{
    res.send(genres);
});

app.post('/api/genres',(req,res)=>{

    const { error } = validateGenre(req.body); // object destructuring
   
if ( error ) return res.status(400).send(error.details[0].message) ;
    
    const genre ={
        id: genres.length + 1,
        // inorder to work we need to enable parsing of json object
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
})

app.put('/api/genres/:id',(req,res)=>{
    const genre= genres.find(c => c.id== parseInt(req.params.id));
   if(!genre) return res.status(404).send("the genre with the given id not found");

   const { error } = validateGenre(req.body); // object destructuring
   
if ( error ) return res.status(400).send(error.details[0].message) ;

genre.name=req.body.name;
res.send(genre);

});


app.get('/api/genres/:id',(req,res)=>{

   const genre= genres.find(c => c.id== parseInt(req.params.id));
   if(!genre) return res.status(404).send("the genre with the given id not found");
   res.send(genre);
   
});
 app.delete('/api/genres/:id', (req,res)=> {
    const genre= genres.find(c => c.id== parseInt(req.params.id));
    if(!genre) res.status(404).send("the genre with the given id not found");
   const index = genres.indexOf(genre);
   genres.splice(index,1);
   res.send(genre);

 }
 );
const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening to port ${port}....`));

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required() // schema
           }
           return Joi.validate(genre, schema);
}