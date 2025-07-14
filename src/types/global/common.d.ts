interface Service {
  init: () => PVoid | Promise<PVoid>;
}

interface Store {
  hydrate?: () => PVoid;
}

type Nullable<T> = T | null;
