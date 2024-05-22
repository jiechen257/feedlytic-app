
## Usages in TypeScript

here are two TypeScript code snippets, one with parentheses and one without.

```ts
// example A
const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

```ts
// example B
const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

we further abstract the code structure

```ts
// example A
function create<T>() {
  return (configFunction: (set: any) => T) => {
    /* implementation */
  };
}

// example B
function create<T>(configFunction: (set: any) => T) {
  /* implementation */
}
```

If create is a higher-order function that returns another function, Example A is correct. If create is designed to take both the type argument and the configuration function at once, then Example B is correct
