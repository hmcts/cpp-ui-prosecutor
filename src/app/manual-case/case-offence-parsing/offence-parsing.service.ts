import { Injectable } from '@angular/core';
import { Element, OffenceWordingMessage, ElementType } from '../../core/model/manual-case';

@Injectable({
  providedIn: 'root'
})
export class OffenceParsingService {
  mp: MessageProcessor;
  sections: Element[];

  parse(message: string): OffenceWordingMessage {
    this.mp = new MessageProcessor();

    this.mp
      .preparse(message)
      .breakToSections()
      .matchOnDateEntryPoints()
      .matchDateEntryPoints()
      .matchTextEntryPoints()
      .matchOptionsEntryPoints()
      .finalMatchLabels()
      .buildFormObject();

    const formObject = JSON.parse(JSON.stringify(this.mp.tempObject));
    delete this.mp;

    return formObject;
  }
}

export class MessageProcessor {
  sections: Array<string>;
  message = '';
  formObject = {};
  tempObject: OffenceWordingMessage = {
    sections: [],
    title: ''
  };

  // Preparsing correction
  changeFromTags = [']_]_', ']', '..,)', ',,)', ')_', '..}', '_(', '_{'];
  changeToTags = [']_', ']_', '..)', '..)', ']_', '..)', '_[', '_['];
  regExpFrom = [
    /]_]_/g,
    /(])(?=[^_])/g,
    /\.\.\,\)/g,
    /\,\,\)/g,
    /(\)\_(?=[^([{}]))|(\)_)$/g, // )_ the most tricky one
    /\.\.\}/g,
    /\_\(/g,
    /_{/g
  ];

  constructor() {
    this.tempObject['sections'] = [];
  }

  preparse(message: string): MessageProcessor {
    this.changeFromTags.forEach((replace, i) => {
      message = message.replace(this.regExpFrom[i], this.changeToTags[i]);
    });
    this.message = message;

    return this;
  }

  breakToSections(): MessageProcessor {
    this.sections = this.message.split('<br /><br />');

    return this;
  }

  matchTextEntryPoints(): MessageProcessor {
    function capitalize(s: string) {
      s = s.toLowerCase();
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    function replacer(toReplace) {
      toReplace = toReplace
        .replace('**(..', '')
        .replace('..)', '')
        .replace(/\s+/g, ' ');

      return `{TEXT|${capitalize(toReplace)}}`;
    }

    this.sections = this.sections.map(section => section.replace(/(\*\*\(\.\..*?\.\.\))/g, replacer));

    return this;
  }

  matchDateEntryPoints(): MessageProcessor {
    this.sections = this.sections.map(section => section.replace(/(\*\*\(\.\..*DATE?\.\.\))/g, '{DATE|Specify date}'));

    return this;
  }

  matchOnDateEntryPoints(): MessageProcessor {
    this.sections = this.sections.map(section =>
      section.replace(/(On.?\*\*\(\.\..*DATE?\.\.\))/gim, '{DROPDOWN|Offence date type} {DATE|Specify date}')
    );

    return this;
  }

  matchOptionsEntryPoints(): MessageProcessor {
    function stripOptionsTags(str: string) {
      return str.replace(/(\_\[)|(\]\_)/g, '');
    }

    function capitalize(s: string) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    function replacer(toReplace: string) {
      toReplace = stripOptionsTags(toReplace);
      return `{RADIO|${capitalize(toReplace)}/}`;
    }

    this.sections = this.sections.map(section => {
      if (section.match(/(\_\[(.*?)\]\_)/g)) {
        section = `{LIST|${section}`; // /}
      }

      // Removing (A), (B) ...
      section = section.replace(/(\(([A-Z])\))/g, '');
      // Removing <br />
      // section = section.replace(/<br \/>/g, '');
      // Building radio tags
      section = section.replace(/(\_\[(.*?)\]\_)/g, replacer);

      return section;
    });

    return this;
  }

  finalMatchLabels(): MessageProcessor {
    this.formObject['sections'] = [];

    // Main sections
    this.sections.forEach(section => {
      if (this.sectionHasList(section)) {
        this.formObject['sections'].push(section);
      } else {
        this.formObject['sections'].push(section.split(/({.*?})/gim).filter(x => x.trim() !== ''));
      }
    });

    return this;
  }

  // Building Form Object checking 2 levels nesting currently
  buildFormObject() {
    this.formObject['title'] = 'Offence title';

    // 1st level sections
    this.formObject['sections'].map(s => {
      // Section has more elements
      if (Array.isArray(s)) {
        s.forEach(el => {
          this.tempObject['sections'].push(this.createElement(el));
        });

        // Section is a list or plain text
      } else {
        if (!Array.isArray(s) && this.isList(s)) {
          this.tempObject['sections'].push(this.createElement(s));
        } else {
          s = this.preCreateLabel(s);
          this.tempObject['sections'].push(this.createElement(s));
        }
      }
    });
  }

  private sectionHasList(section: Array<string> | string): boolean {
    if (Array.isArray(section)) {
      section.forEach(s => {
        return s.includes('{LIST');
      });
    } else {
      return section.includes('{LIST');
    }
  }

  private isList(s: string): boolean {
    return s.includes('{LIST');
  }

  private stripListTag(el: string): string {
    return el.replace('{LIST|', '');
  }

  private lookUpEntryElements(el: string): Array<string> | null {
    return el.match(/({TEXT.*?})|({DATE.*?})|({DROPDOWN.*?})/g);
  }

  private lookUpRadioElements(el: string): Array<string> | null {
    return el.match(/({RADIO.*?\/})/g);
  }

  private removeCommas(el: string): string {
    return el.replace(/(^ ,)|(^,)|(,$)|( ,$)|( , $)/g, '');
  }

  private createElement(el: string): Element {
    const list = [];
    let label;
    let type;
    let children = [];
    let tempList;
    let tempChildren;

    if (this.isList(el)) {
      tempList = this.stripListTag(el);
      tempList = this.lookUpRadioElements(tempList);

      let i = 0;
      tempList.map(radio => {
        tempChildren = this.lookUpEntryElements(radio);

        if (tempChildren) {
          tempChildren.map(elm => {
            children.push(this.createElement(elm));

            list.push({
              type: ElementType.Radio,
              label: this.removeCommas(
                this.stripTagsRadio(radio)
                  .replace('/}', '')
                  .split('|')[1]
              ),
              value: i++,
              children
            });
          });

          children = [];
        } else {
          list.push({
            type: ElementType.Radio,
            label: this.removeCommas(radio.replace('/}', '').split('|')[1]),
            value: i++
          });
        }
      });

      return {
        type: ElementType.List,
        ...(list.length > 0 && { list })
      };
    }

    if (this.isPlainText(el)) {
      el = this.preCreateLabel(el);
    } else {
      el = this.stripTags(el);
    }

    type = el.split('|')[0];
    label = this.removeCommas(el.split('|')[1]);

    return {
      label,
      type
    };
  }

  private preCreateLabel(el: string): string {
    return `LABEL|${el}`;
  }

  private isPlainText(el: string): boolean {
    return !el.includes('|');
  }

  private stripTags(el: string): string {
    return el.replace(/({)|(})/g, '');
  }

  private stripTagsRadio(el: string): string {
    return el.replace(/({TEXT.*?})|({DATE.*?})|({DROPDOWN.*?})/g, '');
  }
}
