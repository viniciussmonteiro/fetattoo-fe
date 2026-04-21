export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  desiredStyle?: string;
  message: string;
  company?: string;
};

export type ContactSubmissionResult = {
  receivedAt: string;
  provider: "mock" | "backend";
};
