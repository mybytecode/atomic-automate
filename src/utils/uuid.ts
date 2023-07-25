import shortuuid from 'short-uuid';

export function getTransactionalUuid(prefixText: string): string {
  const delimiter: string = "_";
  const randomId: string = shortuuid.generate();
  const now: Date = new Date();
  const month: number = now.getMonth() + 1;
  const day: number = now.getDate();
  const uuid: string = `${prefixText}${delimiter}${randomId}${delimiter}${month.toString().padStart(2, '0')}${delimiter}${day.toString().padStart(2, '0')}`;
  return uuid;
}

export function getUuid(): string {
  const delimiter: string = "_";
  const randomId: string = shortuuid.generate();
  const now: Date = new Date();
  const month: number = now.getMonth() + 1;
  const day: number = now.getDate();
  const uuid: string = `${randomId}${delimiter}${month.toString().padStart(2, '0')}${delimiter}${day.toString().padStart(2, '0')}`;
  return uuid;
}

export function getMerchantCodeFromId(id: string): string {
  const aggregateSplits: string[] = id.split("_");
  return aggregateSplits[0];
}

