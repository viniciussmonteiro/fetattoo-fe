export type StorageConfig = {
  provider: "mock" | "s3" | "cloudinary";
  bucket?: string;
};

const storageConfig: StorageConfig = {
  provider: "mock"
};

export async function getStorageConfig(): Promise<StorageConfig> {
  return storageConfig;
}

export async function createUploadSignature(fileName: string) {
  return {
    provider: storageConfig.provider,
    uploadUrl: `/uploads/mock/${encodeURIComponent(fileName)}`,
    expiresInSeconds: 600
  };
}
