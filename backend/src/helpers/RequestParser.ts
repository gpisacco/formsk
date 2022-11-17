import { Prisma, PrismaClient, product } from '@prisma/client'
import { Query } from 'express-serve-static-core';

export class RequestParser {
    private query: Prisma.productFindManyArgs = {};
    constructor(params: Query) {
        this.addFilter(params.q as string[])
        this.addOrder(params.order as string)
        this.addPagination(params.max_results, params.offset)
        this.addProjection(params.projection as string);
        this.addSearch(params.search as string);
    }
    addSearch(search: string) {
        if (search) {
            if (!this.query.where)
                this.query.where = {}
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
            }]
        }
    }
    addProjection(projection: string) {
        if (projection) {
            const selectedFields = projection.split(',')
            const fields = {} as any;
            for (const p of selectedFields) {
                fields[p] = true;
            }
            this.query.select = fields;
        }
    }
    addOrder = (order: string) => {
        if (order) {
            const localOrder = [] as any
            const fields = (order as string).split(',');
            for (const f of fields) {
                let field = f
                let sort: Prisma.SortOrder = Prisma.SortOrder.asc
                if (f.charAt(0) === '-') {
                    field = field.slice(1);
                    sort = Prisma.SortOrder.desc;
                }
                localOrder.push({ [field]: sort })
            }
            this.query.orderBy = localOrder
        }
    };

    addPagination = (maxResults: any = 3, offset: any = 0) => {
        this.query.skip = parseInt(offset);
        this.query.take = parseInt(maxResults);
    };
    addFilter = (q: string[]) => {
        if (q) {
            this.query.where = {};
            this.query.where.AND = []
            for (const filter of Object.keys(q)) {
                const q1 = (q as any)[filter];
                const [field, comparator = 'equals'] = filter.split('.');
                this.query.where.AND.push({
                    [field]: {
                        [comparator]: isNaN(Number(q1)) ? q1 : Number(q1),
                        mode: 'insensitive'
                    }
                })
            }
        }
    };
    build = (): Prisma.productFindManyArgs => {
        console.debug(JSON.stringify(this.query, null, 2))
        return this.query;
    }


}