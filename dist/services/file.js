"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImagesHandlers = (function () {
    function concatImage(url) {
        if (url && url !== "") {
            return "https://darkkom.fra1.digitaloceanspaces.com/uploads/" + url;
        }
        return url;
    }
    return {
        concatImage: concatImage,
    };
})();
exports.default = ImagesHandlers;
//# sourceMappingURL=file.js.map