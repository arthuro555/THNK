const closeServer = (runtimeScene: gdjs.RuntimeScene) => {
  if (!runtimeScene.thnkServer) return;
  runtimeScene.thnkServer.adapter.close();
  delete runtimeScene.thnkServer;
};
