export const ATV_KEY_EVENT = 'atv-key';
export const ATV_TEXT_EVENT = 'atv-text';
export const ATV_ACTIVITY_EVENT = 'atv-activity';

export interface KeyEventDetail {
  key: string;
}

export interface TextEventDetail {
  text: string;
}

export interface ActivityEventDetail {
  activity: string;
}

function fire(el: HTMLElement, type: string, detail: unknown): void {
  el.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}

export const fireKey = (el: HTMLElement, key: string): void =>
  fire(el, ATV_KEY_EVENT, { key } satisfies KeyEventDetail);

export const fireText = (el: HTMLElement, text: string): void =>
  fire(el, ATV_TEXT_EVENT, { text } satisfies TextEventDetail);

export const fireActivity = (el: HTMLElement, activity: string): void =>
  fire(el, ATV_ACTIVITY_EVENT, { activity } satisfies ActivityEventDetail);
