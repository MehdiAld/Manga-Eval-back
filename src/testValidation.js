import mongoose from "mongoose";
import User from "./models/userModel"; 

async function testValidation() {
  
  await mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    
    const user = new User({
      username: "testuser",
      email: "testuser@example.com",
      password: "short" 
    });
    
   
    await user.save();
  } catch (error) {
    
    console.log("Erreur attendue :", error.message);
  } finally {
   
    mongoose.disconnect();
  }
}

testValidation();
