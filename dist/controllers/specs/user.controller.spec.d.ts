export declare const CredentialSchema: {
    type: string;
    required: string[];
    properties: {
        email: {
            type: string;
            format: string;
        };
        password: {
            type: string;
            minLength: number;
        };
    };
};
export declare const CreadentialRequestBody: {
    description: string;
    required: boolean;
    content: {
        "application/json": {
            schema: {
                type: string;
                required: string[];
                properties: {
                    email: {
                        type: string;
                        format: string;
                    };
                    password: {
                        type: string;
                        minLength: number;
                    };
                };
            };
        };
    };
};
export declare const TokenSchema: {
    type: string;
    required: string[];
    properties: {
        token: {
            type: string;
        };
    };
};
export declare const TokenRequestBody: {
    description: string;
    required: boolean;
    content: {
        "application/json": {
            schema: {
                type: string;
                required: string[];
                properties: {
                    token: {
                        type: string;
                    };
                };
            };
        };
    };
};
export declare const EmailSchema: {
    type: string;
    required: string[];
    properties: {
        email: {
            type: string;
            format: string;
        };
    };
};
export declare const EmailRequestBody: {
    description: string;
    required: boolean;
    content: {
        "application/json": {
            schema: {
                type: string;
                required: string[];
                properties: {
                    email: {
                        type: string;
                        format: string;
                    };
                };
            };
        };
    };
};
export declare const ComfirmResetSchema: {
    type: string;
    required: string[];
    properties: {
        token: {
            type: string;
        };
        email: {
            type: string;
            format: string;
        };
        password: {
            type: string;
        };
        confirmPassword: {
            type: string;
        };
    };
};
export declare const ConfirmRequestBody: {
    description: string;
    required: boolean;
    content: {
        "application/json": {
            schema: {
                type: string;
                required: string[];
                properties: {
                    token: {
                        type: string;
                    };
                    email: {
                        type: string;
                        format: string;
                    };
                    password: {
                        type: string;
                    };
                    confirmPassword: {
                        type: string;
                    };
                };
            };
        };
    };
};
