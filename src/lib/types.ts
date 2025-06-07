export type EitherWithShared<A, B> =
	| Pick<A, Exclude<keyof A, keyof B> | (keyof A & keyof B)>
	| Pick<B, Exclude<keyof B, keyof A> | (keyof A & keyof B)>;

type KeysOnlyInA<A, B> = Exclude<keyof A, keyof B>;
type KeysOnlyInB<A, B> = Exclude<keyof B, keyof A>;
type SharedKeys<A, B> = Extract<keyof A, keyof B>;

export type AdvancedXOR<A, B> = {
	[P in SharedKeys<A, B>]?: A[P] | B[P];
} & (
	| (Pick<A, KeysOnlyInA<A, B>> & {
			[P in KeysOnlyInB<A, B>]?: never;
	  })
	| (Pick<B, KeysOnlyInB<A, B>> & {
			[P in KeysOnlyInA<A, B>]?: never;
	  })
);

export type Not<T> = {
	[K in keyof T]?: never;
};
