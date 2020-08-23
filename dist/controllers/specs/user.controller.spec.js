"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmRequestBody = exports.ComfirmResetSchema = exports.EmailRequestBody = exports.EmailSchema = exports.TokenRequestBody = exports.TokenSchema = exports.CreadentialRequestBody = exports.CredentialSchema = void 0;
exports.CredentialSchema = {
    type: 'object',
    required: ["email", 'password'],
    properties: {
        email: {
            type: "string",
            format: "email"
        },
        password: {
            type: "string",
            minLength: 8
        }
    }
};
exports.CreadentialRequestBody = {
    description: "A Login API Description",
    required: true,
    content: {
        "application/json": { schema: exports.CredentialSchema }
    }
};
exports.TokenSchema = {
    type: 'object',
    required: ["token"],
    properties: {
        token: {
            type: "string"
        },
    }
};
exports.TokenRequestBody = {
    description: "WHO AM I",
    required: true,
    content: {
        "application/json": { schema: exports.TokenSchema }
    }
};
exports.EmailSchema = {
    type: 'object',
    required: ["email"],
    properties: {
        email: {
            type: "string",
            format: "email"
        },
    }
};
exports.EmailRequestBody = {
    description: "Reset email using email!",
    required: true,
    content: {
        "application/json": { schema: exports.EmailSchema }
    }
};
exports.ComfirmResetSchema = {
    type: 'object',
    required: ["token", "email"],
    properties: {
        token: {
            type: "string"
        },
        email: {
            type: "string",
            format: "email"
        },
        password: {
            type: "string"
        },
        confirmPassword: {
            type: "string"
        },
    }
};
exports.ConfirmRequestBody = {
    description: "Confirm Reset Acoount Using Data!",
    required: true,
    content: {
        "application/json": { schema: exports.ComfirmResetSchema }
    }
};
//# sourceMappingURL=user.controller.spec.js.map