import { rm, rm2 } from "../../lib/misc";
import { mkRuleClass } from "./template";

export const houhuayuan = () => {
  const seriesbox = document.querySelector(".seriesbox");
  let bookUrl: string;
  let bookname: string;
  let author = (document.querySelector("h3.author") as HTMLElement)?.innerText
    .replace(/♥|作者: /g, "")
    .trim();
  if (author === "") {
    author = "佚名";
  }
  const aList: Element[] = [];
  if (seriesbox) {
    const lis = seriesbox.querySelectorAll("ul.serieslist-ul > li");
    for (const li of Array.from(lis)) {
      if (li.className === "serieslist-li") {
        const a = li.querySelector("a");
        if (a) {
          aList.push(a);
        }
      } else if (li.className === "serieslist-li-current") {
        const a = document.createElement("a");
        a.innerText = (
          document.querySelector(".entry-title") as HTMLElement
        ).innerText.trim();
        a.href = document.location.href;
        aList.push(a);
      }
    }
    const aFirst = aList[0];
    bookname = (aFirst as HTMLAnchorElement).innerText
      .replace(/第.+章$|\s序$/, "")
      .trim();
    bookUrl = (aFirst as HTMLAnchorElement).href;
  } else {
    bookUrl = document.location.href;
    bookname = (
      document.querySelector(".entry-title") as HTMLElement
    ).innerText.trim();
    const a = document.createElement("a");
    a.innerText = bookname;
    a.href = bookUrl;
    aList.push(a);
  }
  return mkRuleClass({
    bookUrl,
    bookname,
    author,
    aList,
    getContent: (doc) => doc.querySelector("header + div.entry-content"),
    contentPatch: (dom) => {
      rm('div[id^="stage-"]', true, dom);
      rm('div[id^="zhaoz-"]', true, dom);
      rm("div.seriesbox", false, dom);
      rm("fieldset", false, dom);
      rm("div.wpulike", false, dom);
      rm(".simplefavorite-button", false, dom);
      rm2(dom, [" – 蔷薇后花园", " – 黑沼泽俱乐部"]);
      return dom;
    },
  });
};
