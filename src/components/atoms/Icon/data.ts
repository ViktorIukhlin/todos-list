import ArrowUp from "./icons/ArrowUp";
import Delete from "./icons/Delete";
import Done from "./icons/Done";
import Edit from "./icons/Edit";
import Placeholder from "./icons/PlaceHolder";
import Plus from "./icons/Plus";
import Search from "./icons/Search";

const ICONS = {
    placeholder: Placeholder,
    edit: Edit,
    delete: Delete,
    plus: Plus,
    done: Done,
    search: Search,
    "arrow-up": ArrowUp,
};

export default ICONS;

export type IconType = typeof ICONS[keyof typeof ICONS];
export type SupportedIcon = keyof typeof ICONS;
