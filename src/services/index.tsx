import React from "react";

import { container } from "tsyringe";

import { ApplicationService } from "./application";
import { AuthService } from "./auth";

export const services = {
  authService: container.resolve(AuthService),
  appService: container.resolve(ApplicationService),
};

type ContextServices = typeof services;

const servicesContext = React.createContext<ContextServices>(services);
export const ServicesProvider = ({ children }: React.PropsWithChildren) => (
  <servicesContext.Provider value={services}>{children}</servicesContext.Provider>
);

export const useServices = (): ContextServices => React.useContext(servicesContext);

export async function initServices() {
  for (const service of Object.values(services)) await service.init();
}
