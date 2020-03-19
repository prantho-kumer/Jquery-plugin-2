export interface Config {
  eventNamespace: string;
  events: string[];
  dataAttrs: DataAttributes;
  cssClasses: CSSClasses;
  selectors: CSSSelectors;
  noticeTagName: string;
  preventSubmitOnInvalid: boolean;
  disableFormOnInvalid: boolean;
  validateRequiredFields: boolean;
  userValidationCfgs: ValidationConfigs;
  on: EmitEvents;
}

export interface DataAttributes {
  validationCfgs: string;
}

export interface CSSClasses {
  formValid: string;
  formInvalid: string;
  inputValid: string;
  inputInvalid: string;
  noticeIndex: string;
}

export interface CSSSelectors {
  inputParent: string;
  input?: string;
  textarea?: string;
}

export interface ValidationConfigs extends Array<ValidationConfig> {
}

export interface ValidationConfig {
  name: string;
  notice: string;
  regex: string | RegExp;
}

export interface Notices extends Array<Notice> {
}

export interface Notice {
  notice: string;
  index: number;
}

export interface EmitEvents {
  init?: any;
  beforeFieldValidation?: any;
  afterFieldValidation?: any;
  validFormSubmit?: any;
  invalidFormSubmit?: any;
  beforeDestroy?: any;
}