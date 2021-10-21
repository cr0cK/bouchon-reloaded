import * as fs from 'fs'
import { sample, sampleSize } from 'lodash'
import { ensureArray } from '../libs/helpers'
import { replacer, reviver } from '../libs/helpers/jsonSerializer'
import { logger } from '../libs/logger'
import { MockId } from '../libs/types'
import { IMockIdRelation, Maybe, MaybeUndef } from '../libs/types'
import { getMockIdIterator } from './getMockIdIterator'
import { rangeNumberBetween } from './ramdom'

export interface IMockIdGeneratorFileFormat<TMockEntityName> {
  allMockIds: Map<TMockEntityName, IMockIdRelation[]>
  metas: Map<string, Map<TMockEntityName, Map<string, any>>>
}

/**
 * Generate mockId to reference mocked data relations.
 */
export class MockIdGenerator<TMockEntityName extends string> {
  private _entityNames: TMockEntityName[] = []

  private _allMockIds: IMockIdGeneratorFileFormat<TMockEntityName>['allMockIds'] =
    new Map()

  private _mockIdIterators: Map<TMockEntityName, Iterator<MockId>> = new Map()

  private _metas: IMockIdGeneratorFileFormat<TMockEntityName>['metas'] =
    new Map()

  /**
   * Set entity names that will be used to generate mockIds.
   */
  constructor(entityNames: TMockEntityName[]) {
    this._entityNames = entityNames
  }

  /**
   * Generate a new id for a collection.
   */
  newMockId(forEntity: TMockEntityName, parentMockId?: MockId): MockId {
    if (!this._allMockIds.has(forEntity)) {
      this._allMockIds.set(forEntity, [])
    }

    if (!this._mockIdIterators.has(forEntity)) {
      this._mockIdIterators.set(
        forEntity,
        getMockIdIterator(this._entityNames, String(forEntity))
      )
    }

    const mockId = this.getIterator(forEntity).next().value

    this.getMockIdRelation(forEntity).push({
      mockId,
      parentMockId
    })

    return mockId
  }

  /**
   * Generate a new list of ids for a collection.
   */
  newListOfMockIds(
    forEntity: TMockEntityName,
    rangeValues: MockId[],
    parentMockId?: MockId
  ): MockId[] {
    return rangeNumberBetween(rangeValues).map(() =>
      this.newMockId(forEntity, parentMockId)
    )
  }

  /**
   * Return the iterator of an entityName.
   */
  getIterator(forEntity: TMockEntityName): Iterator<MockId> {
    const iterator = this._mockIdIterators.get(forEntity)

    if (!iterator) {
      throw new Error('Cant retrieve iterator')
    }

    return iterator
  }

  /**
   * Retrieve a first ID from a collection.
   */
  getFirstMockId(
    forEntity: TMockEntityName,
    withParentMockId?: MockId
  ): MockId {
    const uuids = this.getMockIdRelation(forEntity, withParentMockId).map(
      uuid => uuid.mockId
    )
    return uuids.shift() || -1
  }

  /**
   * Retrieve a list of id from a collection
   */
  getRandomMockIds(
    forEntity: TMockEntityName,
    howMany: MockId,
    withParentMockId?: MockId
  ): MockId[] {
    const mockIds = this.getMockIdRelation(forEntity, withParentMockId).map(
      uuid => uuid.mockId
    )
    return sampleSize(mockIds, howMany)
  }

  /**
   * Retrieve an id from a collection.
   */
  getRandomMockId(
    forEntity: TMockEntityName,
    withParentMockId?: MockId
  ): MockId {
    return this.getRandomMockIds(forEntity, 1, withParentMockId).pop() || -1
  }

  /**
   * Retrieve a list of ids from a collection.
   */
  getListOfMocksIds(
    forEntity: TMockEntityName,
    withParentMockId?: MockId
  ): MockId[] {
    return this.getMockIdRelation(forEntity, withParentMockId).map(
      u => u.mockId
    )
  }

  /**
   * Retrieve the parent of an id from a collection.
   */
  getParentMockId(forEntity: TMockEntityName, mockId: MockId): MockId {
    const mockIdRelation = this.getMockIdRelation(forEntity)
      .filter(u => u.mockId === mockId)
      .pop()

    if (!mockIdRelation) {
      return -1
    }

    return mockIdRelation.parentMockId || -1
  }

  /**
   * Return the collection of an entity.
   */
  getMockIdRelation(
    forEntity: TMockEntityName,
    withParentMockId?: MockId
  ): IMockIdRelation[] {
    if (!this._allMockIds.has(forEntity)) {
      this._allMockIds.set(forEntity, [])
    }

    if (!withParentMockId) {
      return ensureArray(this._allMockIds.get(forEntity))
    }

    return ensureArray(this._allMockIds.get(forEntity)).filter(
      entry => entry.parentMockId === withParentMockId
    )
  }

  /**
   * Return a map from meta data.
   */
  getMetaMap<T>(name: string, forEntity: TMockEntityName): Map<string, T> {
    const map = this._metas.get(name)

    if (!map) {
      return new Map()
    }

    const metaMap = map.get(forEntity)

    return metaMap || new Map()
  }

  /**
   * Return a random entry of the map from meta data.
   */
  getRandomFromMetaMap<T>(name: string, forEntity: TMockEntityName): Maybe<T> {
    const map = this.getMetaMap<T>(name, forEntity)
    const mapKeys = Array.from(map.keys())
    const randomKey = sample(mapKeys)

    if (!randomKey) {
      return null
    }

    return map.get(randomKey) || null
  }

  /**
   * Return a meta data.
   */
  getMeta<T>(
    name: string,
    forEntity: TMockEntityName,
    id: Maybe<MockId>
  ): MaybeUndef<T> {
    if (!id) {
      return
    }

    const metaMap = this.getMetaMap<T>(name, forEntity)
    return metaMap.get(String(id))
  }

  /**
   * Save a meta data.
   */
  setMeta<T>(name: string, forEntity: TMockEntityName, id: MockId, meta: T) {
    const map = this._metas.get(name) || new Map()
    const metas = map.get(forEntity) || new Map()

    metas.set(String(id), meta)
    map.set(forEntity, metas)

    this._metas.set(name, map)
  }

  /**
   * Unshift an uuid in the collection of an entity.
   * Useful for processes that will "consume" a list of UUID
   * (like the deviance routine in the WS server).
   */
  shift(forEntity: TMockEntityName): MaybeUndef<IMockIdRelation> {
    const uuids = this._allMockIds.get(forEntity)
    if (!uuids) {
      return
    }

    return uuids.shift()
  }

  /**
   * Return stringified JSON of all collections.
   */
  stringify(): string {
    const fileContent: IMockIdGeneratorFileFormat<TMockEntityName> = {
      allMockIds: this._allMockIds,
      metas: this._metas
    }

    return JSON.stringify(fileContent, replacer, 2)
  }

  /**
   * Retrieve all collections from a JSON string.
   */
  loadFromFile(filePath: string): void {
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      const parsedContent = JSON.parse(
        content,
        reviver
      ) as IMockIdGeneratorFileFormat<TMockEntityName>

      this._allMockIds = new Map(parsedContent.allMockIds)
      this._metas = new Map(parsedContent.metas)
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err)

        if (err.stack) {
          logger.debug(err.stack)
        }
      }
    }
  }
}
