import { transformKoreanPostPosition } from "./korean-postposition";

export class ValueFiled<T> {
  name: string;
  private _value: T | null = null;

  constructor(name: string) {
    this.name = name;
  }

  get value() {
    return this._value;
  }

  set value(value: T | null) {
    this.setValue(value);
  }

  private setValue(value: T | null) {
    this._value = value;
  }

  protected createPlaceholder() {
    return `${this.name}(을|를) 입력해주세요.`;
  }

  get placeholder(): string {
    return transformKoreanPostPosition(this.createPlaceholder());
  }
}
