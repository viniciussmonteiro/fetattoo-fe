export type DatabaseClient = {
  provider: "mock" | "postgres" | "mysql";
  isConnected: boolean;
};

let cachedClient: DatabaseClient = {
  provider: "mock",
  isConnected: true
};

export async function getDatabaseClient(): Promise<DatabaseClient> {
  return cachedClient;
}

export async function configureDatabase(provider: DatabaseClient["provider"]) {
  cachedClient = {
    provider,
    isConnected: provider === "mock" ? true : false
  };

  return cachedClient;
}
