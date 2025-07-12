import React from "react";

import { container } from "tsyringe";

import { AuthService } from "./auth";

export const services = {
  authService: container.resolve(AuthService),
};

type ContextServices = typeof services;

const servicesContext = React.createContext<ContextServices>(services);
export const ServicesProvider = ({ children }: React.PropsWithChildren) => (
  <servicesContext.Provider value={services}>
    {children}
  </servicesContext.Provider>
);

export const useServices = (): ContextServices =>
  React.useContext(servicesContext);
