import { storeType } from "../core";

export declare interface options {
    filter?: (type?: string, prev?: object, next?: object) => boolean;
    collapsed?: boolean;
}

/**
 * logger plugin, log to console while mutaion triggers.
 */
export default ({
    filter = () => true,
    collapsed = true
}: options = {}) => {
    return (store: storeType) => {
        const cache = {
            prev: store.state(),
            next: store.state()
        };

        const startMessage = collapsed ? console.groupCollapsed : console.group;
        const logger = console;
        
        store.$subscribe("mutation", ({ type, payload }) => {
            cache.prev = JSON.parse(JSON.stringify(cache.next));
            cache.next = store.state();
            if (
                typeof filter === "function" &&
                filter(type, cache.prev, cache.next)
            ) {
                const moduleName = store.name ? `[${store.name}]: ` : "";
                const message = `${moduleName}mutation ${type} @ ${new Date().toLocaleString()}`;
                // render
                try {
                    startMessage(message);
                } catch (e) {
                    logger.log(message);
                }

                logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', cache.prev);
                logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', { type, payloadList: payload });
                logger.log('%c next state', 'color: #4CAF50; font-weight: bold', cache.next);

                try {
                    logger.groupEnd();
                } catch (e) {
                    logger.log('—— log end ——');
                }
            }
        });
    }
}