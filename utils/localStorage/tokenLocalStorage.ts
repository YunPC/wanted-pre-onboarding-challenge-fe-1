import Storage from "./baseLocalStorage";

enum TokenStorageKey {
  TOKEN = "token",
}

class TokenLocalStorage extends Storage<TokenStorageKey> {
  constructor() {
    super();
  }

  getToken(): string | null {
    const data = this.get(TokenStorageKey.TOKEN);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  setToken(token: string) {
    this.set(TokenStorageKey.TOKEN, JSON.stringify(token));
  }
}

export default TokenLocalStorage;
