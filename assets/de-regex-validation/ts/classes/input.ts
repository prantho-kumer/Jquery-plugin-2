import {Notices} from "../interfaces/config";
import {Settings} from "./settings";
import {InputValidationCfgs} from "./input-validation-cfgs";

let $ = window['jQuery'];

export class Input {
  protected static _objDataKey = 'de-regex-validation-input-obj';
  protected _input;
  protected _settings: Settings;
  protected _validationCfgs: InputValidationCfgs;
  protected _inputParent: any;
  protected _notices: Notices = [];
  protected _noticesToDelete: number[] = [];

  protected constructor(input, settings: Settings) {
    this._input = input;
    this._settings = settings;
    this._validationCfgs = new InputValidationCfgs(this._settings.validationCfgs.all);
    this.init();
  }

  static init(input, settings: Settings) {
    input = $(input);

    let obj = input.data(Input._objDataKey);
    if (obj instanceof Input) {
      return obj;
    } else {
      obj = new Input(input, settings);
      input.data(Input._objDataKey, obj);
      return obj;
    }
  }

  static destroy(inputEl, settings: Settings) {
    const $input = $(inputEl);

    const input = $input.data(Input._objDataKey);
    if (input instanceof Input) {
      $input.removeData(Input._objDataKey);
      $input.removeData(settings.dataAttrs.validationCfgs);

      const inputParent = $input.parents(settings.selectors.inputParent).first();
      inputParent.find(`[class*="${settings.cssClasses.noticeIndex}"]`).remove();
      inputParent.removeClass(Object.values(settings.cssClasses).join(' '));
    }
  }

  protected init() {
    this.setValidationCfgs();
    this.setInputParent();
  }

  validate() {
    if (!this._validationCfgs.length) {
      return;
    }
    this.emptyNotices();
    this.checkField();
    this.deleteOldNotices();
    this.addNewNotices();
    this.toggleValidClass();
  }

  protected emptyNotices() {
    this._notices = [];
    this._noticesToDelete = [];
  }

  protected setValidationCfgs() {
    let validationCfgs = this._input.data(this._settings.dataAttrs.validationCfgs);

    if (typeof validationCfgs === 'string') {
      if (validationCfgs) {
        try {
          validationCfgs = JSON.parse(validationCfgs);
        } catch (e) {
          validationCfgs = validationCfgs.split(',');
        }
      } else {
        return;
      }
    }

    validationCfgs = this._validationCfgs.processValidationCfgs(validationCfgs);

    if (this._settings.validateRequiredFields) {
      validationCfgs.push(this._settings.validationCfgs.getCfgByName('required'));
    }

    this._validationCfgs.setProcessedCfgs(validationCfgs);
  }

  protected setInputParent() {
    this._inputParent = this._input.parents(this._settings.selectors.inputParent).first();
  }

  protected checkField() {
    let index = 1;

    if (this._input.is(':checkbox') && this._validationCfgs.hasCfgByName('required')) {
      let requiredValidationCfg = this._validationCfgs.getCfgByName('required');
      if (this._input.is(':checked')) {
        this._noticesToDelete.push(index);
      } else {
        this._notices.push({
          notice: requiredValidationCfg.notice,
          index: index,
        })
      }
    } else {
      this._validationCfgs.all.forEach((item, i, arr) => {
        index = i + 1;
        let regExp;

        if (typeof item.regex === 'object') {
          regExp = item.regex;
        } else {
          const flags = item.regex.split('/').pop();
          const regExpStr = item.regex.substring(item.regex.indexOf('/') + 1, item.regex.lastIndexOf('/'));
          regExp = new RegExp(regExpStr, flags);
        }

        if (!regExp.test(this._input.val())) {
          this._notices.push({
            notice: item.notice,
            index: index
          });
        } else {
          this._noticesToDelete.push(index);
        }
      });
    }
  }

  protected deleteOldNotices() {
    this._noticesToDelete.forEach((noticeIndex, i, arr) => {
      this._inputParent.find('.' + this._settings.cssClasses.noticeIndex + noticeIndex).remove();
    });
  }

  protected addNewNotices() {
    this._notices.forEach((notice, i, arr) => {
      if (!this._inputParent.find('.' + this._settings.cssClasses.noticeIndex + notice.index).length) {
        const noticeElem = $(`<${this._settings.noticeTagName}>`).addClass(this._settings.cssClasses.noticeIndex + notice.index).text(notice.notice);
        this._inputParent.append(noticeElem);
      }
    });
  }

  protected isValid() {
    return !this._notices.length;
  }

  protected toggleValidClass() {
    if (this.isValid()) {
      this._inputParent.addClass(this._settings.cssClasses.inputValid).removeClass(this._settings.cssClasses.inputInvalid);
    } else {
      this._inputParent.removeClass(this._settings.cssClasses.inputValid).addClass(this._settings.cssClasses.inputInvalid);
    }
  }
}