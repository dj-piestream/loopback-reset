export const CredentialSchema = {
    type:'object',
    required:["email", 'password'],
    properties:{
        email:{
            type:"string",
            format:"email"
        },
        password:{
            type:"string",
            minLength:8
        }
    }
};

export const CreadentialRequestBody = {
    description:"A Login API Description",
    required:true,
    content:{
        "application/json":{schema:CredentialSchema}
    }
}

export const TokenSchema = {
    type:'object',
    required:["token"],
    properties:{
        token:{
            type:"string"
        },
    }
};

export const TokenRequestBody = {
    description:"WHO AM I",
    required:true,
    content:{
        "application/json":{schema:TokenSchema}
    }
}

export const EmailSchema = {
    type:'object',
    required:["email"],
    properties:{
        email:{
            type:"string",
            format:"email"
        },
    }
};

export const EmailRequestBody = {
    description:"Reset email using email!",
    required:true,
    content:{
        "application/json":{schema:EmailSchema}
    }
}


export const ComfirmResetSchema = {
    type:'object',
    required:["token","email"],
    properties:{
        token:{
            type:"string"
        },
        email:{
            type:"string",
            format:"email"
        },
        password:{
            type:"string"
        },
        confirmPassword:{
            type:"string"
        },
    }
};

export const ConfirmRequestBody = {
    description:"Confirm Reset Acoount Using Data!",
    required:true,
    content:{
        "application/json":{schema:ComfirmResetSchema}
    }
}