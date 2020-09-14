import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },                                           // Fields
  email: { type: String, required: true, unique: true, index: true, dropDups: true},
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },                       // default false for users except for the admin
});

const userModel = mongoose.model("User", userSchema);                              // 'User'-Name of the collection/model that would be saved in the 
                                                                                   // mongo.db based on this user schema
export default userModel;
