let currentPlayerID: string = "";

export const getCurrentPlayerID = () => currentPlayerID;
export const switchPlayerContext = (playerID: string) => {
  currentPlayerID = playerID;
};
