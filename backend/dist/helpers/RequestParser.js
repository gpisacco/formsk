"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestParser = void 0;
class RequestParser {
    constructor(params) {
        this.VALID_PARAMS = ['order', 'filters', 'projection', 'max_results', 'offset'];
        this.query = {};
        this.addOrder = () => {
            this.query.orderBy;
        };
        this.addFilter = () => { };
        this.build = () => {
            return this.query;
        };
        console.debug(params);
        this.query.where = {};
        for (const filter of Object.keys(params)) {
            const [field, comparator] = filter.split('.');
            this.query.where.AND = [];
            this.query.where.AND.push({
                [field]: {
                    [comparator]: params[filter]
                }
            });
        }
    }
}
exports.RequestParser = RequestParser;
//# sourceMappingURL=RequestParser.js.map