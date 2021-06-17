import { AnyPostId, AnySpaceId } from '@subsocial/types'

export type HttpRequestMethod = 'post' | 'get'

export type UseServerProps = {
  httpRequestMethod: HttpRequestMethod
}

export type SubsocialContext = {
  useServer?: UseServerProps
}

/** 
 * The four visible state filters correspond to the next conditions:
 * 
 * - `onlyVisible` – The `hidden` field on corresponding Substrate struct (e.g. `Space` or `Post`) is `false`.
 * - `onlyHidden` – The `hidden` field on corresponding Substrate struct (e.g. `Space` or `Post`) is `true`.
 * - `onlyPublic` – The `hidden` field on corresponding Substrate struct (e.g. `Space` or `Post`) is `false` 
 * and there is a corresponding JSON file on IPFS.
 * - `onlyUnlisted` – Either the `hidden` field on corresponding Substrate struct (e.g. `Space` or `Post`) is `true` 
 * or there is a no corresponding JSON file on IPFS.
 */

export type Visibility = 'onlyVisible' | 'onlyHidden' | 'onlyPublic' | 'onlyUnlisted'

export type VisibilityFilter = {
  visibility?: Visibility
}

export type ContentFilter = {
  withContentOnly?: boolean
}

export type Filters = VisibilityFilter & ContentFilter

export type PostDetailsOpts = VisibilityFilter & {
  withSpace?: boolean
  withOwner?: boolean
}

type IdsFilter<Id> = {
  ids: Id[]
}

type IdFilter<Id> = {
  id: Id
}

export type FindStructs<Id> = IdsFilter<Id> & Filters
export type FindStruct<Id> = IdFilter<Id> & Filters

export type FindPostsQuery = FindStructs<AnyPostId>
export type FindSpacesQuery = FindStructs<AnySpaceId>
export type FindPostQuery = FindStruct<AnyPostId>
export type FindSpaceQuery = FindStruct<AnySpaceId>

export type FindPostsWithDetailsQuery = FindPostsQuery & PostDetailsOpts
export type FindPostWithDetailsQuery = FindPostQuery & PostDetailsOpts

type CidAsStr = string

export type ContentResult<T> = Record<CidAsStr, T>
