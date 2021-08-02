var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** Image 가져오기 */
export function makeImageDom(url, articleLeftDom) {
    return __awaiter(this, void 0, void 0, function* () {
        const imgDom = document.createElement('img');
        imgDom.className = 'article-img';
        try {
            if (url === '') {
                const res = yield fetch('https://picsum.photos/700/400');
                if (res.ok) {
                    imgDom.src = res.url;
                }
            }
            else {
                imgDom.src = url;
            }
        }
        catch (error) {
            return new Error(`fetch Image error!: ${error}`);
        }
        articleLeftDom.appendChild(imgDom);
    });
}
/** Video 가져오기 */
export function makeVideoDom(url, articleLeftDom) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`https://www.youtube.com/oembed?url=${url}&format=json`);
            const iframeUrl = yield res.json();
            articleLeftDom.innerHTML = iframeUrl.html.replace("200", '350').replace("113", "200");
        }
        catch (error) {
            return new Error(`fetch Video error!: ${error}`);
        }
    });
}
