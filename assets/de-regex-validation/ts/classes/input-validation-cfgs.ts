import {ValidationCfgs} from "./validation-cfgs";

export class InputValidationCfgs extends ValidationCfgs {

  processValidationCfgs(validationCfgs) {
    const cfgs = [];
    for (let cfg of validationCfgs) {
      if (typeof cfg === 'string' && this.hasCfgByName(cfg)) {
        cfgs.push(this.getCfgByName(cfg));
      } else if (typeof cfg === 'object') {
        cfgs.push(cfg);
      }
    }

    return cfgs;
  }

  setProcessedCfgs(inputCfgs: ValidationConfigs) {
    const intersectedCfgs = [];
    for (const inputCfg of inputCfgs) {
      let customCfg = true;
      for (const validationCfg of this._validationCfgs) {
        if (inputCfg.name === validationCfg.name) {
          intersectedCfgs.push($.extend(true, {}, validationCfg, inputCfg));
          customCfg = false;
        }
      }
      if (customCfg) {
        intersectedCfgs.push(inputCfg);
      }
    }
    this._validationCfgs = intersectedCfgs;
    this.checkConfigForConsistency();
    this.removeDuplicatedCfgsByNames();
  }
}