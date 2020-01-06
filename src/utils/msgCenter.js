/* eslint-disable lines-between-class-members */
/* eslint-disable no-restricted-syntax */

class MsgCenter {
    topicSubsMap = new Map();
    uuid = 0;

    // 单个订阅事件的token
    _getUUID = () => {
        return ++this.uuid;
    };

    // 事件发布
    publish = (topic, resultObj) => {
        // 没有注册订阅的订阅事件
        if (!this.topicSubsMap.has(topic)) {
            return false;
        }

        let subscribers = this.topicSubsMap.get(topic);
        subscribers.map((sub) => {
            return sub.func(topic, resultObj);
        });
        return true;
    };

    // 事件订阅
    subscribe = (topic, func, uuid) => {
        uuid = uuid || this._getUUID();
        if (Array.isArray(topic)) {
            topic.map(item => {
                return this.subscribe(item, func, uuid);
            });
        }

        if (!this.topicSubsMap.has(topic)) {
            this.topicSubsMap.set(topic, []);
        }

        this.topicSubsMap.get(topic).push({
            token: uuid,
            func
        });
        return uuid;
    };

    // 删除事件订阅
    unsubscribe = (token) => {
        for (let subs of this.topicSubsMap.values()) {
            for (let i = 0; i < subs.length; i++) {
                if (subs[i].token === token) {
                    subs.splice(i--, 1);
                }
            }
        }
        return false;
    };

    reset = () => {
        this.topicSubsMap.clear();
    };
};

export default new MsgCenter();

