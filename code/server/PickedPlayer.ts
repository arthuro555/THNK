let currentPlayerID: string = "";

export const getCurrentPlayerID = () => currentPlayerID;
export const setPickedPlayer = (playerID: string) => {
  currentPlayerID = playerID;
};
