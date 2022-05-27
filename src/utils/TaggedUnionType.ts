type Events =
  | { kind: "loading"; data: void }
  | { kind: "error"; data: Error }
  | { kind: "success"; data: string };

type NarrowByKind<Kind, Items extends { kind: string }> = Items extends any
  ? Items["kind"] extends Kind
    ? Items
    : never
  : never;

type TestDataType = NarrowByKind<"success", Events>;

type EventData<
  Kind,
  Event extends { data: any } = NarrowByKind<Kind, Events>
> = Event["data"];

function sendEvent<K extends Events["kind"], D extends EventData<K>>(
  kind: K,
  data: D
) {
  //someBus.send(kind, data);
}

export {};
