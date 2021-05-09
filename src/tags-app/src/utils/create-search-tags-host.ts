const getGhTashHeaderElement = () => document.querySelector('.position-relative > h2.h6').parentElement;
export const createSearchTagsHost: () => HTMLElement
    = () => {
        const targetElement: HTMLElement = getGhTashHeaderElement();
        const filterElementWidth: number = targetElement
            .querySelector('details')
            .getBoundingClientRect()
            .width;

        const searchHostEl: HTMLElement = document.createElement('div');
        searchHostEl.id = "search-gh-star-tags";
        searchHostEl.style.marginRight = `${filterElementWidth + 10}px`;
        targetElement.appendChild(searchHostEl);

        return searchHostEl;
    };
