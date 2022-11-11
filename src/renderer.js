import Reconciler from "react-reconciler";
import * as PIXI from 'pixi.js';

const hostConfig = {
    supportsMutation: true,
    isPrimaryRenderer: false,
    getRootHostContext: () => { },
    getChildHostContext: (parentHostContext) => parentHostContext,
    prepareForCommit: () => { },
    resetAfterCommit: () => { },
    clearContainer: () => { },
    shouldSetTextContent: () => false,

    createInstance: (type, props) => {
        let instance;
        if (type === 'sprite') {
            const { x = 0, y = 0, width, height, anchor } = props;
            instance = new PIXI.Sprite(props.texture);

            instance.width = width;
            instance.height = height;

            instance.x = x;
            instance.y = y;
            instance.anchor.set(anchor);


            if (props.onClick) {
                instance.interactive = true;
                instance.on('click', props.onClick);
            }

            if (props.onMouseMove) {
                instance.interactive = true;
                instance.on('mousemove', props.onMouseMove);
            }
            return instance;
        }

        if (type === 'tiling') {
            instance = new PIXI.TilingSprite(
                props.texture,
                props.width,
                props.height,
            );

            return instance;
        }
        if (type === 'text') {
            const { x = 0, y = 0, text, style, canvas } = props;
            instance = new PIXI.Text(text, style, canvas);

            instance.x = x;
            instance.y = y;

            return instance;
        }
    },

    removeChildFromContainer: (container, child) => {
        container.removeChild(child)
    },
    removeChild: (parent, child) => {
        parent.removeChild(child)
    },
    prepareUpdate: (instance, type, oldProps, newProps, rootContainer, hostContext) => {
        return newProps;
    },
    commitUpdate: (instance, updatePayload, type) => {
        if (type === 'sprite') {
            const { x = 0, y = 0, rotation } = updatePayload;

            instance.x = x
            instance.y = y

            if (rotation) {
                instance.rotation = rotation;
            }
        }
        if (type === 'text') {
            const { x = 0, y = 0, text } = updatePayload;

            instance.text = text;
            instance.x = x;
            instance.y = y;
        }

    },
    finalizeInitialChildren: () => false,
    appendChildToContainer: (container, child) => {
        container.addChild(child);
    },
    appendInitialChild: (parent, child) => {
        parent.addChild(child);
    },
    appendChild: (parent, child) => {
        parent.addChild(child);
    },
    insertInContainerBefore: (container, child) => {
        container.addChild(child);
    },
    insertBefore: (parent, child) => {
        parent.addChild(child);
    },


    getPublicInstance: (instance) => instance,
    detachDeletedInstance: () => { },

};

export const render = (jsx, root) => {
    const reconciler = Reconciler(hostConfig);
    const container = reconciler.createContainer(root);

    reconciler.updateContainer(jsx, container, null, () => { })
};
