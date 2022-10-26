import { type ClientAdapter } from "../adapters/Adapter";
import {
  Builder,
  ClientInputMessage,
  ClientMessage,
  ClientMessageContent,
  ConnectionRequestMessage,
} from "../t-h-n-k";
import { packVariable } from "../utils/VariablePacker";

export const sendConnectionRequest = (
  adapter: ClientAdapter,
  token?: string
) => {
  const builder = new Builder(32);
  const tokenOffset = token ? builder.createString(token) : null;
  ConnectionRequestMessage.startConnectionRequestMessage(builder);
  if (tokenOffset) ConnectionRequestMessage.addToken(builder, tokenOffset);
  const clientMessage =
    ConnectionRequestMessage.endConnectionRequestMessage(builder);

  adapter.sendClientMessage(
    builder,
    ClientMessage.createClientMessage(
      builder,
      ClientMessageContent.ConnectionRequestMessage,
      clientMessage
    )
  );
};

export const sendClientMessage = (
  adapter: ClientAdapter,
  name: string,
  variable: gdjs.Variable
) => {
  const builder = new Builder(256);
  const nameOffset = builder.createString(name);
  const contentOffset = ClientInputMessage.createContentVector(
    builder,
    packVariable(variable)
  );
  const clientMessage = ClientInputMessage.createClientInputMessage(
    builder,
    nameOffset,
    contentOffset
  );

  adapter.sendClientMessage(
    builder,
    ClientMessage.createClientMessage(
      builder,
      ClientMessageContent.ClientInputMessage,
      clientMessage
    )
  );
};
