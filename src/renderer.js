import Reconciler from "react-reconciler";

const hostConfig = {
    // supportsMutation: true,

    /*
     * Нужно ли обрабатывать вложенное содержимое как текст или как поддерево?
     * Вызывается во время рендер-фазы
     * 
     * */
    shouldSetTextContent: (type, props) => false,

    /**
     * Создаёт инстанс согласно типу переданного хост-компонента и задаёт ему props.
     * Вызывается на рендер фазе.
     *
     * Возвращает созданный инстанс.
     * */
    createInstance: (type, props) => { },

    /* Как createInstance только для текстовых нод */
    createTextInstance(text) { },

    /**
     * Прикрепляет ребёнка к родителю.
     * Вызывается на рендер фазе.
     */
    appendInitialChild: (parent, child) => { },

    /*
     * Добавляет ребенка корневому контейнеру
     * Вызывается для каждого ребенка во время коммит-фазы
     */
    appendChildToContainer: (container, child) => { },

    // finalizeInitialChildren: () => false,
    // commitMount: () => { },

    /**
     * Вызывается во время коммит-фазы для родителя,
     * поддерево которого должно быть удалено
     */
    removeChild: (parentInstance, child) => { },

    removeChildFromContainer: (container, child) => { },

    /*
     * Проверяет наличие изменений и говорит реконсилятору, изменилось ли что-то
     * Основная задача – найти их, но не вносить. Рекурсивно вызывается на всех
     * вершинах изменившегося поддерева (кроме текстовых) во время рендер-фазы.
     * */
    prepareUpdate: (instance, type, oldProps, newProps) => null,

    /*
     * Вносит изменения, найденные ранее. Вызывается в фазе коммита
     * на всех элементах, которые имеют updatePayload
     * */
    commitUpdate: (instance, updatePayload, type, oldProps, newProps) => { },

    /**
     * Вызывается, если на ноде finalizeInitialChildren вернул true.
     *
     * Позволяет выполнить некоторую дополнительную работу, после того,
     * как узел был присоеденён к дереву в первый раз.
     */

    appendChild: (parent, child) => { },
    /*
    * Вставляет ребёнка перед некоторым узлом,
    * который уже существует на экране. 
    * Вызывается во время коммит-фазы
    */
    insertBefore: (parent, child, before) => {
        parent.addChild(child);
    },
    insertInContainerBefore: (container, child, before) => {
        container.addChild(child);
    },

    getRootHostContext: (rootContainerInstance) => null,
    getChildHostContext: (parentHostContext, type, rootContainerInstance) => { },

    prepareForCommit: (rootContainerInstance) => { },
    resetAfterCommit: (rootContainerInstance) => { },

    // clearContainer: (container) => { },
    // detachDeletedInstance: (instance) => { },
    // getPublicInstance: (instance) => instance,
};

export const render = (jsx, root) => {
    const reconciler = Reconciler(hostConfig);
    const container = reconciler.createContainer(root);

    reconciler.updateContainer(jsx, container, null, () => { });
};
