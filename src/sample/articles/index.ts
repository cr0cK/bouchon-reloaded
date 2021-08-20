import * as path from 'path'
import { createBouchon } from '../../libs/bouchon'
import { parseData } from '../../libs/bouchon/helpers'
import { getDefaultResponseStatusCode } from '../../libs/router/helpers'
import {
  ArticlesActionEnum,
  ArticlesActionsRecord,
  ArticlesActionUnion,
  StoreArticles
} from './types'

const {
  createAction,
  registerReducer,
  createSelector,
  createRoute,
  createEndPoint
} = createBouchon<
  StoreArticles,
  ArticlesActionEnum,
  ArticlesActionUnion,
  ArticlesActionsRecord
>(
  parseData(
    path.join(__dirname, 'articles-data.json'),
    'article-data-json-schema.json'
  )
)

const getArticle = createAction(ArticlesActionEnum.ArticleGet)
const addArticle = createAction(ArticlesActionEnum.ArticleAdd)
const removeArticle = createAction(ArticlesActionEnum.ArticleRemove)

registerReducer(ArticlesActionEnum.ArticleGet, (state, action) => {
  return state
})

registerReducer(ArticlesActionEnum.ArticleAdd, (state, action) => {
  state.articles.push(action.bodyParameters)
  return state
})

registerReducer(ArticlesActionEnum.ArticleRemove, (state, action) => {
  return state
})

const selectAllArticles = createSelector((state, action) => {
  return state.articles
})

const selectOneArticle = createSelector((state, action) => {
  switch (action.name) {
    case ArticlesActionEnum.ArticleGet:
    case ArticlesActionEnum.ArticleRemove:
      return selectAllArticles(action).find(
        article => article.id === action.parameters.articleId
      )

    default:
      return
  }
})

const endPoint = createEndPoint('/api', [
  createRoute({
    method: 'GET',
    pathname: '/profile/:profileId/articles',
    action: getArticle,
    selector: selectAllArticles
  }),

  createRoute({
    method: 'GET',
    pathname: '/profile/:profileId/articles/:articleId',
    action: getArticle,
    selector: selectOneArticle,
    handler: selectedData => (req, res) => {
      res
        .status(getDefaultResponseStatusCode(selectedData)(req, res))
        .send(`selectedData: ${JSON.stringify(selectedData)}`)
    }
  }),

  createRoute({
    method: 'POST',
    pathname: '/profile/:profileId/articles',
    action: addArticle,
    selector: selectAllArticles
  })
])

export { endPoint }
