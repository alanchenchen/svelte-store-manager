export declare type bindStateCallback = (val: object) => void;

export declare type getterRegiste = {
    [T: string] : (state: object) => object;
}

export declare type getter = (key: string, bindValueCallback?: bindStateCallback) => any
export declare type setState = (val: object) => void
export declare type commit = (key: string, ...payload: any[]) => void
export declare type dispatch = (key: string, ...payload: any[]) => void
export declare interface context {
    state: object;
    setState?: setState;
    getter: getter;
    commit?: commit;
    dispatch?: dispatch;
} 

export declare type registeStatement = {
    [T: string] : (ctx: context, ...payload: any[]) => void
}