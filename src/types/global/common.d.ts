interface Service {
  init: () => PVoid | Promise<PVoid>;
}

interface Store {
  hydrate?: () => PVoid;
}

interface UseCase {
  execute: () => PVoid | Promise<PVoid>;
}

type Nullable<T> = T | null;
