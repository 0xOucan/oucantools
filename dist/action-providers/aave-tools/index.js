"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAaveError = exports.AaveErrorCode = exports.AaveError = exports.aaveProtocolActionProvider = exports.AaveProtocolActionProvider = void 0;
// Export the main action provider
var aaveprotocolActionProvider_1 = require("./aaveprotocolActionProvider");
Object.defineProperty(exports, "AaveProtocolActionProvider", { enumerable: true, get: function () { return aaveprotocolActionProvider_1.AaveProtocolActionProvider; } });
Object.defineProperty(exports, "aaveProtocolActionProvider", { enumerable: true, get: function () { return aaveprotocolActionProvider_1.aaveProtocolActionProvider; } });
// Export types and schemas for external use
__exportStar(require("./types"), exports);
__exportStar(require("./schemas"), exports);
// Export specific error items instead of all
var errors_1 = require("./errors");
Object.defineProperty(exports, "AaveError", { enumerable: true, get: function () { return errors_1.AaveError; } });
Object.defineProperty(exports, "AaveErrorCode", { enumerable: true, get: function () { return errors_1.AaveErrorCode; } });
Object.defineProperty(exports, "createAaveError", { enumerable: true, get: function () { return errors_1.createAaveError; } });
// Don't export internal utilities and constants
