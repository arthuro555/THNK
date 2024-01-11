export async function loadScene(
  runtimeGame: gdjs.RuntimeGame,
  sceneName: string
): Promise<gdjs.RuntimeScene> {
  if (!runtimeGame.areSceneAssetsReady(sceneName)) {
    await runtimeGame.loadSceneAssets(sceneName);
  }
  return runtimeGame.getSceneStack().replace(sceneName, true)!;
}

export async function pauseScene(
  runtimeGame: gdjs.RuntimeGame,
  sceneName: string
): Promise<gdjs.RuntimeScene> {
  if (!runtimeGame.areSceneAssetsReady(sceneName)) {
    await runtimeGame.loadSceneAssets(sceneName);
  }
  return runtimeGame.getSceneStack().push(sceneName)!;
}
