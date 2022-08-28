interface StatusFlagProps {
    done?: boolean;
}

export const StatusFlag = ({ done }: StatusFlagProps): JSX.Element => {
    return done ? (
        <div className="status-flag done">Done</div>
    ) : (
        <div className="status-flag to-do">To do</div>
    );
};
