import { MongoClient, ServerApiVersion } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.6fugc6u.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    let connectedClient;

    try {
      connectedClient = await client.connect();

      const db = connectedClient.db();

      try {
        const result = await db.collection("messages").insertOne(newMessage);
        newMessage.id = result.insertedId;

        res.status(201).json({
          message: "Successfully stored message",
          savedMessage: newMessage,
        });
      } catch (error) {
        res.status(500).json({ message: "Storing message failed" });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database" });
    } finally {
      await connectedClient.close();
    }
  }
};

export default handler;
