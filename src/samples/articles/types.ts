import { Action } from '../..'

export type StoreArticles = {
  articles: Array<{ id: number; name: string }>
}

export enum ArticlesActionEnum {
  GetArticle = 'GetArticle',
  AddArticle = 'AddArticle',
  RemoveArticle = 'RemoveArticle'
}

export interface GetArticleAction extends Action {
  name: ArticlesActionEnum.GetArticle
  parameters: {
    profileId: number
    articleId: number
  }
}

export interface AddArticleAction extends Action {
  name: ArticlesActionEnum.AddArticle
  parameters: {
    profileId: number
  }
  bodyParameters: {
    id: number
    name: string
    age: number
  }
}

export interface RemoveArticleAction extends Action {
  name: ArticlesActionEnum.RemoveArticle
  parameters: {
    profileId: number
    articleId: number
  }
}

export type ArticlesActionUnion =
  | GetArticleAction
  | AddArticleAction
  | RemoveArticleAction

export interface ArticlesActionsRecord
  extends Record<ArticlesActionEnum, ArticlesActionUnion> {
  [ArticlesActionEnum.GetArticle]: GetArticleAction
  [ArticlesActionEnum.AddArticle]: AddArticleAction
  [ArticlesActionEnum.RemoveArticle]: RemoveArticleAction
}
