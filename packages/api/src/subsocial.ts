import { BasicSubsocialApi } from './basic-subsocial';
import { FindStructsFns, loadAndSetPostRelatedStructs } from './utils/loadPostStructs';
import { PostWithSomeDetails, PostWithAllDetails, AnySpaceId, AnyPostId } from '@subsocial/types';
import { getFirstOrUndefined } from '@subsocial/utils';
import { FindPostsQuery, FindPostsWithDetailsQuery, FindPostWithDetailsQuery } from './utils/types';

export class SubsocialApi extends BasicSubsocialApi {

  private structFinders: FindStructsFns = {
    findSpaces: this.findPublicSpaces.bind(this),
    findPosts: this.findPublicPosts.bind(this),
    findProfiles: this.findProfiles.bind(this)
  }

  async findAllSpaces (ids: AnySpaceId[]) {
    return this.findSpaces({ ids })
  }

  /**
   * Find and load an array of information about public spaces from Subsocial blockchain and IPFS
   * by a given array of space `ids`.
   * 
   * Space is considered public if it meets the next conditions:
   * - The `hidden` field on its' blockchain structure is `false`.
   * - There is a corresponding JSON file that represents the space's content on IPFS.
   *
   * @param ids - An array of ids of desired spaces.
   *
   * @returns An array of data about desired spaces aggregated from Subsocial blockchain and IPFS. If no corresponding spaces to given array of `ids`, an empty array is returned.
   * 
   * @remarks Returns multiple data elements
   */  
  async findPublicSpaces (ids: AnySpaceId[]) {
    return this.findSpaces({ ids, visibility: 'onlyPublic', withContentOnly: true })
  }

  /**
   * Find and load an array of information about unlisted spaces from Subsocial blockchain and IPFS
   * by a given array of space `ids`.
   * 
   * Space is considered unlisted if it meets either of these conditions:
   * - The `hidden` field on it's blockchain structure is `true`.
   * - Or there is no corresponding JSON file that represents the space's content on IPFS.
   * 
   * @param ids - An array of ids of desired spaces.
   *
   * @returns An array of data about desired spaces aggregated from Subsocial blockchain and IPFS. If no corresponding spaces to given array of `ids`, an empty array is returned.
   * 
   * @remarks Returns multiple data elements
   */    
  async findUnlistedSpaces (ids: AnySpaceId[]) {
    return this.findSpaces({ ids, visibility: 'onlyUnlisted' })
  }

  async findAllPosts (ids: AnySpaceId[]) {
    return this.findPosts({ ids })
  }

  /**
   * Find and load an array of information about public posts from Subsocial blockchain and IPFS
   * by a given array of post `ids`.
   * 
   * Post is considered public if it meets the next conditions:
   * - The `hidden` field on its' blockchain structure is `false`.
   * - There is a corresponding JSON file that represents the post's content on IPFS.
   *
   * @param ids - An array of ids of desired posts.
   *
   * @returns An array of data about desired posts aggregated from Subsocial blockchain and IPFS. If no corresponding posts to given array of `ids`, an empty array is returned.
   * 
   * @remarks Returns multiple data elements
   */    
  async findPublicPosts (ids: AnySpaceId[]) {
    return this.findPosts({ ids, visibility: 'onlyPublic', withContentOnly: true })
  }

  /**
   * Find and load an array of information about unlisted posts from Subsocial blockchain and IPFS
   * by a given array of post `ids`.
   * 
   * Post is considered unlisted if it meets either of these conditions:
   * - The `hidden` field on it's blockchain structure is `true`.
   * - Or there is no corresponding JSON file that represents the post's content on IPFS.
   * 
   * @param ids - An array of ids of desired posts
   *
   * @returns An array of data about desired posts aggregated from Subsocial blockchain and IPFS. If no corresponding posts to given array of `ids`, an empty array is returned.
   * 
   * @remarks Returns multiple data elements
   */  
  async findUnlistedPosts (ids: AnySpaceId[]) {
    return this.findPosts({ ids, visibility: 'onlyUnlisted' })
  }

  /** Find and load posts with their extension and owner's profile (if defined). */
  async findPostsWithSomeDetails (filter: FindPostsWithDetailsQuery): Promise<PostWithSomeDetails[]> {
    const posts = await this.findPosts(filter)
    return loadAndSetPostRelatedStructs(posts, this.structFinders, filter)
  }

  async findPublicPostsWithSomeDetails (filter: FindPostsWithDetailsQuery): Promise<PostWithSomeDetails[]> {
    return this.findPostsWithSomeDetails({ ...filter, visibility: 'onlyPublic' })
  }

  async findUnlistedPostsWithSomeDetails (filter: FindPostsWithDetailsQuery): Promise<PostWithSomeDetails[]> {
    return this.findPostsWithSomeDetails({ ...filter, visibility: 'onlyUnlisted' })
  }

  async findPostsWithAllDetails ({ ids, visibility }: FindPostsQuery): Promise<PostWithAllDetails[]> {
    return this.findPostsWithSomeDetails({ ids, withSpace: true, withOwner: true, visibility }) as Promise<PostWithAllDetails[]>
  }

  async findPublicPostsWithAllDetails (ids: AnyPostId[]): Promise<PostWithAllDetails[]> {
    return this.findPostsWithAllDetails({ ids, visibility: 'onlyPublic' })
  }

  async findUnlistedPostsWithAllDetails (ids: AnyPostId[]): Promise<PostWithAllDetails[]> {
    return this.findPostsWithAllDetails({ ids, visibility: 'onlyUnlisted' })
  }

  // Functions that return a single element

  /**
   * Find and load information about a public space from Subsocial blockchain and IPFS using space id.
   * 
   * Space is considered public if it meets these conditions:
   * - The `hidden` field on it's blockchain structure is `false`.
   * - There is a corresponding JSON file that represents the space's content on IPFS.
   *
   * @param id - Id of desired space.
   *
   * @returns Data about desired space aggregated from blockchain and IPFS. If no corresponding space to given id, `undefined` is returned.
   * 
   * @remarks Returns single data element
   */  
  async findPublicSpace (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findPublicSpaces([ id ]))
  }

  /**
   * Find and load information about an unlisted space from blockchain and from IPFS by a given space id.
   * 
   * Space is considered unlisted if it meets either of these conditions:
   * - The `hidden` field on it's blockchain structure is `true`.
   * - Or there is no corresponding JSON file that represents the space's content on IPFS.
   *
   * @param id - Id of desired space.
   *
   * @returns Data about a desired space aggregated from blockchain and IPFS. If no corresponding space to given id, `undefined` is returned.
   * 
   * @remarks Returns single data element
   */
  async findUnlistedSpace (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findUnlistedSpaces([ id ]))
  }

  /**
   * Find and load information about a public post from Subsocial blockchain and IPFS using post id.
   * 
   * Post is considered public if it meets the next conditions:
   * - The `hidden` field on it's blockchain structure is `false`.
   * - There is a corresponding JSON file that represents the post's content on IPFS.
   *
   * @param id - Id of desired post.
   *
   * @returns Data about desired post aggregated from blockchain and IPFS. If no corresponding post to given id, `undefined` is returned.
   * 
   * @remarks Returns single data element
   */  
  async findPublicPost (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findPublicPosts([ id ]))
  }

  /**
   * Find and load information about an unlisted post from blockchain and from IPFS by a given post id.
   * 
   * Post is considered unlisted if it meets either of these conditions:
   * - The `hidden` field on it's blockchain structure is `true`.
   * - Or there is no corresponding JSON file that represents the post's content on IPFS.
   *
   * @param id - Id of desired post.
   *
   * @returns Data about desired post aggregated from blockchain and IPFS. If no corresponding post to given id, `undefined` is returned.
   * 
   * @remarks Returns single data element
   */  
  async findUnlistedPost (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findUnlistedPosts([ id ]))
  }

  async findPostWithSomeDetails ({ id, ...opts }: FindPostWithDetailsQuery) {
    return getFirstOrUndefined(await this.findPostsWithSomeDetails({ ids: [ id ], ...opts }))
  }

  async findPublicPostWithSomeDetails ({ id, ...opts }: FindPostWithDetailsQuery) {
    return getFirstOrUndefined(await this.findPublicPostsWithSomeDetails({ ids: [ id ], ...opts }))
  }

  async findUnlistedPostWithSomeDetails ({ id, ...opts }: FindPostWithDetailsQuery) {
    return getFirstOrUndefined(await this.findUnlistedPostsWithSomeDetails({ ids: [ id ], ...opts }))
  }

  async findPostWithAllDetails (id: AnyPostId) {
    return getFirstOrUndefined(await this.findPostsWithAllDetails({ ids: [ id ] }))
  }

  async findPublicPostWithAllDetails (id: AnyPostId) {
    return getFirstOrUndefined(await this.findPublicPostsWithAllDetails([ id ]))
  }

  async findUnlistedPostWithAllDetails (id: AnyPostId) {
    return getFirstOrUndefined(await this.findUnlistedPostsWithAllDetails([ id ]))
  }
}
