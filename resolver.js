import { ObjectId } from "mongodb"; // Ensure this import is present
import { db } from "./dbConnection.js";

const resolvers = {
  Record: {
    id: (parent) => parent.id ?? parent._id,
  },
  Query: {
    async record(_, { id }) {
      const collection = (await db()).collection("records"); // Use the db function
      const query = { _id: new ObjectId(id) };

      return await collection.findOne(query);
    },
    async records(_, __, context) {
      const collection = (await db()).collection("records");
      const records = await collection.find({}).toArray();
      return records;
    },
  },
  Mutation: {
    async createRecord(_, { name, position, level }, context) {
      const collection = (await db()).collection("records");
      const insert = await collection.insertOne({ name, position, level });
      if (insert.acknowledged)
        return { name, position, level, id: insert.insertedId };
      return null;
    },
    async updateRecord(_, args, context) {
      const id = new ObjectId(args.id);
      const query = { _id: id };
      const collection = (await db()).collection("records");
      const update = await collection.updateOne(query, { $set: { ...args } });

      if (update.acknowledged)
        return await collection.findOne(query);

      return null;
    },
    async deleteRecord(_, { id }, context) {
      const collection = (await db()).collection("records");
      const dbDelete = await collection.deleteOne({ _id: new ObjectId(id) });
      return dbDelete.acknowledged && dbDelete.deletedCount === 1;
    },
  },
};

export default resolvers;