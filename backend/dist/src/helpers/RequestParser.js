"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestParser = void 0;
const client_1 = require("@prisma/client");
class RequestParser {
    constructor(params) {
        this.query = {};
        this.addOrder = (order) => {
            if (order) {
                const localOrder = [];
                const fields = order.split(',');
                for (const f of fields) {
                    let field = f;
                    let sort = client_1.Prisma.SortOrder.asc;
                    if (f.charAt(0) === '-') {
                        field = field.slice(1);
                        sort = client_1.Prisma.SortOrder.desc;
                    }
                    localOrder.push({ [field]: sort });
                }
                this.query.orderBy = localOrder;
            }
        };
        this.addPagination = (maxResults = 3, offset = 0) => {
            this.query.skip = parseInt(offset);
            this.query.take = parseInt(maxResults);
        };
        this.addFilter = (q) => {
            if (q) {
                this.query.where = {};
                this.query.where.AND = [];
                for (const filter of Object.keys(q)) {
                    const q1 = q[filter];
                    const [field, comparator = 'equals'] = filter.split('.');
                    this.query.where.AND.push({
                        [field]: {
                            [comparator]: isNaN(Number(q1)) ? q1 : Number(q1),
                            mode: 'insensitive'
                        }
                    });
                }
            }
        };
        this.build = () => {
            console.debug(JSON.stringify(this.query, null, 2));
            return this.query;
        };
        this.addFilter(params.q);
        this.addOrder(params.order);
        this.addPagination(params.max_results, params.offset);
        this.addProjection(params.projection);
        this.addSearch(params.search);
    }
    addSearch(search) {
        if (search) {
            if (!this.query.where)
                this.query.where = {};
            this.query.where.OR = [{
                    code: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    description: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }];
        }
    }
    addProjection(projection) {
        if (projection) {
            const selectedFields = projection.split(',');
            const fields = {};
            for (const p of selectedFields) {
                fields[p] = true;
            }
            this.query.select = fields;
        }
    }
}
exports.RequestParser = RequestParser;
//# sourceMappingURL=RequestParser.js.map