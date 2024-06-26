import RestfulModel from './restful-model';
import NeuralSentimentAnalysis from './neural-sentiment-analysis';
import NeuralSignatureExtraction from './neural-signature-extraction';
import NeuralOcr from './neural-ocr';
import NeuralCategorizer from './neural-categorizer';
import NeuralCleanConversation from './neural-clean-conversation';
import Model from './model';
import Attributes, { Attribute } from './attributes';

export type NeuralMessageOptionsProperties = {
  ignoreLinks?: boolean;
  ignoreImages?: boolean;
  ignoreTables?: boolean;
  removeConclusionPhrases?: boolean;
  imagesAsMarkdown?: boolean;
  parseContacts?: boolean;
};

export class NeuralMessageOptions extends Model
  implements NeuralMessageOptionsProperties {
  ignoreLinks?: boolean;
  ignoreImages?: boolean;
  ignoreTables?: boolean;
  removeConclusionPhrases?: boolean;
  imagesAsMarkdown?: boolean;
  parseContacts?: boolean;
  static attributes: Record<string, Attribute> = {
    ignoreLinks: Attributes.Boolean({
      modelKey: 'ignoreLinks',
      jsonKey: 'ignore_links',
    }),
    ignoreImages: Attributes.Boolean({
      modelKey: 'ignoreImages',
      jsonKey: 'ignore_images',
    }),
    ignoreTables: Attributes.Boolean({
      modelKey: 'ignoreTables',
      jsonKey: 'ignore_tables',
    }),
    removeConclusionPhrases: Attributes.Boolean({
      modelKey: 'removeConclusionPhrases',
      jsonKey: 'remove_conclusion_phrases',
    }),
    imagesAsMarkdown: Attributes.Boolean({
      modelKey: 'imagesAsMarkdown',
      jsonKey: 'images_as_markdown',
    }),
    parseContacts: Attributes.Boolean({
      modelKey: 'parseContacts',
      jsonKey: 'parse_contacts',
    }),
  };

  constructor(props?: NeuralMessageOptionsProperties) {
    super();
    this.initAttributes(props);
  }

  toJSON(writeParseContact?: boolean): Record<string, boolean> {
    const body = super.toJSON() as Record<string, boolean>;
    if (writeParseContact !== true) {
      delete body['parse_contacts'];
    }
    return body;
  }
}

export default class Neural extends RestfulModel {
  sentimentAnalysisMessage(
    messageIds: string[]
  ): Promise<NeuralSentimentAnalysis[]> {
    const body = { message_id: messageIds };
    const path = 'sentiment';

    return this.request(path, body).then((jsonArray: []) => {
      return jsonArray.map(json => {
        return new NeuralSentimentAnalysis(this.connection).fromJSON(json);
      });
    });
  }

  sentimentAnalysisText(text: string): Promise<NeuralSentimentAnalysis> {
    const body = { text: text };
    const path = 'sentiment';

    return this.request(path, body).then(json => {
      return new NeuralSentimentAnalysis(this.connection).fromJSON(json);
    });
  }

  extractSignature(
    messageIds: string[],
    options?: NeuralMessageOptionsProperties
  ): Promise<NeuralSignatureExtraction[]> {
    let body: Record<string, unknown> = { message_id: messageIds };
    const path = 'signature';

    if (options) {
      body = {
        ...body,
        ...new NeuralMessageOptions(options).toJSON(true),
      };
    }

    return this.request(path, body).then((jsonArray: []) => {
      return jsonArray.map(json => {
        return new NeuralSignatureExtraction(this.connection).fromJSON(json);
      });
    });
  }

  ocrRequest(fileId: string, pages?: number[]): Promise<NeuralOcr> {
    const body: Record<string, string | number[]> = { file_id: fileId };
    const path = 'ocr';

    if (pages) {
      body['pages'] = pages;
    }

    return this.request(path, body).then(json => {
      return new NeuralOcr(this.connection).fromJSON(json);
    });
  }

  categorize(messageIds: string[]): Promise<NeuralCategorizer[]> {
    const body = { message_id: messageIds };
    const path = 'categorize';

    return this.request(path, body).then((jsonArray: []) => {
      return jsonArray.map(json => {
        return new NeuralCategorizer(this.connection).fromJSON(json);
      });
    });
  }

  cleanConversation(
    messageIds: string[],
    options?: NeuralMessageOptionsProperties
  ): Promise<NeuralCleanConversation[]> {
    let body: Record<string, unknown> = { message_id: messageIds };
    const path = 'conversation';

    if (options) {
      body = {
        ...body,
        ...options,
      };
    }

    return this.request(path, body).then((jsonArray: []) => {
      return jsonArray.map(json => {
        return new NeuralCleanConversation(this.connection).fromJSON(json);
      });
    });
  }

  private request(path: string, body: object): Promise<any> {
    return this.connection.request({
      method: 'PUT',
      path: `/neural/${path}`,
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
