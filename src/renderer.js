import Reconciler from "react-reconciler";
import * as PIXI from 'pixi.js';

const hostConfig = {
    supportsMutation: true,
    getRootHostContext: () => { },
    getChildHostContext: () => { },
    prepareForCommit: () => { },
    resetAfterCommit: () => { },
    shouldSetTextContent: () => false,

    createInstance: (type, props) => {
        let instance;

        if (type === 'sprite') {
            const { x = 0, y = 0, onClick, width, height, anchor } = props;
            instance = new PIXI.Sprite(props.texture);

            instance.width = width;
            instance.height = height;

            instance.x = x;
            instance.y = y;
            if (anchor) {
                instance.anchor.set(anchor);
            }
            if (onClick) {
                instance.interactive = true;
                instance.on('click', onClick);
            }
            if (props.onMouseMove) {
                instance.interactive = true;
                instance.on('mousemove', props.onMouseMove);
            }

            return instance;
        }

        if (type === 'text') {
            const { text = '', style, canvas, x = 0, y = 0 } = props;
            instance = new PIXI.Text(text, style, canvas);

            instance.x = x;
            instance.y = y;

            return instance;
        }
    },

    finalizeInitialChildren: () => false,

    removeChildFromContainer: (container, child) => {
        container.removeChild(child);
    },
    removeChild: (parent, child) => {
        parent.removeChild(child);
    },

    appendChildToContainer: (container, child) => {
        container.addChild(child);
    },

    prepareUpdate: (instance, type, oldProps, newProps) => {
        return newProps;
    },
    commitUpdate: (instance, updatePayload, type) => {
        if (type === 'sprite') {
            const { x = 0, y = 0, onClick, width, height } = updatePayload;
            instance.x = x
            instance.y = y

            instance.width = width
            instance.height = height

            instance.onClick = onClick
        }

        if (type === 'text') {
            const { text = '', x = 0, y = 0 } = updatePayload;
            instance.text = text;

            instance.x = x;
            instance.y = y;

        }
    },

    insertInContainerBefore: (container, child) => {
        container.addChild(child)
    },
    insertBefore: (parent, child) => {
        parent.addChild(child)
    },
    appendChild: (parent, child) => {
        parent.addChild(child)
    },

    detachDeletedInstance: () => { },
    clearContainer: () => { },
    getPublicInstance: (instance) => instance,
};

export const render = (jsx, root) => {
    const reconciler = Reconciler(hostConfig);
    const container = reconciler.createContainer(root);

    reconciler.updateContainer(jsx, container, null, () => { })
};
