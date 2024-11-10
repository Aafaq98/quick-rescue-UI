import {Account, AlertProfile, Login} from "../models/models";

export class AlertBuilder {
  static buildAlert(form: any, id?: number , alertId?:number): AlertProfile {
    const obj: AlertProfile = {
      account: {
        id: id
      },
      location: {
        city: form.city,
        country: form.country,
      },
      name: form.name
    };

    if(alertId){
      obj.id = alertId;
    }
    return obj
  }
}
