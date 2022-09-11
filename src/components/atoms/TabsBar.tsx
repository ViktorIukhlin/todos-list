interface TabsBarProps {
    tabs: string[];
    activeTab: string;
    loading: boolean;
    tabCallback(index: string): void;
}

export const TabsBar = ({
    tabs,
    activeTab,
    loading,
    tabCallback,
}: TabsBarProps): JSX.Element => {
    const activeElementIndex = tabs.findIndex((tab) => tab === activeTab);

    const getPositionForHoverBox = () => {
        const number = 125 * activeElementIndex + 16;

        return `${number}px`;
    };

    const getBackgroundColor = () => {
        switch (activeElementIndex) {
            case 0:
                return "#6E759F";
            case 1:
                return "#FFA31A";
            case 2:
                return "#44D600";

            default:
                return "";
        }
    };

    return (
        <div className="tabs-bar__container">
            <div
                className="tabs-bar__hover-box"
                style={{
                    left: getPositionForHoverBox(),
                    backgroundColor: getBackgroundColor(),
                }}
            />
            {tabs.map((tab, index) => (
                <div
                    key={tab}
                    className={`tabs-bar__tab ${
                        index === activeElementIndex && "active"
                    }`}
                    onClick={() => {
                        if (loading) return;
                        tabCallback(tab);
                    }}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
};
