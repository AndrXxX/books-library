export abstract class CommentsRepositoryInterface {
  abstract getComments(limit: number, params: { [propertyName: string]: any }): Promise<any[]>
  abstract create(params: any): Promise<any>;
}
