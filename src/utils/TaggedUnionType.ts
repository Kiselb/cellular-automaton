type Kinds = "loading" | "error" | "success";

type EventBase<K extends Kinds, T> = { kind: K; data: T };

type EventLoading = EventBase<"loading", void>;
type EventError = EventBase<"error", Error>;
type EventSuccess = EventBase<"success", string>;

// type Events =
//   | { kind: "loading"; data: void }
//   | { kind: "error"; data: Error }
//   | { kind: "success"; data: string };

type Events = EventLoading | EventError | EventSuccess;

type DataByKind<Kind, Items extends { kind: string }> = Items extends any
  ? Items["kind"] extends Kind
    ? Items
    : never
  : never;

type TestDataType = DataByKind<"success", Events>;

type EventData<
  Kind,
  Event extends { data: any } = DataByKind<Kind, Events>
> = Event["data"];

function send(kind: Kinds, data: unknown) {
  return false;
}

//function sendEvent<K extends Events["kind"], D extends EventData<K>>(
function sendEvent<K extends Kinds, D extends EventData<K>>(kind: K, data: D) {
  send(kind, data);
}

export {};
