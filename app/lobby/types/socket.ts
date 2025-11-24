export interface JoinLobbyPayload {
  username: string;
}

export interface JoinLobbyResponse {
  success: boolean;
  reason?: string;
}
