import {ValidationConfig, ValidationConfigs} from "../interfaces/config";

export class ValidationCfgs {
  protected _validationCfgs: ValidationConfigs = [
    {
      name: 'letters',
      regex: /^[a-zA-Z]*$/,
      notice: 'Only letters'
    },
    {
      name: 'letters_special',
      regex: /^[a-zA-Z\/\-\s]*$/,
      notice: 'Only letters, spaces / -'
    },
    {
      name: 'letters_special_2',
      regex: /^[a-zA-Z\/\-\s\.\,]*$/,
      notice: 'Only words, spaces / - , .'
    },
    {
      name: 'digits_only',
      regex: /^\d*$/,
      notice: 'Digits only'
    },
    {
      name: 'digits9',
      regex: /^([0-9]{9})?$/,
      notice: 'Exactly 9 digits'
    },
    {
      name: 'digits10',
      regex: /^([0-9]{10})?$/,
      notice: 'Exactly 10 digits'
    },
    {
      name: 'digits_and_separators_only',
      regex: /^[\d.,]*$/,
      notice: 'Digits and separators only'
    },
    {
      name: 'number',
      regex: /^\-?([1-9]+|0[.,]\d+|[1-9]+?[.,]\d+)$/,
      notice: 'Provide valid number',
    },
    {
      name: 'letters_digits_only',
      regex: /^[a-zA-Z0-9]*$/,
      notice: 'Only letters, digits, space and -'
    },
    {
      name: 'letters_digits_special',
      regex: /^[a-zA-Z\/\-\s0-9]*$/,
      notice: 'Only letters, digits, space / -'
    },
    {
      name: 'letters_digits_special_2',
      regex: /^[a-zA-Z\/\-\,\.\s0-9]*$/,
      notice: 'Only letters, digits, space / - , .'
    },
    {
      name: 'email',
      regex: /^(\S+@\S+\.\S{2,})?$/,
      notice: 'Provide valid email'
    },
    {
      name: 'required',
      regex: /^.+$/,
      notice: 'This field is required'
    },
    {
      name: 'password_6',
      regex: /^(.{6,})?$/,
      notice: 'Password requires at least 6 symbols'
    },
    {
      name: 'phone',
      regex: /^(\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{5,14})?$/,
      notice: 'Provide phone in the international format'
    },
    {
      name: 'hex_value',
      regex: /^(#?[0-9a-f]*)?$/,
      notice: 'Provide valid hex value'
    },
    {
      name: 'rgb_color_value',
      regex: /^(rgb\(\s?(1[0-9]{2}|[0-9]|[1-9][0-9]|2([0-4][0-9]|5[0-5]))\s?\,\s?(1[0-9]{2}|[0-9]|[1-9][0-9]|2([0-4][0-9]|5[0-5]))\s?\,\s?(1[0-9]{2}|[0-9]|[1-9][0-9]|2([0-4][0-9]|5[0-5]))\s?\))?$/,
      notice: 'Provide valid rgb color',
    },
    {
      name: 'rgba_color_value',
      regex: /^(rgba\(\s?(1[0-9]{2}|[0-9]|[1-9][0-9]|2([0-4][0-9]|5[0-5]))\s?\,\s?(1[0-9]{2}|[0-9]|[1-9][0-9]|2([0-4][0-9]|5[0-5]))\s?\,\s?(1[0-9]{2}|[0-9]|[1-9][0-9]|2([0-4][0-9]|5[0-5]))\s?\,\s?([01]|0\.([1-9]|[0-9][1-9]))\s?\))?$/,
      notice: 'Provide valid rgba color',
    },
    {
      name: 'hsl_color_value',
      regex: /^(hsl\(\s?([1-9]?[0-9]|[12][0-9]{2}|3([0-5][0-9]|60))\s?\,\s?([1-9]?[0-9]|100)%\s?\,\s?([1-9]?[0-9]|100)%\s?\))?$/,
      notice: 'Provide valid hsl color',
    },
    {
      name: 'hsla_color_value',
      regex: /^(hsla\(\s?([1-9]?[0-9]|[12][0-9]{2}|3([0-5][0-9]|60))\s?\,\s?([1-9]?[0-9]|100)%\s?\,\s?([1-9]?[0-9]|100)%\,\s?(1|0|0\.[0-9]+?)\s?\))?$/,
      notice: 'Provide valid hsla color',
    },
  ];

  constructor(validationCfgs: ValidationConfigs) {
    this.mergeValidationCfgs(validationCfgs);
  }

  get length() {
    return this._validationCfgs.length;
  }

  get all() {
    return this._validationCfgs;
  }

  mergeValidationCfgs(validationCfgs: ValidationConfigs) {
    if (Array.isArray(validationCfgs) && validationCfgs.length) {
      for (let cfg of validationCfgs) {
        this.mergeValidationCfg(cfg);
      }
    }
    this.checkConfigForConsistency();
    this.removeDuplicatedCfgsByNames();
  }

  protected mergeValidationCfg(cfg: ValidationConfig) {
    let pushed = false;
    for (let [index, pluginCfg] of Object.entries(this._validationCfgs)) {
      if (pluginCfg.name === cfg.name) {
        this._validationCfgs.splice(index, 1, $.extend(true, {}, pluginCfg, cfg));
        pushed = true;
      }
    }
    if (!pushed) {
      this._validationCfgs.push(cfg);
    }
  }

  getCfgByName(name: string) {
    for (let cfg of this._validationCfgs) {
      if (cfg.name === name) {
        return cfg;
      }
    }
  }

  hasCfgByName(name: string) {
    return !!this.getCfgByName(name);
  }

  checkConfigForConsistency() {
    const fields = ['regex', 'notice'];
    for (const [index, cfg] of Object.entries(this._validationCfgs)) {
      let invalidCfg = false;
      let absentFields = [];
      for (let i = 0; i < fields.length; i++) {
        if (!Object.keys(cfg).includes(fields[i])) {
          invalidCfg = true;
          absentFields.push(fields[i]);
        }
      }
      if (invalidCfg) {
        this._validationCfgs.splice(index, 1);
        console.warn('This validation cfg is not valid', cfg, 'It has not got such fields as: ' + absentFields.join(', '));
      }
    }
  }

  removeDuplicatedCfgsByNames() {
    const checked = [];

    for (const [index, cfg] of Object.entries(this._validationCfgs)) {
      if (checked.includes(cfg.name)) {
        this._validationCfgs.splice(index, 1);
      } else {
        checked.push(cfg.name);
      }
    }
  }
}