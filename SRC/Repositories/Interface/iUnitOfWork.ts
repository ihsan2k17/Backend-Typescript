export interface IUnitOfWork{
    beginTransaction(): Promise<void>;
    Save(): Promise<void>;
    Dispose(): Promise<void>;
    openConnection(): Promise<void>;
    closeConnection(): Promise<void>
}