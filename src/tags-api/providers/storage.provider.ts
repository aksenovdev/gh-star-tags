import flatMap from 'lodash-es/flatMap';
import uniq from 'lodash-es/uniq';
import cloneDeep from 'lodash-es/cloneDeep';
import type { Tag, TagsApi, TagsHolder } from '../interfaces';

export interface StorageProviderOptions {
    storageKeyPrefix?: string;
};

class LocalStorageRepository {
    public get allHolders(): TagsHolder[] {
        return this.holders;
    }
    public get allTags(): Tag[] {
        return this.tags;
    }
    private holders: TagsHolder[] = [];
    private tags: Tag[] = [];

    constructor(private readonly dataKey: string) {
        this.retrieveDataFromStorage();
    }

    public getTagsHolder(key: string): TagsHolder {
        return cloneDeep(this.holders.find(({ link }: TagsHolder) => link === key));
    }

    public addTagsHolder(tagsHolder: TagsHolder): TagsHolder {
        tagsHolder.tags = tagsHolder.tags || [];
        const updatedData: TagsHolder[] = this.holders
            .filter((holder: TagsHolder) => holder.link !== tagsHolder.link);
        updatedData.push(tagsHolder);
        this.setData(updatedData);

        return cloneDeep(tagsHolder);
    }

    public deleteTagsHolder(key: string): void {
        const updatedData: TagsHolder[] = this.holders
            .filter((holder: TagsHolder) => holder.link !== key);
        this.setData(updatedData);
    }

    public findTags(search: string): Tag[] {
        search = search.toLowerCase();
        return this.tags.filter((tag: Tag) => tag.toLowerCase().includes(search));
    }

    public patchData(data: TagsHolder | TagsHolder[]): void {
        data = Array.isArray(data) ? data : [data];
        const dataMap: Map<string, TagsHolder> = new Map(
            data.map((tagsHolder: TagsHolder) => [tagsHolder.link, tagsHolder])
        );
        const updatedData: TagsHolder[] = this.holders
            .map(
                (tagsHolder: TagsHolder) => dataMap.has(tagsHolder.link)
                    ? dataMap.get(tagsHolder.link)
                    : tagsHolder
            );
        this.setData(updatedData);
    }

    public setData(data: TagsHolder[] = this.holders): void {
        localStorage.setItem(this.dataKey, JSON.stringify(data));
        this.retrieveDataFromStorage();
    }

    private retrieveDataFromStorage(): void {
        this.holders = JSON.parse(localStorage.getItem(this.dataKey) || "[]");
        this.tags = uniq(flatMap(this.holders.map(({ tags }: TagsHolder) => tags)));
    }
}

class StorageTagsApiProvider implements TagsApi {
    private static STORAGE_KEY: string = 'ghst-data';
    private storageKey: string = `${this.options.storageKeyPrefix}-${StorageTagsApiProvider.STORAGE_KEY}`;
    private dataRepository: LocalStorageRepository = new LocalStorageRepository(this.storageKey);

    constructor(private readonly options: StorageProviderOptions = {}) {}

    public async getHolderById(holderKey: string): Promise<TagsHolder> {
        return this.dataRepository.getTagsHolder(holderKey);
    };

    public async createHolder(tagsHolder: TagsHolder): Promise<TagsHolder> {
        return Promise.resolve(this.dataRepository.addTagsHolder(tagsHolder));
    };

    public async deleteHolder(holderKey: string): Promise<void> {
        this.dataRepository.deleteTagsHolder(holderKey);

        return Promise.resolve();
    };

    public async addTagsToHolder(holderKey: string, tags: Tag[]): Promise<TagsHolder> {
        const holder: TagsHolder = this.dataRepository.getTagsHolder(holderKey);
        if (holder) {
            holder.tags = uniq([...holder.tags, ...tags]);
            this.dataRepository.patchData(holder);

            return Promise.resolve(holder);
        } else {
            return Promise.reject(`Holder with key "${holder}" dont exist`);
        }
    };

    public async deleteTagsFromHolder(holderKey: string, tags: Tag[]): Promise<TagsHolder> {
        const holder: TagsHolder = this.dataRepository.getTagsHolder(holderKey);
        if (holder) {
            holder.tags = holder.tags.filter((tag: Tag) => !tags.includes(tag));
            this.dataRepository.patchData(holder);

            return Promise.resolve(holder);
        } else {
            return Promise.reject(`Holder with key "${holder}" dont exist`);
        }
    }

    public async searchTags(search: string): Promise<Tag[]> {
        return Promise.resolve(this.dataRepository.findTags(search));
    }

    public async searchHoldersByTags(tags: Tag[]): Promise<TagsHolder[]> {
        return Promise.resolve(
            this.dataRepository.allHolders
                .filter((holder: TagsHolder) => tags.every((tag: Tag) => holder.tags.includes(tag)))
        );
    }

    public async getAllTags(): Promise<Tag[]> {
        return Promise.resolve(this.dataRepository.allTags);
    }
}

export const STORAGE_PROVIDER_KEY: string = 'STORAGE_PROVIDER_KEY';
export const createStorageProvider: (options?: StorageProviderOptions) => TagsApi
    = (options: StorageProviderOptions = {}) => new StorageTagsApiProvider(options);
