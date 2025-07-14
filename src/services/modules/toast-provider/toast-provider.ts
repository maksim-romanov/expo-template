import * as Burnt from "burnt";
import { injectable } from "tsyringe";

export interface IToastProvider {
  info(title: string, message?: string): void;
  loading<TResult>(promise: Promise<TResult>, title?: string, message?: string): Promise<TResult>;
}

@injectable()
export class BurntToastProvider implements IToastProvider {
  info(title: string, message?: string) {
    Burnt.toast({
      title: title,
      message: message,
      preset: "none",
    });
  }

  async loading<TResult>(promise: Promise<TResult>, title = "Loading...", message?: string) {
    try {
      Burnt.alert({ title, message, preset: "spinner", duration: 15000 });
      const result = await promise;

      Burnt.dismissAllAlerts();
      Burnt.alert({ title, message, preset: "done" });

      return result;
    } catch (error) {
      Burnt.dismissAllAlerts();
      throw error;
    }
  }
}
