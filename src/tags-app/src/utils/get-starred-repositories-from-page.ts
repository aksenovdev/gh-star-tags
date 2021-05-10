import type { HolderData } from '../stores/tags-holder.store';

export interface RepositoryHolderInfo {
    data: HolderData;
    tagsSectionTargetElement: HTMLElement;
}

const getHolderDataFromEl: (holderEl: HTMLElement) => HolderData
    = (holderEl: HTMLElement) => {
        const languageEl: HTMLElement = holderEl.querySelector('[itemprop="programmingLanguage"]');

        return {
            link: holderEl.querySelector('h3 > a').getAttribute('href'),
            description: holderEl.querySelector('[itemprop="description"]')?.textContent || '',
            lang: languageEl
                ? {
                    name: languageEl.textContent,
                    color: getComputedStyle(languageEl.previousElementSibling).backgroundColor
                }
                : null,
        };
    };
export const getTagsHoldersFromPage: () => RepositoryHolderInfo[]
    = () =>
        Array.from(document.querySelectorAll('.col-12.border-bottom'))
            .map((holderEl: HTMLElement) => {
                const tagsSectionTargetElement: HTMLElement =  document.createElement('div');
                holderEl.appendChild(tagsSectionTargetElement);

                return {
                    tagsSectionTargetElement,
                    data: getHolderDataFromEl(holderEl)
                };
            });
