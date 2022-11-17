"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma1 = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const logic_1 = require("./logic");
exports.prisma1 = new client_1.PrismaClient({ log: ['query'],
});
const router = (0, express_1.Router)();
router.get("/products", (0, logic_1.getProducts)(exports.prisma1));
router.get("/products/:id", (0, logic_1.getProduct)(exports.prisma1));
router.put("/products", (0, logic_1.createProduct)(exports.prisma1));
router.delete("/products/:id", (0, logic_1.deleteProduct)(exports.prisma1));
exports.default = router;
//# sourceMappingURL=router.js.map