export default class EventWather {
    private _eventList: object = {};

    /**
     * subscribe event handler.
     * 
     * @param key
     * @param handler
     */
    $subscribe(key: string, handler: Function) {
        if (!Array.isArray(this._eventList[key])) {
            this._eventList[key] = [];
        }
        this._eventList[key].push(handler);
    }

    /**
     * emit target event.
     * 
     * @param key
     * @param payload
     */
    $emit(key: string, ...payload: any[]) {
        if (this._eventList[key]) {
            this._eventList[key].forEach((item: Function) => {
                item(...payload);
            });
        }
    }

    /**
     * get all event names.
     */
    $events(): string[] {
        return Object.keys(this._eventList);
    }

    /**
     * remove target event handler.
     * 
     * @param key
     * @param handler
     */
    $remove(key: string, handler: Function) {
        if (handler) {
            const index = this._eventList[key].findIndex(item => item.toString() === handler.toString());
            index >= 0 && this._eventList[key].splice(index, 1);
        } else if (key && !handler) {
            delete this._eventList[key];
        }
    }
}