import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://Derik22244:sifMwJwONNque@cluster0.rjxpi6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

export const db = client.db("spotifyAula");
