export type TaggedState<T extends string> = { tag: T };

export type Initial = TaggedState<'Initial'>;
