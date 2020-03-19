'use strict';
import {ValidationConfigs} from './interfaces/config';
import {Settings} from "./classes/settings";
import {Input} from "./classes/input";
import {EventsEmitter} from "./classes/events-emitter";

export const pluginName = 'deRegexValidation';

class DeRegexValidation {
  public form: any;
  public settings: Settings;
  public validationCfgs: ValidationConfigs;
  public eventsEmitter: EventsEmitter;

  constructor(form, settings) {
    this.form = $(form);
    this.settings = new Settings(settings);
    this.eventsEmitter = new EventsEmitter(this.settings.on, this);
    this.init();
    this.eventsEmitter.triggerInit(this.form);
  }

  protected init() {
    this.setEventHandlers();
  }

  protected setEventHandlers() {
    this.onInputEvents();
    this.onFormSubmit();
  }

  protected onInputEvents() {
    this.settings.events.forEach((event, i, arr) => {
      const eventWithNamespace = event + '.' + this.settings.eventNamespace;
      this.form.off(eventWithNamespace);
      this.form.on(eventWithNamespace, `${this.settings.selectors.input},${this.settings.selectors.textarea}`, (e) => {
        const $input = $(e.currentTarget);
        this.eventsEmitter.triggerBeforeFieldValidation(this.form, $input);
        const input = Input.init($input, this.settings);
        input.validate();
        this.markFormValid();
        this.disableButtonOnFormInvalid();
        this.eventsEmitter.triggerAfterFieldValidation(this.form, $input);
      });
    });
  }

  protected onFormSubmit() {
    this.form.off('submit.' + this.settings.eventNamespace);
    this.form.on('submit.' + this.settings.eventNamespace, (e) => {
        this.validateForm();
        this.disableButtonOnFormInvalid();
        if (this.allInputsValid()) {
          this.eventsEmitter.triggerValidFormSubmit(this.form);
        } else {
          if (this.settings.preventSubmitOnInvalid) {
            e.preventDefault();
          }
          this.eventsEmitter.triggerInvalidFormSubmit(this.form);
        }
      }
    );
  }

  protected markFormValid() {
    if (this.allInputsValid()) {
      this.form.addClass(this.settings.cssClasses.formValid).removeClass(this.settings.cssClasses.formInvalid);
    } else {
      this.form.addClass(this.settings.cssClasses.formInvalid).removeClass(this.settings.cssClasses.formValid);
    }
  }

  protected allInputsValid() {
    return !this.form.find(this.settings.selectors.input + ',' + this.settings.selectors.textarea)
      .parents(this.settings.selectors.inputParent).hasClass(this.settings.cssClasses.inputInvalid);
  }

  protected disableButtonOnFormInvalid() {
    if (this.settings.disableFormOnInvalid) {
      const submitBtn = this.form.find('input[type=submit],button[type=submit],button:not([type])');
      if (this.allInputsValid()) {
        submitBtn.removeAttr('disabled').prop('disabled', false);
      } else {
        submitBtn.attr('disabled', true).prop('disabled', true);
      }
    }
  }

  validateForm(scrollToInvalid: boolean = false) {
    const inputs = this.form.find(this.settings.selectors.input + ',' + this.settings.selectors.textarea);
    inputs.each((i, elem, arr) => {
      const $input = $(elem);
      const input = Input.init($input, this.settings);
      input.validate();
    });
    this.markFormValid();
    if (scrollToInvalid) {
      this.scrollToInvalid();
    }
  }

  protected scrollToInvalid() {
    const invalidInputs = this.form.find('.' + this.settings.cssClasses.inputinvalid);
    let topInvalidInput;
    invalidInputs.each((i, invalidInput) => {
      invalidInput = $(invalidInput);
      if (!topInvalidInput) {
        topInvalidInput = invalidInput;
      } else {
        if (topInvalidInput.offset().top > invalidInput.offset().top) {
          topInvalidInput = invalidInput;
        }
      }
    });

    if (topInvalidInput && topInvalidInput.length) {
      $([document.documentElement, document.body]).animate({
        scrollTop: topInvalidInput.offset().top - 50
      }, 1000);
    }
  }

  destroy() {
    this.eventsEmitter.triggerBeforeDestroy(this.form);
    this.offAllInputEvents();
    this.removeAllInputInstances();
    this.removeAllFormCSSClasses();
  }

  protected offAllInputEvents() {
    this.settings.events.forEach((event, i, arr) => {
      const eventWithNamespace = event + '.' + this.settings.eventNamespace;
      this.form.off(eventWithNamespace, '**');
    });

    if (this.settings.preventSubmitOnInvalid) {
      this.form.off('submit.' + this.settings.eventNamespace);
    }
  }

  protected removeAllInputInstances() {
    this.form.find(`${this.settings.selectors.input},${this.settings.selectors.textarea}`).each((i, input) => {
      input = $(input);
      Input.destroy(input, this.settings);
    });
  }

  protected removeAllFormCSSClasses() {
    this.form.removeClass(Object.values(this.settings.cssClasses).join(' '));
  }
}

$.fn[pluginName] = function (settings, ...args) {
  return this.each(function () {
    const instance = $.data(this,  pluginName);

    if (!instance) {
      if (typeof settings === 'string') {
        //we can't invoke plugin method without initialized plugin instance
        return
      }

      $.data(this, pluginName, new DeRegexValidation(this, settings));

    } else {
      switch (settings) {
        case 'validateForm':
          instance.validateForm(!!args[0]);
          break;
        case 'destroy':
          instance.destroy();
          break;
      }
    }
  });
};
