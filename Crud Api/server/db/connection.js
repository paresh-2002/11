import { MongoClient, ServerApiVersion } from "mongodb";


const url = process.env.MONGO_URL || 'mongodb://localhost:27017'
const client = new MongoClient(url,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,
    }
});

try{
    await client.connect();
    await client.db("admin").command({ping:1});
    console.log(
        "You successfully connected to MongoDB!"
       );
}catch(e){
    console.log('mongoDB', e.message)
}
let db = client.db("employees")
export default db;