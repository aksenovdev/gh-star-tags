export type HolderKey = string;
export interface StarredHolderSettings {
    holderElSelector?: string;
    createTagsTargetElement?: () => HTMLElement,
    getHolderKey?: (holderEl: HTMLElement) => HolderKey
};
export interface HTMLStarredHolder {
    key: HolderKey;
    tagsSectionTargetElement: HTMLElement;
}

export const createDefaultTagsTargetElement: StarredHolderSettings['createTagsTargetElement']
    = () => document.createElement('div');
export const getHolderKeyFromEl: StarredHolderSettings['getHolderKey']
    = (holderEl: HTMLElement) => holderEl.querySelector('h3 > a').getAttribute('href');
export const getStarredHoldersFromPage: (settings?: StarredHolderSettings) => HTMLStarredHolder[]
    = ({
        holderElSelector = '.col-12.border-bottom',
        getHolderKey = getHolderKeyFromEl,
        createTagsTargetElement = createDefaultTagsTargetElement
    } = {}) =>
        Array.from(document.querySelectorAll(holderElSelector))
            .map((holderEl: HTMLElement) => {
                const tagsSectionTargetElement: HTMLElement = createTagsTargetElement();
                holderEl.appendChild(tagsSectionTargetElement);

                return {
                    tagsSectionTargetElement,
                    key: getHolderKey(holderEl)
                };
            });
