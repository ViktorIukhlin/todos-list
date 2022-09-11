import ReactDOM from "react-dom";
import Spinner from "../atoms/Spinner";

interface LoaderProps {
    loading: boolean;
}

const Loader = ({ loading }: LoaderProps) => {
    const element = (
        <div className="loader">
            <Spinner />
        </div>
    );

    if (loading) {
        return ReactDOM.createPortal(element, document.body);
    } else {
        return null;
    }
};

export default Loader;
