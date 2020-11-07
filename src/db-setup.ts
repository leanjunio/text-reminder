import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export default {
  getUserData: () => {
    return {
      firstName: 'John',
      mobile: '+16478368585',
      password: 'some-password',
    };
  },

  connect: async () => {
    const uri = await mongod.getUri();

    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    await mongoose.connect(uri, options);
  },
  closeDatabase: async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  },

  clearDatabase: async () => {
    const collections = mongoose.connection.collections;

    for (const key of Object.keys(collections)) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  },
};
