import { generateAccessToken, generateRefreshToken } from "./jwt";

type tokenType = {
  access: string;
  refresh: string;
};

export default function getAuthTokens(payload: object): tokenType {
  try {
    return {
      access: generateAccessToken(payload),
      refresh: generateRefreshToken(payload),
    };
  } catch (error) {
    console.log(`error in lib -> token.ts -> getAuthTokens : ${error}`);
    return { access: "", refresh: "" };
  }
}
