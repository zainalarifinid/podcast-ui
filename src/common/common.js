import { isNull } from "util";

export const isUndef = (v) => isNull(v) || typeof v == 'undefined';

export default {
    undef: isUndef
};
