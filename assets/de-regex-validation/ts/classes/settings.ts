import {Config} from "../interfaces/config";
import {ValidationCfgs} from "./validation-cfgs";

let $ = window['jQuery'];

export class Settings {
  protected _defaults: Config = {
    eventNamespace: 'deRegexValidation',
    events: ['input', 'change', 'blur'],
    dataAttrs: {
      validationCfgs: 'validation-cfg',
    },
    cssClasses: {
      formValid: 'form-valid',
      formInvalid: 'form-invalid',
      inputValid: 'input-valid',
      inputInvalid: 'input-invalid',
      noticeIndex: 'validation-notice-',
    },
    selectors: {
      inputParent: '.form-row',
    },
    noticeTagName: 'p',
    preventSubmitOnInvalid: false,
    disableFormOnInvalid: false,
    validateRequiredFields: false,
    userValidationCfgs: [],
    on: {}
  };
  protected _settings: Config;
  protected _validationCfgs: ValidationCfgs;

  get eventNamespace() {
    return this._settings.eventNamespace;
  }

  get events() {
    return this._settings.events;
  }

  get dataAttrs() {
    return this._settings.dataAttrs;
  }

  get cssClasses() {
    return this._settings.cssClasses;
  }

  get selectors() {
    return this._settings.selectors;
  }

  get noticeTagName() {
    return this._settings.noticeTagName;
  }

  get preventSubmitOnInvalid() {
    return this._settings.preventSubmitOnInvalid;
  }

  get disableFormOnInvalid() {
    return this._settings.disableFormOnInvalid;
  }

  get validateRequiredFields() {
    return this._settings.validateRequiredFields;
  }

  get userValidationCfgs() {
    return this._settings.userValidationCfgs;
  }

  get validationCfgs(): ValidationCfgs {
    return this._validationCfgs;
  }

  get on(): EmitEvents {
    return this._settings.on;
  }

  constructor(settings) {
    this.init(settings);
  }

  protected init(settings) {
    this.initDynamicSettings();
    this.initSettings(settings);
    this.initValidationCfgs();
  }

  protected initDynamicSettings() {
    this._defaults.selectors = $.extend(this._defaults.selectors, {
      input: 'input[data-' + this._defaults.dataAttrs.validationCfgs + ']',
      textarea: 'textarea[data-' + this._defaults.dataAttrs.validationCfgs + ']',
    });
  }

  protected initSettings(settings) {
    this._settings = $.extend(true, {}, this._defaults, settings);
  }

  protected initValidationCfgs() {
    this._validationCfgs = new ValidationCfgs(this._settings.userValidationCfgs);
  }
}