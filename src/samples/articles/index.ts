import * as path from 'path'
import { createBouchon, getDefaultResponseStatusCode, parseData } from '../..'
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
>(parseData(path.join(__dirname, 'articles-data.json')))

export const getArticle = createAction(ArticlesActionEnum.GetArticle)
const addArticle = createAction(ArticlesActionEnum.AddArticle)
const removeArticle = createAction(ArticlesActionEnum.RemoveArticle)

registerReducer(ArticlesActionEnum.GetArticle, (state, action) => {
  return state
})

registerReducer(ArticlesActionEnum.AddArticle, (state, action) => {
  state.articles.push(action.bodyParameters)
  return state
})

registerReducer(ArticlesActionEnum.RemoveArticle, (state, action) => {
  return state
})

const selectAllArticles = createSelector((state, action) => {
  return state.articles
})

const selectOneArticle = createSelector((state, action) => {
  switch (action.name) {
    case ArticlesActionEnum.GetArticle:
    case ArticlesActionEnum.RemoveArticle:
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
