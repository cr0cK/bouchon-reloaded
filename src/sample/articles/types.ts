import { Action } from '../../libs/types'

export type StoreArticles = {
  articles: Array<{ id: number; name: string }>
}

export enum ArticlesActionEnum {
  ArticleGet = 'ArticleGet',
  ArticleAdd = 'ArticleAdd',
  ArticleRemove = 'ArticleRemove'
}

export interface GetArticleAction extends Action {
  name: ArticlesActionEnum.ArticleGet
  parameters: {
    profileId: number
    articleId: number
  }
}

export interface AddArticleAction extends Action {
  name: ArticlesActionEnum.ArticleAdd
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
  name: ArticlesActionEnum.ArticleRemove
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
  [ArticlesActionEnum.ArticleGet]: GetArticleAction
  [ArticlesActionEnum.ArticleAdd]: AddArticleAction
  [ArticlesActionEnum.ArticleRemove]: RemoveArticleAction
}
