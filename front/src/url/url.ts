import { UrlObject } from "url";
import { ParsedUrlQueryInput } from "querystring";

export class PageUrl {
  readonly pathname: string;

  constructor(pathname: string) {
    this.pathname = pathname;
  }

  url(query?: ParsedUrlQueryInput): UrlObject {
    return { pathname: this.pathname, query };
  }
}
