const $ = window['jQuery'];

export class EventsEmitter {
  protected events: EmitEvents = {};
  protected plugin: Plugin;

  constructor(events: EmitEvents = {}, plugin: any) {
    this.events = events;
    this.plugin = plugin;
  }

  triggerInit(form) {
    this.emitEvent('init', form);
  }

  triggerBeforeDestroy(form) {
    this.emitEvent('beforeDestroy', form);
  }

  triggerBeforeFieldValidation(form, field) {
    this.emitEvent('beforeFieldValidation', form, field);
  }

  triggerAfterFieldValidation(form, field) {
    this.emitEvent('afterFieldValidation', form, field);
  }

  triggerValidFormSubmit(form) {
    this.emitEvent('validFormSubmit', form);
  }

  triggerInvalidFormSubmit(form) {
    this.emitEvent('invalidFormSubmit', form);
  }

  protected emitEvent(event, ...args) {
    if (this.events.hasOwnProperty(event) && typeof this.events[event] === 'function') {
      this.events[event].apply(this.plugin, args);
    }
  }
}