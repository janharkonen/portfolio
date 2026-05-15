import { env } from "@portfolio/env/server";
import { MongoClient } from "mongodb";

let clientPromise: Promise<MongoClient> | undefined;

export function getMongoClient(): Promise<MongoClient> {
  if (!clientPromise) {
    clientPromise = new MongoClient(env.MONGO_URI).connect();
  }
  return clientPromise;
}

export async function getDB() {
  const client = await getMongoClient();
  const db = client.db("portfolio");
  return db;
}
