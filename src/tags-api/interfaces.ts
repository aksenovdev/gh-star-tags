export interface RequiredError {
    name: 'RequiredError'
    field: string;
    msg?: string;
}

/**
 *
 * @export
 * @interface Tag
 */
export type Tag = string;;
/**
 *
 * @export
 * @interface TagsHolder
 */
export interface TagsHolder {
    /**
     *
     * @type {string}
     * @memberof TagsHolder
     */
    repositoryKey: string;
    /**
     *
     * @type {string}
     * @memberof TagsHolder
     */
    repositoryLink?: string;
    /**
     *
     * @type {Array<Tag>}
     * @memberof TagsHolder
     */
    tags: Array<Tag>;
}

/**
 * TagsApi - interface
 * @export
 * @interface TagsApi
 */
export interface TagsApi {
    /**
     * Returns a single TagsHolder
     * @summary Find TagHolder by id
     * @param {string} holderKey ID of TagsHolder to return
     * @throws {RequiredError}
     */
    getHolderById: (holderKey: string) => Promise<TagsHolder>;
    createHolder: (tagsHolder: TagsHolder) => Promise<TagsHolder>;
    deleteHolder: (holderKey: string) => Promise<void>;
    addTagsToHolder: (holderKey: string, tagValues: Tag[]) => Promise<TagsHolder>;
    deleteTagsFromHolder: (holderKey: string, tagValues: Tag[]) => Promise<TagsHolder>;
    searchTags: (search: string) => Promise<Tag[]>;
}
