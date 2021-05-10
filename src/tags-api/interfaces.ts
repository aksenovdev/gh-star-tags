export interface TagsHolder {
    link: string;
    description: string;
    tags: Array<Tag>;
    lang?: {
        color: string;
        name: string;
    };
}
export type Tag = string;
export interface TagsApi {
    getHolderById: (holderKey: string) => Promise<TagsHolder>;
    createHolder: (tagsHolder: TagsHolder) => Promise<TagsHolder>;
    deleteHolder: (holderKey: string) => Promise<void>;
    addTagsToHolder: (holderKey: string, tagValues: Tag[]) => Promise<TagsHolder>;
    deleteTagsFromHolder: (holderKey: string, tagValues: Tag[]) => Promise<TagsHolder>;
    searchTags: (search: string) => Promise<Tag[]>;
    searchHoldersByTags: (tags: Tag[]) => Promise<TagsHolder[]>;
    getAllTags: () => Promise<Tag[]>;
}
