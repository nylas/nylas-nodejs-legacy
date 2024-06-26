import Message, { MessageProperties } from './message';
import Attributes, { Attribute } from './attributes';
import File from './file';
import NylasConnection from '../nylas-connection';

const IMAGE_REGEX = /[(']cid:(.)*[)']/g;

export type NeuralCleanConversationProperties = MessageProperties & {
  conversation: string;
  modelVersion: string;
};

export default class NeuralCleanConversation extends Message
  implements NeuralCleanConversationProperties {
  conversation = '';
  modelVersion = '';
  static collectionName = 'conversation';
  static attributes: Record<string, Attribute> = {
    ...Message.attributes,
    conversation: Attributes.String({
      modelKey: 'conversation',
    }),
    modelVersion: Attributes.String({
      modelKey: 'modelVersion',
      jsonKey: 'model_version',
    }),
  };

  constructor(
    connection: NylasConnection,
    props?: NeuralCleanConversationProperties
  ) {
    super(connection, props);
    this.initAttributes(props);
  }

  extractImages(): Promise<File[]> {
    const f: File[] = [];
    if (this.conversation) {
      const fileIds = this.conversation.match(IMAGE_REGEX);
      if (fileIds) {
        // After applying the regex, if there are IDs found they would be
        // in the form of => 'cid:xxxx' (including apostrophes), so we discard
        // everything before and after the file ID (denoted as xxxx above)
        fileIds.forEach(async id => {
          const parsedId = id.substring(5, id.length - 1);
          const file = await this.connection.files.find(parsedId);
          f.push(file);
        });
      }
    }
    return Promise.resolve(f);
  }
}
