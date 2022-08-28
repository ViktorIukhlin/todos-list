import { useEffect } from "react";

interface useLazyLoadingProps {
    depth: number;
    refObserverContainer: React.MutableRefObject<null | HTMLElement>;
    refItemsContainer: React.MutableRefObject<null | HTMLElement>;
    updateData(): void;
}

export const useLazyLoading = ({
    depth,
    refObserverContainer,
    refItemsContainer,
    updateData,
}: useLazyLoadingProps) => {
    useEffect(() => {
        if (refItemsContainer.current && refObserverContainer.current) {
            const itemsContainer = refItemsContainer.current;
            const observerContainer = refObserverContainer.current;

            if (itemsContainer.children.length <= 10) return;

            const options = { root: observerContainer, threshold: 0.9 };

            const anchorElement: Element =
                itemsContainer.lastElementChild as Element;

            const observer = new IntersectionObserver((elements, observer) => {
                elements.forEach((element) => {
                    if (element.isIntersecting === true) {
                        updateData();

                        observer.unobserve(anchorElement);
                    }
                });
            }, options);

            observer.observe(anchorElement);

            return () => {
                observer.unobserve(anchorElement);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depth, refItemsContainer.current, refObserverContainer.current]);
};
