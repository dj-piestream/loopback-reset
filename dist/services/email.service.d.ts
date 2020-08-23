interface EmailManager<T = string> {
    sendMail(to: string, subject: string, body: string): Promise<boolean>;
}
export declare class MyNodeMailer implements EmailManager<string> {
    readonly configObj: object;
    constructor(configObj: object);
    sendMail(to: string, subject: string, body: string): Promise<boolean>;
}
export {};
