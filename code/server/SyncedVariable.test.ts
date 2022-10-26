import "../tests-utils/gdjs-mock";
import { SyncedVariable } from "server/SyncedVariable";
import { deserializeVariable } from "client/VariableDeserializer";
import { Variable, Builder, ByteBuffer } from "t-h-n-k";

const serializeVar = (variable: SyncedVariable) => {
  const b = new Builder(512);
  b.finish(variable.serialize(b));
  return b.asUint8Array();
};
const serializeObject = (object: Object) =>
  serializeVar(new SyncedVariable().fromJSObject(object));

const deserializeToVar = (array: Uint8Array) => {
  const buf = new ByteBuffer(array);
  return deserializeVariable(
    new gdjs.Variable(),
    Variable.getRootAsVariable(buf)
  );
};
const deserializeIntoVar = (array: Uint8Array, variable: gdjs.Variable) => {
  const buf = new ByteBuffer(array);
  return deserializeVariable(variable, Variable.getRootAsVariable(buf));
};
const deserializeToObject = (array: Uint8Array) =>
  deserializeToVar(array).toJSObject();

describe("Can serialize and deserialize", () => {
  const testSerializeDeserialize = (testObject: Object) =>
    expect(deserializeToObject(serializeObject(testObject))).toEqual(
      testObject
    );

  test("Simple values", () => {
    testSerializeDeserialize(0);
    testSerializeDeserialize(1);
    testSerializeDeserialize("hello");
    testSerializeDeserialize(true);
    testSerializeDeserialize(false);
  });

  test("Complex objects", () => {
    testSerializeDeserialize({
      hello: "world",
      how: 1,
      are: true,
      you: 0,
    });
    testSerializeDeserialize({
      my: 1,
      is: true,
      boomer: [{ a: 1 }, { b: 2, e: [[[[[{ aha: true }]]]]] }],
      or: { is: ["it?"] },
    });
    testSerializeDeserialize({
      users: ["arthuro", "rinax", "oxey"],
      inventory: [
        { id: 1, amount: 2 },
        { id: 4, tag: "yes", amount: 4 },
      ],
      isAdmin: false,
    });
  });
});

describe("Can keep track of changes", () => {
  test("Gets unclean when changed", () => {
    const v = new SyncedVariable();
    expect(v.isDirty()).toBe(true);
    serializeVar(v);
    expect(v.isDirty()).toBe(false);
    v.setString("a");
    expect(v.isDirty()).toBe(true);
    serializeVar(v);
    expect(v.isDirty()).toBe(false);
  });

  test("Gets unclean when child changed", () => {
    const v = new SyncedVariable();
    const sv = v.getChild("a").getChildAt(0);
    expect(v.isDirty()).toBe(true);
    serializeVar(v);
    expect(v.isDirty()).toBe(false);
    sv.pushValue("a");
    expect(v.isDirty()).toBe(true);
    serializeVar(v);
    expect(v.isDirty()).toBe(false);
  });
});

describe("Can apply changes", () => {
  test("Simple number variable", () => {
    const State = new SyncedVariable();
    State.getChild("MyNumber").setNumber(100);
    const deserialized = deserializeToVar(serializeVar(State));
    expect(deserialized.getChild("MyNumber").getAsNumber()).toBe(100);
  });
  test("Simple nested variable", () => {
    const v = new SyncedVariable();
    const sv = v.getChild("a").getChildAt(0);
    sv.setString("aha");
    const deserialized = deserializeToVar(serializeVar(v));
    expect(deserialized.getChild("a").getChildAt(0).getAsString()).toBe("aha");
    sv.setString("b");
    deserializeIntoVar(serializeVar(v), deserialized);
    expect(deserialized.getChild("a").getChildAt(0).getAsString()).toBe("b");
  });
});
