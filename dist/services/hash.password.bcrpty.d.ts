interface PasswordHasher<T = string> {
    hashPassword(T: string): Promise<T>;
    comparePassword(passwordFromRequest: T, storedPassword: T): Promise<boolean>;
}
export declare class BcryptHasher implements PasswordHasher<string> {
    readonly round: number;
    hashPassword(password: string): Promise<string>;
    comparePassword(passwordFromRequest: string, storedPassword: string): Promise<boolean>;
}
export {};
