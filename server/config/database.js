import mongoose from "mongoose";

export const connectDB = async () => {
  const { connection } = await mongoose.connect(
    "mongodb+srv://Balu:o4M33bR0fIJoaNry@audiobook.znvfn.mongodb.net/firsttask?retryWrites=true&w=majority"
  );
  console.log(`connect with database ${connection.host}`);
};
