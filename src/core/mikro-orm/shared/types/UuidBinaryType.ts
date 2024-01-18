import { toBinaryUUID, fromBinaryUUID } from 'binary-uuid';
import { EntityProperty, Platform, Type } from '@mikro-orm/core';

export class UuidBinaryType extends Type {
  convertToDatabaseValue(value: string, platform: Platform): any {
    if (!value) {
      return null;
    }

    if(Buffer.isBuffer(value))
      return value;

    const binaryUuid = toBinaryUUID(value);
    return binaryUuid;
  }

  convertToJSValue(value: any, platform: Platform): string {
    if (!value) {
      return '';
    }

    const strUuid = fromBinaryUUID(Buffer.from(value));
    // Perform additional type validation check if needed...
    return strUuid;
  }

  getColumnType(prop: EntityProperty, platform: Platform): string {
    return 'binary(16)';
  }
}
