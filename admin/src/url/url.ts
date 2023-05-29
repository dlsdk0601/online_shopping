import { UrlObject } from "url";

export class PageUrl {
  readonly pathname: string;

  constructor(pathname: string) {
    this.pathname = pathname;
  }

  // TODO :: query 파라미터로 받기
  url(): UrlObject {
    return { pathname: this.pathname };
  }
}
